import asyncio
import json
from functools import reduce
from operator import iconcat
from typing import Type

import pytoml

from generator.downloader import fetch_data
from generator.parsers.abstract_parser import AbstractParser
from generator.parsers.parser_type import ParserType
from generator.parsers.v1_parser import V1Parser
from generator.parsers.v2_parser import V2Parser
from generator.parsers.v2_yaml_parser import V2YamlParser
from generator.tokenizer.rule import Rule, group_by_repo
from generator.types import RepoMeta, WrappedDownloadedData, WrappedRepoData
from generator.util import webhook_stats


def parser_type_by_name(parser_type: ParserType) -> Type[AbstractParser]:
    match parser_type:
        case ParserType.LEGACY:
            return V1Parser
        case ParserType.TRANSLATIONS_JSON:
            return V2Parser
        case ParserType.TRANSLATIONS_YAML:
            return V2YamlParser


async def process_repo(repo: WrappedRepoData) -> list[Rule]:
    parser = parser_type_by_name(repo.parser)(repo)
    parser.parse()
    return parser.rules


async def process_data(data: WrappedDownloadedData) -> list[Rule]:
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(process_repo(repo)) for repo in data.repos]
    return reduce(iconcat, (task.result() for task in tasks), [])


async def generate():
    with open('./data/repos.toml', 'r') as f:
        repos = pytoml.load(f)

    metadata = RepoMeta.from_dict(repos)
    raw_repo_data = await fetch_data(metadata)

    # with open('./data/downloaded_data.json', 'w') as f:
    #     json.dump(WrappedDownloadedData(raw_repo_data).to_dict(), f)
    #
    # with open('./data/downloaded_data.json', 'r') as f:
    #     raw_data = WrappedDownloadedData.from_dict(json.load(f))

    raw_data = WrappedDownloadedData(raw_repo_data)
    parsed_rules = await process_data(raw_data)

    # print(
    #     *sorted(
    #         {
    #             f'{rule.repo}/tree/{list(rule.branches)[0]}'
    #             for rule in parsed_rules
    #             if rule.description == '' or rule.description is None
    #         }
    #     ),
    #     sep='\n',
    #     end='\n\n',
    # )

    rules = group_by_repo(parsed_rules)
    print(webhook_stats(rules))

    with open('./data/parsed_data.json', 'w') as f:
        f.write(json.dumps([r.to_dict() for r in rules]))


# Replace the line `elif isinstance(v, list):` in writer.py from pytoml
r"""
elif isinstance(v, list):
    if len(v) == 1:
        return '[ {0} ]'.format(', '.join(_format_value(obj) for obj in v))
    else:
        return '[\n\t{0}\n]'.format(', \n\t'.join(_format_value(obj) for obj in v))
"""


def sort_repos():
    with open('./data/repos.toml', 'r') as file:
        repos = pytoml.load(file)

    sorted_repos = {}

    for version, repoz in repos.items():
        sorted_repos[version] = sorted(repoz, key=lambda repo: repo['name'])

    with open('./data/repos.toml', 'w') as file:
        pytoml.dump(sorted_repos, file)


def main():
    asyncio.run(generate())


if __name__ == '__main__':
    main()
