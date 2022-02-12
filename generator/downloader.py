import asyncio
import json
from collections import defaultdict
from itertools import product
from typing import Iterable

import httpx


def fetch_data() -> Iterable:
    repo_links, branch_links = read_repos_as_list()
    download_coro = download_repos(repo_links)
    return zip(branch_links, asyncio.run(download_coro))


def read_repos_as_list() -> tuple[list[str], list[str]]:
    """
    Converts the repos from json to list of links
    """
    with open("../data/repos.json", "r") as f:
        json_data = json.load(f)

    repos_list = []
    branch_links = []
    for repo in json_data["ruleSources"]:
        for settingsFile, branch in product(repo["settingsFiles"], repo["branches"]):
            repos_list.append(
                f"https://raw.githubusercontent.com/{repo['ownerRepo']}/{branch}/src/main/java/{settingsFile}"
            )
            branch_links.append(f"{repo['ownerRepo']}/tree/{branch}")
    return repos_list, branch_links


async def download_file(client, url: str) -> str:
    try:
        response = await client.get(url)
        if response.status_code == 200:
            return response.text
        print(f"Error: {response.status_code} - {url}")
    except TimeoutError:
        print(f"TimeoutError: {url}")
    else:
        return ""


async def download_repos(file_links: list[str]) -> tuple:
    async with httpx.AsyncClient() as client:
        result = await asyncio.gather(
            *[download_file(client, link) for link in file_links]
        )
    return result


def assemble_data(data: Iterable) -> dict:
    data_dict: dict[str, str] = defaultdict(lambda: "")
    for branch, content in data:
        data_dict[branch] = "\n".join([data_dict[branch], content])
    return data_dict


if __name__ == "__main__":
    owner_content = assemble_data(fetch_data())
    with open("../data/downloaded_data.json", "w") as f:
        json.dump(owner_content, f, indent=4)
