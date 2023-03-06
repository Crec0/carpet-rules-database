from enum import StrEnum
from typing import TypedDict, Optional


class RepoData(TypedDict):
    name: str
    owner_repo: str
    branches: list[str]
    settings_files: list[str]
    lang_file: Optional[str]


class RawData(TypedDict):
    parser: str
    repos: list[RepoData]


class ResultType(StrEnum):
    SOURCE = 'source'
    LANG = 'lang'


class ParsedRepoResult(TypedDict):
    parser: str
    owner_repo: str
    branches: list[str]
    settings_files: list[str]
    lang_file: Optional[str]
