from abc import ABC, abstractmethod
from typing import Self

from generator.tokenizer.rule import Rule
from generator.types import WrappedRepoData


class AbstractParser(ABC):
    def __init__(self, repo: WrappedRepoData):
        self.repo = repo
        self.rules: list[Rule] = []

    @abstractmethod
    def parse(self) -> Self:
        ...
