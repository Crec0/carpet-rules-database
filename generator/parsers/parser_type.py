from enum import StrEnum


class ParserType(StrEnum):
    LEGACY = 'legacy'
    TRANSLATIONS_JSON = 'translations-json'
    TRANSLATIONS_YAML = 'translations-yaml'
