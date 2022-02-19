import json

from generator import rule
from generator.downloader import assemble_data, fetch_data
from generator.parser import Parser

if __name__ == "__main__":

    data_json = assemble_data(fetch_data())
    # with open("../data/downloaded_data.json", "w") as f:
    #     json.dump(data_json, f, indent=4)

    # with open("../data/downloaded_data.json", "r") as f:
    #     data_json = json.load(f)

    parsed_rules = []
    for branch in data_json:
        parser = Parser(branch, data_json[branch]).parse()
        parsed_rules.extend(parser.rules)

    rules = rule.group_by_repo(parsed_rules)
    print(f"parsed {len(rules)} rules")

    with open("../data/parsed_data.json", "w") as f:
        json.dump(rules, f, cls=rule.RuleEncoder, indent=4)
