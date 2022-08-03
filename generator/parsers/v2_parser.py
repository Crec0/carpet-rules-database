import pyjson5 as json
import sys
from generator.parsers.v1_parser import V1Parser
from generator.rule import associate_by


class V2Parser(V1Parser):
    """
    V2 Parser is the same as V1 Parser, but
    the descriptions and other textual stuff is now extracted to a language file.

    Therefore, the parsing is done in two steps:
    1. Parse the source code to get the names and categories.
    2. Parse the language file to get the descriptions and merge it with the names.
    """

    def __init__(self, source_path: str, source_code: str, lang_file: str):
        super().__init__(source_path, source_code)
        self.raw_lang_file = lang_file
        self.lang_file: dict[str, str] = {}

    def load_lang_file(self):
        self.lang_file.clear()
        self.lang_file.update(json.loads(self.raw_lang_file))

    def __extract_prefixed(self, prefix):
        return [self.lang_file[key] for key in self.lang_file if key.startswith(prefix)]

    def parse_lang_file(self):
        """
        Parse the language file to get the descriptions and merge it with the names.
        """
        associated_rules = associate_by(self.rules, lambda rule: rule.name)

        for key in self.lang_file:
            manager, _, name, *rest = key.split(".")
            if name in associated_rules:
                header = rest[0]
                if header == "name":
                    associated_rules[name].name = self.lang_file[key]
                elif header == "desc":
                    associated_rules[name].description = self.lang_file[key]
                elif header == "extra":
                    associated_rules[name].extras = self.__extract_prefixed(
                        f"{manager}.rule.{name}.extra."
                    )
                else:
                    print(
                        f"Warning: Unknown header: {header} in {key} for {self.source_path}",
                        file=sys.stderr
                    )

    def parse(self) -> None:
        super().parse()
        self.load_lang_file()
        self.parse_lang_file()
