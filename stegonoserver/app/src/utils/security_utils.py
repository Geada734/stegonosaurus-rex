"""Security Utils"""
import json
import time

import jwt
import requests as req


def load_config():
    """Loads the necessary configs for the app."""
    with open("config/config.json", "r") as config_file:
        config = json.load(config_file)
        config_file.close()

    return config


def encode_token(config: dict, timestamp: int) -> str:
    """Encodes a new token."""
    token_components = {"timestamp": timestamp}
    token = jwt.encode(token_components, config["jwtSecret"], algorithm="HS256")

    return token


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


def validate_jwt(token: str, config: dict) -> bool:
    """Validates JWTs"""
    try:
        decoded_token = jwt.decode(token, config["jwtSecret"], algorithms=["HS256"])

        if "timestamp" in decoded_token:
            now = int(round(time.time() * 1000))

            # Checks if the token is still valid using the JWT life from configs.
            if now - decoded_token["timestamp"] > config["jwtLifeMinutes"] * 60000:
                return False

        else:
            return False

    except jwt.exceptions.DecodeError:
        # In case the JWT is invalid.
        return False

    return True
