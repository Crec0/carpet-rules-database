from abc import ABC, abstractmethod
from typing import Self

from generator.tokenizer.rule import Rule
from generator.tokenizer.tokenizer import Tokenizer
from generator.types import WrappedRepoData


class AbstractParser(ABC):

    def __init__(self, repo: WrappedRepoData):
        self.repo = repo

    @abstractmethod
    def parse(self) -> Self:
        ...
