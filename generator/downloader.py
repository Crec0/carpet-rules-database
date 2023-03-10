import asyncio
import functools
from itertools import product
from enum import Enum, StrEnum
from string import Template

from httpx import AsyncClient

from generator.types import DownloadedRepoData, RawData, RepoData


class SourceType(StrEnum):
    JAVA_SOURCE = 'java'
    KOTLIN_SOURCE = 'kotlin'
    LANG_FILE = 'resources/assets'


class RemoteHostTemplate(Enum):
    GITHUB = Template(
        'https://raw.githubusercontent.com/$repo/$branch/src/main/$source_path/$file_path'
    )
    GITLAB = Template(
        'https://gitlab.com/$repo/-/raw/$branch/src/main/$source_path/$file_path'
    )

    @classmethod
    def build_url(cls, *, remote: str, repo: str, branch: str, source_path: SourceType, file_path: str) -> str:
        result = cls.__members__.get(remote.upper(), None)

        if result is None:
            raise ValueError(f"Unsupported host '{remote}' used by '{repo}/{branch}'")

        return result.value.substitute(
            repo=repo,
            branch=branch,
            source_path=source_path,
            file_path=file_path,
        )


async def download_repo(client: AsyncClient, parser: str, repo: RepoData) -> DownloadedRepoData:
    settings_url_partial = functools.partial(
        RemoteHostTemplate.build_url,
        remote='github' if repo.source is None else repo.source,
        repo=repo.owner_repo,
        source_path=SourceType.JAVA_SOURCE,
    )

    for branch, setting_file in product(repo.branches, repo.settings_file_paths):
        url = settings_url_partial(branch=branch, file_path=setting_file)
        contents = await client.get(url)

    lang_file_url_partial = functools.partial(
        RemoteHostTemplate.build_url,
        remote='github' if repo.source is None else repo.source,
        repo=repo.owner_repo,
        source_path=SourceType.JAVA_SOURCE,
        file_path=repo.lang_file_path
    )

    for branch in repo.branches:
        url = lang_file_url_partial(branch=branch)
        contents = await client.get(url)

    raise NotImplemented()


async def fetch_data(repos: RawData):
    async with AsyncClient() as client:
        tasks = [
            download_repo(client, parser, repo)
            for parser, repos in repos.combined()
            for repo in repos
        ]
        return asyncio.gather(*tasks, return_exceptions=True)
