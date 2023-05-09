import jwt
import json

def encode_token(username):

    with open("config/config.json") as configFile:
        config = json.load(configFile)
        configFile.close()

    secret_key = config["jwtSecret"]
    token = jwt.encode({"username": username}, secret_key, algorithm='HS256')

    return token
    