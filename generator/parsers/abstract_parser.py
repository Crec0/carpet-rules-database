from abc import ABC, abstractmethod


class AbstractParser(ABC):

    @abstractmethod
    def __init__(self, source_path: str, source_code: str):
        self.source_path = source_path
        self.source_code = source_code
        ...

    @abstractmethod
    def parse(self):
        ...
