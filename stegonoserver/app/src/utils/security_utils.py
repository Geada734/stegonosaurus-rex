"""Security Utils"""
import json

import requests as req


def load_config():
    """Loads the necessary configs for the app."""
    with open("config/config.json", "r") as config_file:
        config = json.load(config_file)
        config_file.close()

    return config


def call_captcha_url(captcha_value, config):
    """Util function to call the captcha validation endpoint.""" 
    catpcha_url = config["captchaUrl"] + config["captchaSecret"] + "&response=" + captcha_value

    return req.post(catpcha_url, timeout=20).json()


def validate_captcha(captcha_value: str, config: dict) -> bool:
    """Validates captcha in an incomming request."""    
    captcha_response = call_captcha_url(captcha_value, config)

    if "success" in captcha_response and captcha_response["success"]:
        return True

    # If the captcha response is not a success.
    return False
