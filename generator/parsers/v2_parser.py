from generator.parsers.v1_parser import V1Parser


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
        self.__lang_file = lang_file

    def __parse_lang_file(self):
        """
        Parse the language file to get the descriptions and merge it with the names.
        """
        pass

    def parse(self) -> None:
        super().parse()
        self.__parse_lang_file()
