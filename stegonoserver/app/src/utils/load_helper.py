"""Util used to load files."""
import json


def load_constants():
    """Loads the string constants used in the app."""
    with open("app/src/static/strings_constants.json", "r") as constants_file:
        constants = json.load(constants_file)
        constants_file.close()

    return constants
