from typing import Callable


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
        return hash((hash(self.name), hash(self.type), hash(self.repo)))

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


def associate_by(rules: list[Rule], func: Callable[[Rule], str]) -> dict[str, Rule]:
    """
    Associates the rules to a key provided by the function.

    :param rules: list of rules
    :param func: key generator function that takes a rule as input and returns a string key
    :return: dictionary of rules associated to the key
    """
    grouped_rules: dict[str, Rule] = {}
    for rule in rules:
        grouped_rules[func(rule)] = rule
    return grouped_rules
