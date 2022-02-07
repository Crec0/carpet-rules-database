import re

from generator.regex import Patterns
from generator.rule import Rule, get_default_values_for_type
from generator.tokenizer import Tokenizer


class Parser:
    """
    Parser parses the input code and extracts the carpet rules from it.
    """
    NO_SPACE = "-@#'!:"
    SPACE_AFTER = ',)}]>?'
    SPACE_AROUND = '~+*^%=&|'
    SPACE_BEFORE = '`;/\\([{<$'

    def __init__(self, source_code: str):
        self.__tokenizer = Tokenizer(source_code)
        self.rules: list[Rule] = []
        self.fields: list[str] = []
        self.validators: dict[str, str] = {}
        self.enums: dict[str, list[str]] = {}

    def parse(self) -> 'Parser':
        """
        Parses the input code and extracts the following:
        - Rules (carpet rules)
        - Fields used in the rules
        - Validator descriptions
        - Enums values
        :return: The parser itself for chaining
        """
        while self.has_next():
            token = self.peek()
            match token:
                case 'Rule':
                    self.rules.append(self.parse_rule())
                case 'class':
                    self.parse_validator()
                case 'enum':
                    self.parse_enum()
            self.advance()
        print(self.enums.items())
        return self

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

    def read_until(self, token_to_match: str) -> str:
        """
        Reads the tokens until the given token is reached
        :param token_to_match: The token to match to terminate the reading
        :return: The combined string of tokens read
        """
        read_string = []

        while self.has_next() and (token := self.peek()) != token_to_match:
            read_string.append(token)
            self.advance()

        self.advance()

        return Parser.join_string(read_string)

    def read_block(self) -> str:
        """
        Reads the whole block of the scope. ie { ... }
        :return: The combined string repr of the block
        """
        brace_count = 1
        read_tokens = []

        self.read_until('{')

        while brace_count > 0:
            token = self.peek()

            if token == '{':
                brace_count += 1
            elif token == '}':
                brace_count -= 1

            read_tokens.append(token)
            self.advance()

        return Parser.join_string(read_tokens)

    def parse_optional_list_type_values(self, is_string: bool = False) -> list[str]:
        """
        Reads the string array type values. Examples:
         { "foo", "bar" } -> ["foo", "bar"]
         "foo"            -> ["foo"]
         { foo, bar }     -> ["foo", "bar"]
         bar              -> ["bar"]
        :param is_string: Whether the values are quoted strings or not
        :return: the list of values
        """
        self.advance(2)
        parsed_values = []
        if self.peek() == '{':
            self.advance()
            parsed_values.extend(self.read_until('}').split(', '))
        else:
            if is_string:
                self.advance()
                parsed_values.extend(self.read_until('"'))
            else:
                parsed_values.append(self.peek())
        return parsed_values

    def parse_rule(self) -> Rule:
        """
        Parses the rule itself
        :return: The parsed rule
        """
        rule = Rule()
        while self.has_next() and (token := self.peek()) != ';':
            match token:
                case 'desc':
                    self.advance(3)
                    rule.description = self.read_until('"')

                case 'strict':
                    self.advance(2)
                    rule.strict = self.peek() == 'true'

                case 'category':
                    rule.categories = [
                        category.strip('" ').upper()
                        for category in self.parse_optional_list_type_values()
                    ]

                case 'options':
                    rule.options = [
                        option.strip('" ').lower()
                        for option in self.parse_optional_list_type_values()
                    ]

                case 'validate':
                    rule.validators = [
                        validator.strip('" ').removesuffix('.class')
                        for validator in self.parse_optional_list_type_values()
                    ]

                case 'extra':
                    rule.extras = [
                        extra.strip('" ')
                        for extra in self.parse_optional_list_type_values(is_string=True)
                    ]

                case 'static':
                    rule.type = self.advance()
                    rule.name = self.advance()

                    if self.advance() == '=':
                        self.advance()
                        rule.value = self.read_until(';').strip('" ')
                        self.recede()  # go back to ;
                    else:
                        rule.value = get_default_values_for_type(rule.type)

                    self.recede()  # go back before ; so the next advance will be a rule
            self.advance()
        return rule

    def parse_validator(self) -> None:
        """
        Parses the validator and stores it in the validators list
        """
        # 7 here is a hacky fix to get the whole declaration of validator
        candidate = ''.join(self.advance() for _ in range(7) if self.has_next())
        [self.recede() for _ in range(7)]

        if match := re.match(Patterns.VALIDATOR_CLASS, candidate):
            class_block = self.read_block()
            if desc := re.search(Patterns.VALIDATOR_DESCRIPTION, class_block):
                self.validators[match.groupdict()['name']] = Parser.concat_to_format(desc.group('description'))

    def parse_enum(self) -> None:
        """
        Parses the enum and stores it in the enums list
        """
        enum_name = self.advance().strip(" ")
        self.advance(2)
        enum_arg_removed = re.sub(Patterns.ENUM_FILTER, '', self.read_until(";"))
        enums = re.findall(Patterns.WORD, enum_arg_removed)
        self.enums[enum_name] = [enum.lower() for enum in enums]

    @staticmethod
    def concat_to_format(string: str) -> str:
        """
        converts the concatenated strings to the formatted string

        This is done to use str.format() on it later on instead of evaluating it
        Examples:
        "for" + bar     -> "foo {bar}"
        "for" + bar + "baz" -> "foo {bar} baz"
        :param string: the string to be converted
        :return: the format converted string
        """
        ret = ''
        for segment in string.split('+'):
            segment = segment.strip(' ')
            if segment and segment[0] != '"' and segment[-1] != '"':
                ret += f' {{{segment}}} '
            else:
                ret += segment.strip('" ')
        return ret.strip(' ')

    # TODO improve this
    @staticmethod
    def join_string(tokens: list[str]) -> str:
        """
        Joins the tokens to a string with the correct spacing

        It's not smart and has some funny edge cases
        :param tokens: the tokens to be joined
        :return: the joined string
        """
        string = ''
        for token in tokens:
            if token in Parser.NO_SPACE:
                string += token
            elif token in Parser.SPACE_BEFORE:
                string += ' ' * (len(string) > 0 and string[-1] != ' ') + token
            elif token in Parser.SPACE_AFTER:
                if string[-1] == ' ':
                    string = string[:-1]
                string += token + ' '
            elif token in Parser.SPACE_AROUND:
                string += ' ' + token + ' '
            else:
                string += token + ' '
        return string.strip()
