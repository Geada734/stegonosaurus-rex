import jwt
import json
import time
import requests as req

with open("config/config.json") as configFile:
    config = json.load(configFile)
    configFile.close()

secret_key = config["jwtSecret"]

def encode_token():
    timestamp = int(round(time.time() * 1000))

    token_components = {"timestamp": timestamp}
    token = jwt.encode(token_components, secret_key, algorithm='HS256')

    return token

def validate_captcha(captcha_value):    
    catpcha_url = "https://www.google.com/recaptcha/api/siteverify?secret=" + config["captchaSecret"] + "&response=" + captcha_value
    captcha_response = req.post(catpcha_url).json()

    if captcha_response["success"]:
        return True

    return False

def validate_jwt(token):
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])

        if "timestamp" in decoded_token:
            now = int(round(time.time() * 1000))

            if now - decoded_token["timestamp"] > config["jwtLifeMinutes"] * 60000:
                return False

        else:
            return False

    except jwt.exceptions.DecodeError:
            return False

    return True
