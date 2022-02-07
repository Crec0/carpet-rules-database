import re


class Patterns:
    JAVADOC = re.compile(r'/\*[\s\S]*?\*/', re.MULTILINE)
    JAVA_COMMENT = re.compile(r'//.*', re.MULTILINE)
    DOUBLE_SPACE = re.compile(r'(?:\s\s)+', re.MULTILINE)
    TOKEN_SPLITTER = re.compile(r'(["\-\\=,;:/(){}@[\]<>&*!|?`+#%~^$])')
    VALIDATOR_CLASS = re.compile(r'class(?P<name>\w+).*extendsValidator')
    WORD = re.compile(r'(\w+)')
    VALIDATOR_DESCRIPTION = r'description \(\) {return (?P<description>".+);'
