from abc import ABC, abstractmethod


class AbstractParser(ABC):

    @abstractmethod
    def __init__(self, source_path: str, source_code: str):
        self.__source_path = source_path
        self.__source_code = source_code
        ...

    @abstractmethod
    def parse(self):
        ...
