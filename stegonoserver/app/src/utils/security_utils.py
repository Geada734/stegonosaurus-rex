import jwt
import json
import time
import requests as req

with open("config/config.json") as configFile:
    config = json.load(configFile)
    configFile.close()

def encode_token(username):

    timestamp = int(round(time.time() * 1000))

    token_components = {"timestamp": timestamp}

    secret_key = config["jwtSecret"]
    token = jwt.encode(token_components, secret_key, algorithm='HS256')

    return token
    
def validate_captcha(captcha_value):    
    catpcha_url = "https://www.google.com/recaptcha/api/siteverify?secret=" + config["captchaSecret"] + "&response=" + captcha_value
    captcha_response = req.post(catpcha_url).json()

    if captcha_response["success"]:
        return True
    
    return False