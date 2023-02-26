from enum import StrEnum
from typing import TypedDict, Optional

REPOS_JSON = dict[str, dict[str, list[dict[str, str]]]]
REPO_RESULT = tuple[str, str, str, str, str]
ASSEMBLED_DATA = dict[str, dict[str, dict[str, str]]]


class RepoData(TypedDict):
    name: str
    owner_repo: str
    branches: list[str]
    settings_files: list[str]
    lang_file: Optional[str]


class ResultType(StrEnum):
    SOURCE = 'source'
    LANG = 'lang'


class ParsedRepoResult(TypedDict):
    parser: str
    owner_repo: str
    branches: list[str]
    settings_files: list[str]
    lang_file: Optional[str]
