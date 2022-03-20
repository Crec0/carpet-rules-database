import re
from collections import defaultdict

from generator.regex import Patterns
from generator.rule import Rule


def get_default_values_for_type(value_type: str) -> str:
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


def replace_md_links_with_key(string: str) -> str:
    """
    Replaces markdown with HTML tags.

    :param string: the string to replace
    :return: the replaced string
    """
    return re.sub(Patterns.MD_LINK, r"'\g<text>'", string)


def strip(string: str | None) -> str | None:
    if string is None:
        return None
    return string.strip('", ')


def webhook_stats(rules: list[Rule]) -> str:
    rule_count = defaultdict(int)
    c = 0
    for rule in rules:
        rule_count[rule.repo] += 1
        c += 1

    description = f"**Rules parsed:** {c}\n\n"

    description += "\n".join(
        f"**{repo}**: {count}\n"
        for repo, count in sorted(
            rule_count.items(), key=lambda x: x[1], reverse=True
        )
    )

    return description
