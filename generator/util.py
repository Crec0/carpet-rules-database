import re

from generator.regex import Patterns


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


def replace_md_html(string: str) -> str:
    """
    Replaces markdown with HTML tags.

    :param string: the string to replace
    :return: the replaced string
    """
    return re.sub(
        Patterns.MD_LINK, r'<a class="link" href="\g<url>">\g<text></a>', string
    )


def strip(string: str | None) -> str | None:
    if string is None:
        return None
    return string.strip('" ')
