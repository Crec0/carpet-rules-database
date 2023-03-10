from dataclasses import dataclass
from typing import Optional

from serde import serde

from generator.downloader import RemoteHostTemplate
from generator.parsers.parser_type import ParserType


@serde(rename_all='kebabcase')
@dataclass
class RepoData:
    name: str
    owner_repo: str
    branches: list[str]
    settings_file_paths: list[str]
    lang_file_path: Optional[str]
    source: RemoteHostTemplate

# This one needs redefining. It should not inherit from RepoData since its per branch
@dataclass
class DownloadedRepoData(RepoData):
    parser: ParserType
    settings_files: str
    lang_files: str


@serde(rename_all='kebabcase')
@dataclass
class RawData:
    legacy: list[RepoData]
    translations_json: list[RepoData]
    translations_yaml: list[RepoData]

    def combined(self) -> list[tuple[ParserType, list[RepoData]]]:
        return [
            (ParserType.LEGACY, self.legacy),
            (ParserType.TRANSLATIONS_JSON, self.translations_json),
            (ParserType.TRANSLATIONS_YAML, self.translations_yaml),
        ]
