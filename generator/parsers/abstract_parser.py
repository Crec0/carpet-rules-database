from abc import ABC, abstractmethod
from typing import Optional, Self

from generator.parsers.rule import Rule


class AbstractParser(ABC):
    def __init__(
        self,
        source_path: str,
        source_code: str,
        lang_file: Optional[str] = None,
    ):
        self.source_path = source_path
        self.source_code = source_code
        self.lang_file = lang_file

        self.rules: list[Rule] = []
        self.lang_dict: dict[str, str] = {}

    @abstractmethod
    def parse(self) -> Self:
        ...
