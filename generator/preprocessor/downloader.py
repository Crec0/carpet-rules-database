import asyncio
from enum import StrEnum, Enum
from string import Template
from typing import Iterable

import httpx
from httpx import AsyncClient

from generator.parsers.regex import Patterns
from generator.types import (
    ASSEMBLED_DATA,
    REPO_RESULT,
    REPOS_JSON,
    ResultType, RepoData,
)


class FileType(StrEnum):
    JAVA_SOURCE = 'java'
    LANG_FILE = 'resources/assets'


class RemoteHostTemplate(Enum):
    GITHUB = Template(
        'https://raw.githubusercontent.com/$repo/$branch/src/main/$standard_path/$file_path'
    )
    GITLAB = Template(
        'https://gitlab.com/$repo/-/raw/$branch/src/main/$standard_path/$file_path'
    )

    @classmethod
    def build_url(
        cls,
        *,
        name: str,
        repo: str,
        branch: str,
        standard_path: FileType,
        file_path: str,
    ) -> str:
        result = cls.__members__.get(name.upper(), None)
        if result is None:
            raise ValueError(f"Unsupported host '{name}' used by '{repo}/{branch}'")
        return result.value.substitute(
            repo=repo,
            branch=branch,
            standard_path=standard_path,
            file_path=file_path,
        )


def build_url(
    file_type: FileType, host: str, repo: str, branch: str, file_path: str
) -> str:
    return RemoteHostTemplate.build_url(
        name=host,
        repo=repo,
        branch=branch,
        standard_path=file_type,
        file_path=file_path,
    )


def url_generator(repos: REPOS_JSON) -> Iterable[RepoData]:
    for parser_version, repo_list in repos.items():
        for repo_data in repo_list:
            yield from parser_version, ResultType.SOURCE, repo_data['owner_repo'],

    # for parser in repos:
    #     for host in repos[parser]:
    #         for repo in repos[parser][host]:
    #             for settingsFile, branch in product(
    #                 repo['settings-files'], repo['branches']
    #             ):
    #                 owner_repo = repo['owner-repo']
    #                 yield (
    #                     parser,
    #                     'source',
    #                     owner_repo,
    #                     branch,
    #                     build_uri(
    #                         FileType.JAVA_SOURCE,
    #                         host,
    #                         owner_repo,
    #                         branch,
    #                         settingsFile,
    #                     ),
    #                 )
    #
    #             if (
    #                 parser == ParserVersion.TRANSLATIONS_JSON
    #                 or parser == ParserVersion.TRANSLATIONS_YAML
    #             ):
    #                 for langFile, branch in product(
    #                     repo['lang-files'], repo['branches']
    #                 ):
    #                     owner_repo = repo['owner-repo']
    #                     yield (
    #                         parser,
    #                         'lang',
    #                         owner_repo,
    #                         branch,
    #                         build_uri(
    #                             FileType.LANG_FILE,
    #                             host,
    #                             owner_repo,
    #                             branch,
    #                             langFile,
    #                         ),
    #                     )


async def download_file(
    client: AsyncClient,
    parser: str,
    typ: str,
    repo: str,
    branch: str,
    url: str,
) -> REPO_RESULT:
    try:
        response = await client.get(url)
        if response.status_code == 200:
            return parser, typ, repo, branch, response.text
        print(f'Error: {response.status_code} - {url}')
    except TimeoutError:
        print(f'TimeoutError: {url}')
    else:
        return '', '', '', '', ''


async def download_repos(repos: REPOS_JSON) -> tuple:
    async with httpx.AsyncClient() as client:
        result = await asyncio.gather(
            *[
                download_file(client, parser, typ, repo, branch, url)
                for (parser, typ, repo, branch, url) in url_generator(repos)
            ]
        )
    return result


def assemble_results(results: Iterable[REPO_RESULT]) -> ASSEMBLED_DATA:
    clean_results: ASSEMBLED_DATA = {}
    for parser, typ, repo, branch, text in results:
        if parser not in clean_results:
            clean_results[parser] = {}
        if typ not in clean_results[parser]:
            clean_results[parser][typ] = {}
        clean_results[parser][typ][
            f'{repo}{Patterns.SPLITTER_STR}{branch}'
        ] = text
    return clean_results


def fetch_data(repos: REPOS_JSON) -> ASSEMBLED_DATA:
    results = asyncio.run(download_repos(repos))
    return assemble_results(results)
