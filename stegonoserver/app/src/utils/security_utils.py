"""Security Utils"""
import json
import time

import jwt
import requests as req


with open("config/config.json", "r") as configFile:
    # Get the signature, JWT life, and captcha secret from the configs.
    config = json.load(configFile)
    configFile.close()

secret_key = config["jwtSecret"]


def encode_token() -> str:
    """Encodes a new token."""
    # Gets current time to encode into JWT as a timestamp.
    timestamp = int(round(time.time() * 1000))

    token_components = {"timestamp": timestamp}
    token = jwt.encode(token_components, secret_key, algorithm="HS256")

    return token


def validate_captcha(captcha_value: str) -> bool:
    """Validates captcha in an incomming request."""    
    catpcha_url = ("https://www.google.com/recaptcha/api/siteverify?secret="
                    + config["captchaSecret"] + "&response=" + captcha_value)
    captcha_response = req.post(catpcha_url, timeout=20).json()

    if captcha_response["success"]:
        return True

    # If the captcha response is not a success.
    return False


def validate_jwt(token: str) -> bool:
    """Validates JWTs"""
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])

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
