import re

from generator.regex import Patterns
from generator.rule import Rule
from generator.tokenizer import Tokenizer


class Parser:
    """
    Parses the input code and extracts the following:

    - Rules (carpet rules)
    - Fields used in the rules
    - Validator descriptions
    - Enums values

    Parsing is done in two steps:\n
    - First, fields, validators, enums are parsed and extracted from the code\n
    - Second, rules are parsed and enum/fiend/validator references are resolved\n
    """

    NO_SPACE = "-@#'!:"
    SPACE_AFTER = ",)}]>?"
    SPACE_AROUND = "~+*^%=&|"
    SPACE_BEFORE = "`;/\\([{<$"

    def __init__(self, repo_branch: str, source_code: str):
        self.repo_branch = repo_branch
        self.__tokenizer = Tokenizer(source_code)
        self.rules: list[Rule] = []
        self.fields: dict[str, str] = {}
        self.validator_info: dict[str, str] = {}
        self.enums: dict[str, list[str]] = {}

    def has_next(self):
        """
        A wrapper for the tokenizer's has_next method for qol

        :return: True if the tokenizer has a next token, False otherwise
        """
        return self.__tokenizer.has_next()

    def has_prev(self):
        """
        A wrapper for the tokenizer's has_prev method for qol

        :return: True if the tokenizer has a previous token, False otherwise
        """
        return self.__tokenizer.has_prev()

    def peek(self):
        """
        A wrapper for the tokenizer's peek method for qol

        :return: The next token in the tokenizer
        """
        return self.__tokenizer.peek()

    def advance(self, amount: int = 1) -> str:
        """
        Advances the tokenizer by the given amount

        :param amount: The amount to advance by
        :return: The token that was advanced to
        """
        return self.__tokenizer.advance(amount)

    def recede(self, amount: int = 1) -> str:
        """
        Recedes the tokenizer by the given amount

        :param amount: The amount to recede by
        :return: The token that was receded to
        """
        return self.__tokenizer.recede(amount)

    def reset(self) -> None:
        """
        Resets the tokenizer to the beginning
        """
        self.__tokenizer.reset()

    def parse(self) -> "Parser":
        """
        parse method performs the parsing

        :return: The parser itself for chaining
        """
        while self.has_next():
            token = self.peek()
            if token == "class":
                self.parse_validator()
            elif token == "enum":
                self.parse_enum()
            elif token in ("public", "private"):
                if match_dict := self.parse_field_if_field():
                    self.fields[match_dict["name"]] = match_dict["value"]
            self.advance()

        self.reset()

        while self.has_next():
            token = self.peek()
            if token == "Rule":
                self.parse_rule()
            self.advance()
        return self

    def read_until(self, tokens_to_match: str) -> tuple[str, int]:
        """
        Reads the tokens until the given token is reached

        :param tokens_to_match: The tokens to match to terminate the reading
        :return: The combined string of tokens read
        """
        read_string: list[str] = []
        advance_count: int = 0

        while self.has_next() and (token := self.peek()) not in tokens_to_match:
            read_string.append(token)
            advance_count += 1
            self.advance()
        return Parser.join_string(read_string), advance_count

    def read_block(self) -> str:
        """
        Reads the whole block of the scope. ie { ... }

        :return: The combined string repr of the block
        """
        brace_count = 1
        read_tokens = []

        self.read_until("{")

        while brace_count > 0:
            token = self.advance()
            if token == "{":
                brace_count += 1
            elif token == "}":
                brace_count -= 1
            read_tokens.append(token)

        return Parser.join_string(read_tokens)

    def parse_optional_list_type_values(self) -> list[str]:
        """
        Reads the string array type values. Examples:
         - { "foo", "bar" } -> ["foo", "bar"]
         - { "foo", bar }   -> ["foo", "bar"]
         - { foo, bar }     -> ["foo", "bar"]
         - "foo"            -> ["foo"]
         - bar              -> ["bar"]

        :return: the list of values
        """
        self.advance(2)
        if self.peek() == "{":
            values = self.read_block()[:-1]
        else:
            values, _ = self.read_until(",)")

        return [
            value
            for match in re.findall(Patterns.LIST_ITEM_READER, values)
            for value in map(lambda m: m.strip(" "), match.split(", "))
            if value
        ]

    def parse_rule(self) -> None:
        """
        Parses the rule itself

        :return: The parsed rule
        """
        rule = Rule()
        repo, branch = self.repo_branch.split("/tree/")
        rule.repo = repo
        rule.branches.add(branch)

        while self.has_next() and (token := self.advance()) != ";":
            match token:
                case "desc":
                    self.advance(3)
                    rule.description, _ = self.read_until('"')

                case "strict":
                    self.advance(2)
                    rule.strict = self.peek() == "true"

                case "category":
                    rule.categories = [
                        category.upper()
                        for category in self.parse_optional_list_type_values()
                    ]

                case "options":
                    rule.options = [
                        option.lower()
                        for option in self.parse_optional_list_type_values()
                    ]

                case "validate":
                    validator_names = [
                        validator.removesuffix(".class")
                        for validator in self.parse_optional_list_type_values()
                    ]
                    rule.validators = list(
                        filter(
                            lambda v: v is not None,
                            map(
                                lambda name: self.validator_info.get(name, None),
                                validator_names,
                            ),
                        )
                    )

                case "extra":
                    rule.extras = self.parse_optional_list_type_values()

                case "public":
                    match_dict = self.parse_field_if_field()
                    if match_dict:
                        rule.type = match_dict["type"]
                        rule.name = match_dict["name"]
                        rule.value = match_dict["value"].strip('" ')

        self.rules.append(rule)

    def parse_validator(self) -> None:
        """
        Parses the validator and stores it in the validators list
        """
        candidate, _ = self.read_until("{")
        # step back before { so the read_block can function properly
        self.recede()

        if match := re.search(Patterns.VALIDATOR_CLASS, candidate):
            class_block = self.read_block()
            if desc := re.search(Patterns.VALIDATOR_DESCRIPTION, class_block):
                self.validator_info[
                    match.groupdict()["name"]
                ] = Parser.concat_to_format(desc.group("description"))

    def parse_enum(self) -> None:
        """
        Parses the enum and stores it in the enums list
        """
        enum_name = self.advance().strip(" ")
        self.advance(2)
        enum_values, _ = self.read_until(";")
        enum_arg_removed = re.sub(Patterns.ENUM_FILTER, "", enum_values)
        enums = re.findall(Patterns.WORD, enum_arg_removed)
        self.enums[enum_name] = [enum.lower() for enum in enums]

    def parse_field_if_field(self):
        """
        Parses a field if it is a field otherwise does nothing
        :return:
        """
        candidate, amount = self.read_until(";")
        self.recede(amount)
        if match := re.match(Patterns.STATIC_FIELD, candidate):
            return match.groupdict()
        return None

    @staticmethod
    def concat_to_format(string: str) -> str:
        """
        converts the concatenated strings to the formatted string

        This is done to use str.format() on it later on instead of evaluating it\n
        Examples:

        - "for" + bar     -> "foo {bar}"
        - "for" + bar + "baz" -> "foo {bar} baz"

        :param string: the string to be converted
        :return: the format converted string
        """
        ret = ""
        for segment in string.split("+"):
            segment = segment.strip(" ")
            if segment and segment[0] != '"' and segment[-1] != '"':
                ret += f" {{{segment}}} "
            else:
                ret += segment.strip('" ')
        return ret.strip(" ")

    # TODO improve this
    @staticmethod
    def join_string(tokens: list[str]) -> str:
        """
        Joins the tokens to a string with the correct spacing

        It's not smart and has some funny edge cases

        :param tokens: the tokens to be joined
        :return: the joined string
        """
        string = ""
        for token in tokens:
            if token in Parser.NO_SPACE:
                string += token
            elif token in Parser.SPACE_BEFORE:
                string += " " * (len(string) > 0 and string[-1] != " ") + token
            elif token in Parser.SPACE_AFTER:
                if len(string) > 0 and string[-1] == " ":
                    string = string[:-1]
                string += token + " "
            elif token in Parser.SPACE_AROUND:
                string += " " + token + " "
            else:
                string += token + " "
        return string.strip()
