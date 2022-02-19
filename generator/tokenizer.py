import re

from generator.regex import Patterns


class Tokenizer:
    # Using sheep and disk as delimiters. Hopefully they are not used in the input.
    SPLITTER_STR = "🐑"
    """
    Tokenizer class.

    Convert a string into a list of tokens.
    """

    ignored = [Patterns.JAVADOC, Patterns.JAVA_COMMENT, Patterns.DOUBLE_SPACE]

    def __init__(self, data: str):
        self.__data = data
        self.__tokens = []
        self.__index = 0
        self.__remove_ignorable()
        self.__tokenize_data()

    def __remove_ignorable(self):
        """
        Remove ignorable tokens from the token list.
        """
        for expr in Tokenizer.ignored:
            self.__data = re.sub(expr, "", self.__data)

    def __tokenize_data(self):
        """
        the main processing method which splits string to tokens.
        """
        tokens = re.sub(
            Patterns.TOKEN_SPLITTER,
            rf"{Tokenizer.SPLITTER_STR}\1{Tokenizer.SPLITTER_STR}",
            self.__data,
        ).split(Tokenizer.SPLITTER_STR)
        self.__tokens.extend(filter(lambda w: w, tokens))

    @property
    def tokens(self) -> list[str]:
        """
        Getter for tokens list.
        """
        return self.__tokens

    def has_next(self) -> bool:
        """
        Check if there is a next token.

        check is done by checking if current index is less than the length of the token list.
        therefore, it can move forward at least once.
        :return: True if there is a next token, False otherwise.
        """
        return self.__index < len(self.__tokens) - 1

    def has_prev(self) -> bool:
        """
        Check if there is a previous token.

        same concept as has_next() just in reverse.

        :return: True if there is a previous token, False otherwise.
        """
        return self.__index > 0

    def peek(self) -> str:
        """
        Gets the current token.

        :raises IndexError: if token list is empty.
        """
        if len(self.__tokens) == 0:
            raise IndexError("Token list is empty")
        return self.__tokens[self.__index]

    def advance(self, amount: int = 1) -> str | None:
        """
        Move forward by the specified amount.

        :param: amount: amount to move forward.
        :return: the current token after advancing. If it can't advance, return None.
        """
        if not self.has_next():
            return
        for _ in range(amount):
            if self.has_next():
                self.__index += 1
        return self.peek()

    def recede(self, amount: int = 1):
        """
        Move backward by the specified amount.

        :param: amount: amount to move backward.
        :return: the current token after receding. If it can't recede, return None.
        """
        if not self.has_prev():
            return
        for _ in range(amount):
            if self.has_prev():
                self.__index -= 1
        return self.peek()

    def reset(self):
        """
        Reset the tokenizer.
        """
        self.__index = 0
