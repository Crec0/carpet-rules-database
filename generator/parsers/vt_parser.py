import yaml
from yaml import Loader

from generator.parsers.v1_parser import V1Parser
from generator.rule import associate_by
from generator.types import TIS_RULE_FORMAT


class VtParser(V1Parser):
    """
    Vt Parser is the same as V2 Parser, but
    the language file is yaml/yml format.

    This version is made specifically for the TIS carpet.
    """

    def __init__(self, source_path: str, source_code: str, lang_file: str):
        super().__init__(source_path, source_code)
        self.lang_file: TIS_RULE_FORMAT = yaml.load(lang_file, Loader)['carpettisaddition']['carpet_translations']['rule']

    def __parse_lang_file(self):
        """
        Parse the language file to get the descriptions and merge it with the names.
        """
        associated_rules = associate_by(self.rules, lambda rule: rule.name)

        for rule in associated_rules:
            if rule in self.lang_file:
                lang_entry = self.lang_file[rule]
                if 'name' in lang_entry:
                    associated_rules[rule].name = lang_entry['name']
                if 'desc' in lang_entry:
                    associated_rules[rule].description = lang_entry['desc']
                if 'extra' in lang_entry:
                    associated_rules[rule].extras = lang_entry['extra'].values()

    def parse(self) -> None:
        super().parse()
        self.__parse_lang_file()
