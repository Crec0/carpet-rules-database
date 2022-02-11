import json
from typing import Any

MissingString = str | None
MissingStringList = list[str] | None


class Rule:
    """
    Rule class that contains all the information about the carpet rule.
    """

    def __init__(self):
        self.name: MissingString = None
        self.type: MissingString = None
        self.description: MissingString = None
        self.categories: MissingStringList = None
        self.value: MissingString = None
        self.strict: bool = True
        self.options: MissingStringList = None
        self.extras: MissingStringList = None
        self.validators: MissingStringList = None
        self.validator_description: MissingString = None

    def build(self):
        pass

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
            f"Validator Description: {self.validator_description}\n"
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
                "validator_description": obj.validator_description,
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
