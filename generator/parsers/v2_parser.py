from typing import Optional, Self

import pyjson5 as json

from generator.parsers.v1_parser import V1Parser
from generator.tokenizer.rule import associate_by
from generator.types import WrappedRepoData


class V2Parser(V1Parser):
    """
    V2 Parser is the same as V1 Parser, but
    the descriptions and other textual stuff is now extracted to a language file.

    Therefore, the parsing is done in two steps:
    1. Parse the source code to get the names and categories.
    2. Parse the language file to get the descriptions and merge it with the names.
    """

    def __init__(self, repo: WrappedRepoData):
        super().__init__(repo)
        self.rules_lang: dict[str, str] = {}

    def load_lang_file(self):
        self.rules_lang = json.loads(self.repo.raw_lang_file)

    def __extract_prefixed(self, prefix):
        return [
            self.rules_lang[key]
            for key in self.rules_lang
            if key.startswith(prefix)
        ]

    def process_lang_file(self):
        """
        Parse the language file to get the descriptions and merge it with the names.
        """
        associated_rules = associate_by(self.rules, lambda rule: rule.name)

        for key in self.rules_lang:
            manager, _, name, *rest = key.split('.')
            if name in associated_rules:
                header = rest[0]
                if header == 'name':
                    associated_rules[name].name = self.rules_lang[key]
                elif header == 'desc':
                    associated_rules[name].description = self.rules_lang[key]
                elif header == 'extra':
                    associated_rules[name].extras = self.__extract_prefixed(
                        f'{manager}.rule.{name}.extra.'
                    )
                elif header == 'additional':
                    associated_rules[name].validators.append(
                        self.rules_lang[key]
                    )
                else:
                    raise Exception(
                        f'Unknown header: {header} in {key} for {self.repo.owner_repo}/{self.repo.branch}'
                    )

    def parse(self) -> Self:
        super().parse()
        self.load_lang_file()
        self.process_lang_file()
        return self
