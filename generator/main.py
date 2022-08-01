import pyjson5 as json

from generator.downloader import fetch_data
from generator.parsers.abstract_parser import AbstractParser
from generator.parsers.v1_parser import V1Parser
from generator.parsers.v2_parser import V2Parser
from generator.parsers.vt_parser import VtParser
from generator.rule import group_by_repo, Rule
from generator.util import webhook_stats


def main():
    with open("../data/repos.json", "r") as f:
        repos = json.load(f)

    data_json = fetch_data(repos)

    # with open("../data/downloaded_data.json", "w") as f:
    #     f.write(json.dumps(data_json))

    # with open("../data/downloaded_data.json", "r") as f:
    #     data_json: ASSEMBLED_DATA = json.load(f)

    parsed_rules: list[Rule] = []

    for parser_version, data_set in data_json.items():
        for source_path, source in data_set["source"].items():
            parser: AbstractParser

            if parser_version == "v1":
                parser = V1Parser(source_path, source)
            elif parser_version == "v2":
                parser = V2Parser(source_path, source, data_set["lang"][source_path])
            elif parser_version == "vt":
                parser = VtParser(source_path, source, data_set["lang"][source_path])
            else:
                raise Exception("Unknown parser version: " + parser_version)

            parser.parse()
            parsed_rules.extend(parser.rules)

    rules = group_by_repo(parsed_rules)
    print(webhook_stats(rules))

    with open("../data/parsed_data.json", "w") as f:
        f.write(json.dumps(rules))


if __name__ == "__main__":
    main()
