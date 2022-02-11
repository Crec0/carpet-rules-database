import asyncio
import json
from itertools import product

import httpx


def fetch_data() -> str:
    repo_links = read_repos_as_list()
    download_coro = download_repos(repo_links)
    return asyncio.run(download_coro)


def read_repos_as_list() -> list[str]:
    """
    Converts the repos from json to list
    """
    with open("../data/repos.json", "r") as f:
        json_data = json.load(f)

    repos_list = []
    for repo in json_data["ruleSources"]:
        for settingsFile, branch in product(repo["settingsFiles"], repo["branches"]):
            repos_list.append(
                f"https://raw.githubusercontent.com/{repo['ownerRepo']}/{branch}/src/main/java/{settingsFile}"
            )
    return repos_list


async def download_file(client, url: str) -> str:
    try:
        response = await client.get(url)
        if response.status_code == 200:
            return response.text
        print(f"Error: {response.status_code} - {url}")
    except TimeoutError:
        print(f"TimeoutError: {url}")


async def download_repos(file_links: list[str]) -> str:
    async with httpx.AsyncClient() as client:
        result = await asyncio.gather(
            *[download_file(client, link) for link in file_links]
        )
    return "\n".join(result)
