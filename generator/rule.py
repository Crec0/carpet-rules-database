import json
from typing import Any


class Rule:
    """
    Rule class that contains all the information about the carpet rule.

    - name (str): Name of the rule.
    - description (str): Description of the rule.
    - type (str): Type of the rule.
    - value (str): Value of the rule.
    - strict (bool): if options provided are strictly required or not.
    - categories (list): List of categories for the rule.
    - options (list): List of options for the rule.
    - extras (list): List of extra information for the rule.
    - validators (list): List of validators info for the rule.
    - repo (str): Repository of the rule.
    - branches (list): List of branches the rule is available in the repository.
    """

    def __init__(self):
        self.name: str = ""
        self.description: str = ""
        self.type: str = ""
        self.value: str = ""
        self.strict: bool = True
        self.categories: list[str] = []
        self.options: list[str] | None = None
        self.extras: list[str] | None = None
        self.validators: list[str] | None = None
        self.repo: str = ""
        self.branches: set[str] = set()

    def __hash__(self) -> int:
        return hash((
            hash(self.name),
            hash(self.type),
            hash(self.repo)
        ))

    def __repr__(self):
        return (
            f"{self.name}\n"
            f"Type: {self.type}\n"
            f"Categories: {self.categories}\n"
            f"Description: {self.description}\n"
            f"Extras: {self.extras}\n"
            f"Default Value: {self.value}\n"
            f"Options: {self.options}\n"
            f"Strict: {self.strict}\n"
            f"Validators: {self.validators}\n"
            f"Repo: {self.repo}\n"
            f"Branches: {self.branches}"
        )


class RuleEncoder(json.JSONEncoder):
    def default(self, obj: Any) -> Any:
        if isinstance(obj, Rule):
            rule_dict = {
                "name": obj.name,
                "description": obj.description,
                "type": obj.type,
                "value": obj.value,
                "categories": sorted(obj.categories),
                "strict": obj.strict,
                "options": sorted(obj.options) if obj.options else None,
                "extras": obj.extras,
                "validators": sorted(obj.validators) if obj.validators else None,
                "repo": obj.repo,
                "branches": sorted(obj.branches),
            }
            return rule_dict
        return super().default(obj)


def group_by_repo(rules: list[Rule]) -> list[Rule]:
    """
    Combines the rules into one instance if they have different branch but same repo

    :param rules: list of rules
    :return: dictionary of rules grouped by repository
    """
    grouped_rules: dict[int, Rule] = {}
    for rule in rules:
        rule_hash = hash(rule)
        if rule_hash not in grouped_rules:
            grouped_rules[rule_hash] = rule
        else:
            grouped_rules[rule_hash].branches |= rule.branches
    return list(grouped_rules.values())
