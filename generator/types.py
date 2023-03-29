from dataclasses import dataclass, field
from typing import Optional

from dataclasses_json import LetterCase, config, dataclass_json

from generator.parsers.parser_type import ParserType
from generator.remote_host_template import RemoteHostTemplate


@dataclass_json(letter_case=LetterCase.KEBAB)
@dataclass
class RepoData:
    name: str
    owner_repo: str
    branches: list[str]
    settings_file_paths: list[str]
    rules_root: Optional[str] = field(default=None)
    source: RemoteHostTemplate = field(
        default=RemoteHostTemplate.GITHUB,
        metadata=config(
            encoder=RemoteHostTemplate.encoder,
            decoder=RemoteHostTemplate.decoder,
        ),
    )
    lang_file_path: Optional[str] = None


@dataclass_json(letter_case=LetterCase.KEBAB)
@dataclass
class RepoMeta:
    legacy: list[RepoData]
    translations_json: list[RepoData]
    translations_yaml: list[RepoData]

    def combined(self) -> list[tuple[ParserType, list[RepoData]]]:
        return [
            (ParserType.LEGACY, self.legacy),
            (ParserType.TRANSLATIONS_JSON, self.translations_json),
            (ParserType.TRANSLATIONS_YAML, self.translations_yaml),
        ]


@dataclass_json(letter_case=LetterCase.KEBAB)
@dataclass
class WrappedRepoData:
    name: str
    owner_repo: str
    branch: str
    raw_settings_files: list[str]
    raw_lang_file: Optional[str]
    parser: ParserType
    rules_root: Optional[str] = field(default=None)
    source: RemoteHostTemplate = field(
        default=RemoteHostTemplate.GITHUB,
        metadata=config(
            encoder=RemoteHostTemplate.encoder,
            decoder=RemoteHostTemplate.decoder,
        ),
    )


@dataclass_json
@dataclass
class WrappedDownloadedData:
    repos: list[WrappedRepoData]
