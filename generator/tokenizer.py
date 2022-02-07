import re

from generator.regex import Patterns


class Tokenizer:
    ignored = [
        Patterns.JAVADOC,
        Patterns.JAVA_COMMENT,
        Patterns.DOUBLE_SPACE
    ]

    def __init__(self, data: str):
        self.__data = data
        self.__tokens = []
        self.__index = 0
        self.__remove_ignorable()
        self.__tokenize_data()

    def __remove_ignorable(self):
        for expr in Tokenizer.ignored:
            self.__data = re.sub(expr, '', self.__data)

    def __tokenize_data(self):
        self.__tokens.extend(re.sub(
            Patterns.TOKEN_SPLITTER,
            r' \1 ',
            self.__data
        ).split())

    @property
    def tokens(self):
        return self.__tokens

    def has_next(self) -> bool:
        return self.__index < len(self.__tokens) - 1

    def has_prev(self) -> bool:
        return self.__index > 0

    def peek(self) -> str:
        if len(self.__tokens) == 0:
            raise IndexError('Token list is empty')
        return self.__tokens[self.__index]

    def advance(self, amount: int = 1):
        if not self.has_next():
            return
        for _ in range(amount):
            if self.has_next():
                self.__index += 1
        return self.peek()

    def recede(self, amount: int = 1):
        if not self.has_prev():
            return
        for _ in range(amount):
            if self.has_prev():
                self.__index -= 1
        return self.peek()
