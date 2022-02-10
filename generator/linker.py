from generator.parser import Parser


class Linker:
    """
    Linker links the fields, validators, enums with their associated rules
    """

    def __init__(self, parser: Parser):
        self.parser = parser

    def link(self) -> 'Linker':
        """
        link method performs the linking. **REQUIRED** to be run to perform linking
        :return: returns itself for chaining
        """
        return self

