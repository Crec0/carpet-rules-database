from typing import Optional, Self

import pyjson5 as json

from generator.parsers.v1_parser import V1Parser
from generator.tokenizer.rule import associate_by


class V2Parser(V1Parser):
    """
    V2 Parser is the same as V1 Parser, but
    the descriptions and other textual stuff is now extracted to a language file.

    Therefore, the parsing is done in two steps:
    1. Parse the source code to get the names and categories.
    2. Parse the language file to get the descriptions and merge it with the names.
    """

    def __init__(
        self, source_path: str, source_code: str, lang_file: Optional[str]
    ):
        super().__init__(source_path, source_code, lang_file)

    def load_lang_file(self):
        self.lang_dict.clear()
        self.lang_dict.update(json.loads(self.lang_file))

    def __extract_prefixed(self, prefix):
        return [
            self.lang_dict[key]
            for key in self.lang_dict
            if key.startswith(prefix)
        ]

    def process_lang_file(self):
        """
        Parse the language file to get the descriptions and merge it with the names.
        """
        associated_rules = associate_by(self.rules, lambda rule: rule.name)

        for key in self.lang_dict:
            manager, _, name, *rest = key.split('.')
            if name in associated_rules:
                header = rest[0]
                if header == 'name':
                    associated_rules[name].name = self.lang_dict[key]
                elif header == 'desc':
                    associated_rules[name].description = self.lang_dict[key]
                elif header == 'extra':
                    associated_rules[name].extras = self.__extract_prefixed(
                        f'{manager}.rule.{name}.extra.'
                    )
                elif header == 'additional':
                    associated_rules[name].validators.append(
                        self.lang_dict[key]
                    )
                else:
                    raise Exception(
                        f'Unknown header: {header} in {key} for {self.source_path}'
                    )

    def parse(self) -> Self:
        super().parse()
        self.load_lang_file()
        self.process_lang_file()
        return self
