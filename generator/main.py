import asyncio
import functools
import json
import operator
import time
from collections import defaultdict
from typing import Optional

import toml

from generator.preprocessor.downloader import fetch_data
from generator.parsers.parser_type import ParserType
from generator.parsers.abstract_parser import AbstractParser
from generator.parsers.legacy_parser import V1Parser
from generator.parsers.v2_parser import V2Parser
from generator.parsers.rule import Rule
from generator.types import ASSEMBLED_DATA


async def parse_rules_for_version(
    version: ParserType,
    source_dict: dict[str, str],
    lang_dict: Optional[dict[str, str]] = None,
) -> list[Rule]:
    if lang_dict is None:
        lang_dict = defaultdict(lambda: None)

    parsed_rules: list[Rule] = []

    for source_path, source in source_dict.items():

        parser: AbstractParser

        if version == ParserType.LEGACY:
            parser = V1Parser(source_path, source, lang_dict[source_path])
        elif version == ParserType.TRANSLATIONS_JSON:
            parser = V2Parser(source_path, source, lang_dict[source_path])
        elif version == ParserType.TRANSLATIONS_YAML:
            print('V2YAML')
            continue
            # parser = V2YamlParser(source_path, source, lang_dict[source_path])
        else:
            raise ValueError(f'Unknown parser version: {version}')

        parser.parse()
        parsed_rules.extend(parser.rules)

    return parsed_rules


async def process_data(data_json: ASSEMBLED_DATA) -> list[Rule]:
    return functools.reduce(
        operator.iconcat,
        await asyncio.gather(
            *[
                parse_rules_for_version(
                    version,
                    source_lang_dict['source'],
                    source_lang_dict['lang']
                    if 'lang' in source_lang_dict
                    else None,
                )
                for (version, source_lang_dict) in data_json.items()
            ]
        ),
        [],
    )


def timeit(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        ts = time.perf_counter_ns()
        result = func(*args, **kw)
        te = time.perf_counter_ns()
        print(
            f'func:{func.__name__} args:[{args}, {kw}] took: {(te - ts) / 1_000_000_000:2.4f} sec'
        )
        return result

    return wrapper


@timeit
def main():
    with open('../data/repos.toml', 'r') as f:
        repos = toml.load(f)

    raw_data = fetch_data(repos)

    with open('../data/downloaded_data.json', 'w') as f:
        f.write(json.dumps(raw_data))

    with open('../data/downloaded_data.json', 'r') as f:
        raw_data = json.load(f)

    # with open("../data/assembled_data.json", "w") as f:
    #     f.write(json.dumps(raw_data))

    parsed_rules = asyncio.run(process_data(raw_data))

    print(
        *sorted(
            list(
                set(
                    [
                        f'{rule.repo}/tree/{list(rule.branches)[0]}'
                        for rule in parsed_rules
                        if rule.description == ''
                    ]
                )
            )
        ),
        sep='\n',
        end='\n\n',
    )

    # rules = group_by_repo(parsed_rules)
    # print(webhook_stats(rules))

    # with open("../data/parsed_data.json", "w") as f:
    #     f.write(json.dumps(rules))


def sort_repos():

    with open('../data/repos.toml', 'r') as file:
        repos = load(file)

    sorted_repos = {}

    for version, repoz in [repos.items()]:
        sorted_repos[version] = sorted(repoz, key=lambda repo: repo['name'])

    with open('../data/srepos.toml', 'w') as file:
        dump(sorted_repos, file)


if __name__ == '__main__':
    main()
    # sort_repos()
