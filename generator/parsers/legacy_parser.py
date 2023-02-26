import re
from typing import Optional, Self

from generator.parsers.abstract_parser import AbstractParser
from generator.parsers.regex import Patterns
from generator.parsers.rule import Rule
from generator.parsers.tokenizer import Tokenizer
from generator.util import get_default_values_for_type, strip


class V1Parser(AbstractParser):
    """
    Parser for the class files which use older version of the settings api. aka V1 settings api.

    Parses the input code and extracts the following:

    - Rules (carpet rules)
    - Fields used in the rules
    - Validator descriptions
    - Enums values

    Parsing is done in two steps:\n
    - First, fields, validators, enums are parsed and extracted from the code\n
    - Second, rules are parsed and enum/fiend/validator references are resolved\n
    """

    def __init__(
        self,
        source_path: str,
        source_code: str,
        lang_file: Optional[str] = None,
    ):
        super().__init__(source_path, source_code, lang_file)
        self.tokenizer: Tokenizer = Tokenizer(self.source_code)
        self.fields: dict[str, str] = {}
        self.validators: dict[str, str] = {}
        self.enums: dict[str, list[str]] = {}

    def __skip_space(self) -> None:
        while self.tokenizer.has_next() and self.tokenizer.peek().isspace():
            self.tokenizer.advance()

    def __replace_variable_with_value(self, string: str) -> str:
        """
        converts the concatenated strings to the formatted string

        This is done to use str.format() on it later on instead of evaluating it\n
        Examples:

        - "for" + bar     -> "foo {bar}"
        - "for" + bar + "baz" -> "foo {bar} baz"

        :param string: the string to be converted
        :return: the format converted string
        """
        ret = ''
        for segment in string.split('+'):
            segment = segment.strip()
            if segment and segment[0] != '"' and segment[-1] != '"':
                ret += f' {self.fields[segment]} '
            else:
                ret += strip(segment)
        return strip(ret)

    def __resolve(self, resolvable: str) -> str:
        """
        Resolves the string to the value of the field

        :param resolvable: the string to be resolved
        :return: the resolved string
        """
        if re.match(Patterns.FLOATING_POINT_NUMBER, resolvable):
            return resolvable

        if '.' in resolvable:
            resolvable = resolvable.split('.')[-1]

        if resolvable in self.fields:
            return strip(self.fields[resolvable])

        return resolvable

    def __read_until(
        self, tokens_to_match: str, ending_chars_to_include: str = ''
    ) -> tuple[str, int]:
        """
        Reads the tokens until the given token is reached

        :param tokens_to_match: The tokens to match to terminate the reading
        :return: The combined string of tokens read
        """
        read_string: list[str] = []
        advance_count = 0

        while (
            self.tokenizer.has_next()
            and (token := self.tokenizer.peek()) not in tokens_to_match
        ):
            if token == '\\':
                advance_count += 1
                token = self.tokenizer.advance()
            elif '\\' in token:
                advance_count += 1
                token = token.replace('\\', '') + self.tokenizer.advance()
            read_string.append(token)
            advance_count += 1
            if self.tokenizer.advance() in ending_chars_to_include:
                read_string.append(self.tokenizer.peek())
        return ''.join(read_string).strip(), advance_count

    def __read_block(self) -> str:
        """
        Reads the whole block of the scope. ie { ... }

        :return: The combined string repr of the block
        """
        brace_count = 1
        read_tokens = []

        self.__read_until('{')

        while brace_count > 0:
            token = self.tokenizer.advance()
            if token == '{':
                brace_count += 1
            elif token == '}':
                brace_count -= 1
            read_tokens.append(token)

        return ''.join(read_tokens).strip()

    def __parse_optional_list_type_values(
        self, preserve_comma: bool = False, ending_chars_to_include: str = ''
    ) -> list[str]:
        """
        Reads the string array type values. Examples:
         - { "foo", "bar" } -> ["foo", "bar"]
         - { "foo", bar }   -> ["foo", "bar"]
         - { foo, bar }     -> ["foo", "bar"]
         - "foo"            -> ["foo"]
         - bar              -> ["bar"]

        :return: the list of values
        """
        self.__read_until('=')
        self.tokenizer.advance()
        self.__skip_space()
        if self.tokenizer.peek() == '{':
            values = self.__read_block()[:-1]
        else:
            values, _ = self.__read_until(',)', ending_chars_to_include)

        list_items: list[str] = []

        # list_tokenizer = Tokenizer(values)
        # list_value = ""
        # quotations_seen = 0
        # while list_tokenizer.has_next():
        #     token = list_tokenizer.advance()
        #     if token == ",":
        #         list_items.append(list_value)
        #         list_value = ""
        #     else:
        #         list_value += token

        for match in re.findall(Patterns.LIST_ITEM_READER, values):
            # cleaned_match = map(
            #     strip, match.split("," + (" " if preserve_comma else ""))
            # )
            # list_items.extend(v for v in cleaned_match if v)
            if strip(match):
                list_items.append(strip(match))

        return list_items

    def __parse_validator(self):
        """
        Parses the validator and stores it in the validators list
        """
        candidate, _ = self.__read_until('{')
        # step back before { so the read_block can function properly
        self.tokenizer.recede()

        if match := re.search(Patterns.VALIDATOR_CLASS, candidate):
            class_block = self.__read_block()
            if desc := re.search(Patterns.VALIDATOR_DESCRIPTION, class_block):
                self.validators[
                    match.groupdict()['name']
                ] = self.__replace_variable_with_value(
                    desc.group('description')
                )

    def __parse_enum(self):
        """
        Parses the enum and stores it in the enums list
        """
        enum_name = strip(self.tokenizer.advance(2))
        self.tokenizer.advance(2)
        enum_values, _ = self.__read_until(';}')
        enum_arg_removed = re.sub(Patterns.ENUM_FILTER, '', enum_values)
        enums = re.findall(Patterns.WORD, enum_arg_removed)
        self.enums[enum_name] = [enum.lower() for enum in enums]

    def __try_parse_field(self):
        """
        Parses a field if it is a field otherwise does nothing
        :return:
        """
        candidate, amount = self.__read_until(';')
        self.tokenizer.recede(amount)
        if match := re.match(Patterns.STATIC_FIELD, candidate):
            return match.groupdict()
        return None

    def __parse_rule(self):
        """
        Parses the rule itself

        :return: The parsed rule
        """
        rule = Rule()
        repo, branch = self.source_path.split(Patterns.SPLITTER_STR)
        rule.repo = repo
        rule.branches.add(branch)

        while (
            self.tokenizer.has_next()
            and (token := self.tokenizer.advance()) != ';'
        ):
            match token:
                case 'desc':
                    self.__read_until('"')
                    self.tokenizer.advance()
                    desc = self.__read_until('"')[0].capitalize()
                    rule.description = desc

                case 'strict':
                    self.__read_until('=')
                    self.__skip_space()
                    rule.strict = self.tokenizer.peek() == 'true'

                case 'category' | 'categories':
                    rule.categories = [
                        self.__resolve(category).upper()
                        for category in self.__parse_optional_list_type_values()
                    ]

                case 'options':
                    rule.options = [
                        option.lower()
                        for option in self.__parse_optional_list_type_values(
                            preserve_comma=True
                        )
                    ]

                case 'validate':
                    validator_names = [
                        validator.removesuffix('.class')
                        for validator in self.__parse_optional_list_type_values()
                    ]
                    rule.validators = list(
                        filter(
                            lambda v: v is not None,
                            map(
                                lambda name: self.validators.get(name, None),
                                validator_names,
                            ),
                        )
                    )

                case 'extra':
                    rule.extras = self.__parse_optional_list_type_values(
                        ending_chars_to_include=')'
                    )

                case 'public':
                    match_dict = self.__try_parse_field()
                    if match_dict:
                        rule.type = match_dict['type']
                        # if the type is enum, the options are the enum values
                        if match_dict['type'] in self.enums:
                            rule.options = self.enums[match_dict['type']]
                        rule.name = match_dict['name']
                        if match_dict['value'] is None:
                            value = get_default_values_for_type(
                                match_dict['type']
                            )
                        else:
                            value = strip(match_dict['value'])
                        rule.value = self.__resolve(value)

        if not rule.options and "COMMAND" in rule.categories and rule.type == "String":
            rule.options = ["true", "false", "ops", "0", "1", "2", "3", "4"]
        self.rules.append(rule)

    def parse(self) -> Self:
        """
        parse method performs the parsing

        :return: The parser itself for chaining
        """
        prev_token = ''
        while self.tokenizer.has_next():
            token = self.tokenizer.peek().strip()
            if token == 'class' and prev_token != '.':
                self.__parse_validator()
            elif token == 'enum':
                self.__parse_enum()
            elif token in ('public', 'private', 'protected'):
                if match_dict := self.__try_parse_field():
                    value = match_dict['value']
                    self.fields[match_dict['name']] = strip(value)
            if not token.isspace():
                prev_token = token
            self.tokenizer.advance()

        self.tokenizer.reset()

        prev_token = ''
        while self.tokenizer.has_next():
            token = self.tokenizer.peek().strip()
            if token == 'Rule' and prev_token == '@':
                self.__parse_rule()
            if not token.isspace():
                prev_token = token
            self.tokenizer.advance()

        return self
