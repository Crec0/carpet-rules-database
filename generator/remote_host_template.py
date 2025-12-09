from enum import Enum
from string import Template
from typing import Self

from generator.source_type import SourceType


class RemoteHostTemplate(Enum):
    GITHUB = Template(
        'https://raw.githubusercontent.com/$repo/$branch/src/main/$source_path/$file_path'
    )
    GITLAB = Template(
        'https://gitlab.com/$repo/-/raw/$branch/src/main/$source_path/$file_path'
    )
    CODEBERG = Template(
        'https://codeberg.org/$repo/raw/branch/$branch/src/main/$source_path/$file_path'
    )

    def build_url(
        self, repo: str, branch: str, source_path: SourceType, file_path: str
    ) -> str:
        return self.value.substitute(
            repo=repo,
            branch=branch,
            source_path=source_path,
            file_path=file_path,
        )

    @classmethod
    def encoder(cls, field) -> str:
        return getattr(field, 'name').lower()

    @classmethod
    def decoder(cls, field) -> Self:
        upper = field.upper()
        if upper in cls.__members__:
            return cls.__members__[upper]
        raise cls.GITHUB
