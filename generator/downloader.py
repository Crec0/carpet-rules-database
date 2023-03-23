import asyncio
from http.client import HTTPException

from httpx import AsyncClient

from generator.parsers.parser_type import ParserType
from generator.source_type import SourceType
from generator.types import RepoData, RepoMeta, WrappedRepoData


async def download_file(
    client: AsyncClient,
    repo: RepoData,
    branch: str,
    source_path: SourceType,
    file_path: str,
) -> str:
    response = await client.get(
        repo.source.build_url(
            repo=repo.owner_repo,
            branch=branch,
            source_path=source_path,
            file_path=file_path,
        )
    )

    if response.status_code != 200:
        raise HTTPException(f'Failed to fetch {response.url}')

    return response.text


async def download_repo(
    client: AsyncClient, parser: str, repo: RepoData
) -> list[WrappedRepoData]:

    branches: list[WrappedRepoData] = []
    for branch in repo.branches:
        async with asyncio.TaskGroup() as tg:
            settings_file_tasks = [
                tg.create_task(
                    download_file(
                        client,
                        repo,
                        branch,
                        SourceType.JAVA_SOURCE,
                        settings_file,
                    )
                )
                for settings_file in repo.settings_file_paths
            ]

        settings_files = [task.result() for task in settings_file_tasks]

        if not parser == ParserType.LEGACY:
            raw_lang = await download_file(
                client, repo, branch, SourceType.LANG_FILE, repo.lang_file_path
            )
        else:
            raw_lang = None

        branches.append(
            WrappedRepoData(
                name=repo.name,
                owner_repo=repo.owner_repo,
                branch=branch,
                raw_settings_files=settings_files,
                raw_lang_file=raw_lang,
                source=repo.source,
                parser=parser,
            )
        )

    return branches


async def fetch_data(repos: RepoMeta) -> list[WrappedRepoData]:
    async with AsyncClient() as client:
        tasks = [
            download_repo(client, parser, repo)
            for parser, repos in repos.combined()
            for repo in repos
        ]
        return await asyncio.gather(*tasks, return_exceptions=False)
