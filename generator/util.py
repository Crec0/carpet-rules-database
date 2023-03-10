from collections import defaultdict

from generator.tokenizer.rule import Rule


def get_default_values_for_type(value_type: str) -> str:
    """
    Returns the default value for the given value type.

    Expects the value type to be boolean, string, or int

    :param value_type: a string representing the value type
    :return: the default value for the given value type
    """
    match value_type:
        case 'boolean':
            return 'false'
        case 'int':
            return '0'
        case 'String':
            return ''


def webhook_stats(rules: list[Rule]) -> str:
    rule_count = defaultdict(int)
    c = 0
    for rule in rules:
        rule_count[rule.repo] += 1
        c += 1

    description = f'**Rules parsed:** {c}\n\n'

    description += '\n'.join(
        f'**{repo}**: {count}'
        for repo, count in sorted(
            rule_count.items(), key=lambda x: x[1], reverse=True
        )
    )

    return description
