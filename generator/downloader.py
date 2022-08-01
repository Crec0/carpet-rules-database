import asyncio
from itertools import product
from typing import Iterable

import httpx
from httpx import AsyncClient

from generator.regex import Patterns
from generator.types import REPOS_JSON, REPO_RESULT, ASSEMBLED_DATA


def source_file_uri(host: str, repo: str, branch: str, file: str) -> str:
    if host == "github":
        return f"https://raw.githubusercontent.com/{repo}/{branch}/src/main/java/{file}"
    elif host == "gitlab":
        return f"https://gitlab.com/{repo}/-/raw/{branch}/src/main/java/{file}"
    else:
        raise ValueError(f"Unknown host: {host}")


def lang_file_uri(host: str, repo: str, branch: str, file: str) -> str:
    if host == "github":
        return f"https://raw.githubusercontent.com/{repo}/{branch}/src/main/resources/{file}"
    elif host == "gitlab":
        return f"https://gitlab.com/{repo}/-/raw/{branch}/src/main/resources/{file}"
    else:
        raise ValueError(f"Unknown host: {host}")


def url_generator(repos: REPOS_JSON) -> Iterable[REPO_RESULT]:
    for parser in repos:
        for host in repos[parser]:
            for repo in repos[parser][host]:
                for settingsFile, branch in product(repo["settings-files"], repo["branches"]):
                    owner_repo = repo["owner-repo"]
                    yield (
                        parser,
                        "source",
                        owner_repo,
                        branch,
                        source_file_uri(host, owner_repo, branch, settingsFile),
                    )

                if parser == "v2" or parser == "vt":
                    for langFile, branch in product(repo["lang-files"], repo["branches"]):
                        owner_repo = repo["owner-repo"]
                        yield (
                            parser,
                            "lang",
                            owner_repo,
                            branch,
                            lang_file_uri(host, owner_repo, branch, langFile)
                        )


async def download_file(client: AsyncClient, parser: str, typ: str, repo: str, branch: str, url: str) -> REPO_RESULT:
    try:
        response = await client.get(url)
        if response.status_code == 200:
            return parser, typ, repo, branch, response.text
        print(f"Error: {response.status_code} - {url}")
    except TimeoutError:
        print(f"TimeoutError: {url}")
    else:
        return "", "", "", "", ""


async def download_repos(repos: REPOS_JSON) -> tuple:
    async with httpx.AsyncClient() as client:
        result = await asyncio.gather(
            *[download_file(client, parser, typ, repo, branch, url) for (parser, typ, repo, branch, url) in url_generator(repos)]
        )
    return result


def assemble_results(results: Iterable[REPO_RESULT]) -> ASSEMBLED_DATA:
    clean_results: ASSEMBLED_DATA = {}
    for parser, typ, repo, branch, text in results:
        if parser not in clean_results:
            clean_results[parser] = {}
        if typ not in clean_results[parser]:
            clean_results[parser][typ] = {}
        clean_results[parser][typ][f"{repo}{Patterns.SPLITTER_STR}{branch}"] = text
    return clean_results


def fetch_data(repos: REPOS_JSON) -> ASSEMBLED_DATA:
    results = asyncio.run(download_repos(repos))
    return assemble_results(results)
