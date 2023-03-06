from typing import Optional

import yaml
from yaml import Loader

from generator.parsers.v2_parser import V2Parser
from generator.tokenizer.rule import associate_by


class V2YamlParser(V2Parser):
    """
    V2Yaml parser supports is yaml/yml language file instead of json.
    """

    def __init__(
        self, source_path: str, source_code: str, lang_file: Optional[str]
    ):
        super().__init__(source_path, source_code, lang_file)

    def load_lang_file(self):
        self.lang_dict.clear()
        whole_lang_dict = yaml.load(self.lang_file, Loader)
        self.lang_file = whole_lang_dict['a']['a']

    def process_lang_file(self):
        """
        Parse the language file to get the descriptions and merge it with the names.
        """
        associated_rules = associate_by(self.rules, lambda r: r.name)

        for rule in associated_rules:
            if rule in self.lang_file:
                lang_entry = self.lang_file[rule]
                if 'name' in lang_entry:
                    associated_rules[rule].name = lang_entry['name']
                if 'desc' in lang_entry:
                    associated_rules[rule].description = lang_entry['desc']
                if 'extra' in lang_entry:
                    associated_rules[rule].extras = lang_entry[
                        'extra'
                    ].values()
