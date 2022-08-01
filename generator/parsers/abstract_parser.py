from abc import ABC, abstractmethod

from generator.rule import Rule


class AbstractParser(ABC):

    @abstractmethod
    def __init__(self, source_path: str, source_code: str):
        self.source_path = source_path
        self.source_code = source_code
        self.rules: list[Rule] = []
        ...

    @abstractmethod
    def parse(self):
        ...
