import yaml
from yaml import Loader

from generator.parsers.v2_parser import V2Parser
from generator.tokenizer.rule import associate_by


class V2YamlParser(V2Parser):
    """
    V2Yaml parser supports is yaml/yml language file instead of json.
    """

    def load_lang_file(self):
        self.rules_lang = yaml.load(self.repo.raw_lang_file, Loader)
        rules_root = self.repo.rules_root
        if rules_root is not None:
            for key in rules_root.split("."):
                self.rules_lang = self.rules_lang[key]

    def process_lang_file(self):
        """
       Parse the language file to get the descriptions and merge it with the names.
       """
        associated_rules = associate_by(self.rules, lambda r: r.name)

        for rule in associated_rules:
            if rule in self.rules_lang:
                lang_entry = self.rules_lang[rule]
                if 'name' in lang_entry:
                    associated_rules[rule].name = lang_entry['name']
                if 'desc' in lang_entry:
                    associated_rules[rule].description = lang_entry['desc']
                if 'extra' in lang_entry:
                    associated_rules[rule].extras = lang_entry[
                        'extra'
                    ].values()
