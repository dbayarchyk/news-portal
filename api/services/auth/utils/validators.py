import re

def validate_email(email, checkFormat = True):
    if email is None or len(email) == 0:
        raise ValueError('Please provide an email.')

    if checkFormat is False:
        return

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        raise ValueError('Please provide an email in the following format: example@example.com.')

PASSWORD_MIN_LENGTH = 8

def validate_password(password, checkFormat = True):
    if password is None or len(password) == 0:
        raise ValueError('Please provide a password.')

    if checkFormat is False:
        return

    unmatched_rule_messages = []

    if len(password) < PASSWORD_MIN_LENGTH:
        unmatched_rule_messages.append('* At least {} symbols.'.format(PASSWORD_MIN_LENGTH))

    if not re.match(r"\d", password):
        unmatched_rule_messages.append('* At least 1 number.')

    if not re.match(r"\D", password):
        unmatched_rule_messages.append('* At least 1 character.')

    if len(unmatched_rule_messages) != 0:
        unmatched_rules_str = '\n'.join(unmatched_rule_messages)

        raise ValueError('Please provide a password that matches the following rules:\n{}'.format(unmatched_rules_str))

