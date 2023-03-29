from dataclasses import dataclass, field
from typing import Callable, Optional

from dataclasses_json import dataclass_json


@dataclass_json
@dataclass
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

    name: str = None
    description: str = None
    type: str = None
    value: str = None
    repo: str = None
    strict: bool = True
    options: Optional[list[str]] = None
    extras: Optional[list[str]] = None
    branches: set[str] = field(default_factory=set)
    categories: list[str] = field(default_factory=list)
    validators: list[str] = field(default_factory=list)

    def __hash__(self) -> int:
        return hash((hash(self.name), hash(self.type), hash(self.repo)))


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
            grouped_rules[rule_hash].categories = {
                *rule.categories,
                *grouped_rules[rule_hash].categories,
            }
            grouped_rules[rule_hash].validators = {
                *rule.validators,
                *grouped_rules[rule_hash].validators,
            }
    return list(grouped_rules.values())


def associate_by(
    rules: list[Rule], func: Callable[[Rule], str]
) -> dict[str, Rule]:
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
