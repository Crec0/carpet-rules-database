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
        self.repo_branch: str = ""

    def __hash__(self) -> int:
        return hash((hash(self.name), hash(self.repo_branch)))

    def __eq__(self, other: Any) -> bool:
        if not isinstance(other, Rule):
            return False
        return self.name == other.name and self.repo_branch == other.repo_branch

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
            f"Repo Branch: {self.repo_branch}\n"
        )


class RuleEncoder(json.JSONEncoder):
    def default(self, obj: Any) -> Any:
        if isinstance(obj, Rule):
            rule_dict = {
                "name": obj.name,
                "description": obj.description,
                "type": obj.type,
                "value": obj.value,
                "categories": obj.categories,
                "strict": obj.strict,
                "options": obj.options,
                "extras": obj.extras,
                "validators": obj.validators,
                "branch": obj.repo_branch,
            }
            return rule_dict
        return super().default(obj)


def get_default_values_for_type(value_type):
    """
    Returns the default value for the given value type.

    Expects the value type to be boolean, string, or int

    :param value_type: a string representing the value type
    :return: the default value for the given value type
    """
    match value_type:
        case "boolean":
            return "false"
        case "int":
            return "0"
        case "String":
            return ""
