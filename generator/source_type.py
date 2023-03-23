from enum import StrEnum


class SourceType(StrEnum):
    JAVA_SOURCE = 'java'
    KOTLIN_SOURCE = 'kotlin'
    LANG_FILE = 'resources/assets'
