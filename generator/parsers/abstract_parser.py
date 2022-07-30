from abc import ABC, abstractmethod


class AbstractParser(ABC):

    @abstractmethod
    def __init__(self, repo_branch: str, source_code: str):
        self.repo_branch = repo_branch
        self.source_code = source_code
        ...

    @abstractmethod
    def parse(self):
        ...
