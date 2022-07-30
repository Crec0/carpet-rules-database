import json

from generator import rule
from generator.parsers.v1_parser import V1Parser
from generator.util import webhook_stats


def main():
    # data_json = assemble_data(fetch_data())
    # with open("../data/downloaded_data.json", "w") as f:
    #     json.dump(data_json, f, indent=4)

    with open("../data/downloaded_data.json", "r") as f:
        data_json = json.load(f)

    parsed_rules = []
    for branch in data_json:
        parser = V1Parser(branch, data_json[branch])
        parser.parse()
        parsed_rules.extend(parser.rules)

    rules = rule.group_by_repo(parsed_rules)
    print(webhook_stats(rules))

    with open("../data/parsed_data.json", "w") as f:
        json.dump(rules, f, cls=rule.RuleEncoder, indent=4)


if __name__ == "__main__":
    main()
