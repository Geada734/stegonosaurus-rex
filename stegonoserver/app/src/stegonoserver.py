"""Server app file."""
import json
import time

from bson import json_util
from flask_cors import CORS
from flask_restful import Api, Resource
from flask import Flask, request, Response
from pymongo import MongoClient, errors as me
from PIL import Image, UnidentifiedImageError

import utils.decorators as dec
import utils.error_handlers as err_handlers
import utils.security_utils as sec
import utils.stegono_utils as stegono


app = Flask(__name__)
CORS(app)
api = Api(app)

with open("config/config.json", "r") as configFile:
    # Get the Mongo connection from configs.
    config = json.load(configFile)
    configFile.close()

db_client = MongoClient(config["mongoServer"])
db = db_client.stegonodb
faqs_db = db.faqs


@app.errorhandler(Exception)
def handle_error(err: Exception) -> Response:
    """Handles any unspecified exception."""
    return err_handlers.handle_exception(err, "unknown", "Unknown internal error.")


class Token(Resource):
    """API for JWT generation"""
    def get(self) -> Response:
        """Endpoint to get token"""
        # Gets current time to encode into JWT as a timestamp.
        timestamp = int(round(time.time() * 1000))
        token = sec.encode_token(config, timestamp)
        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({
            "token":  token
        })

        return response


class DecodeAPI(Resource):
    """Decode API"""
    @dec.jwt_secured
    def post(self) -> Response:
        """Decode endpoint"""
        try:
            file = Image.open(request.files["img"])
            filename = request.form.get("filename")
            mode = request.form.get("mode")
            captcha_value = request.form.get("captchaValue")
            response = Response(mimetype="application/json")

            if captcha_value:
                # The call comes from the browser if it has a captcha_value in the body.
                if not sec.validate_captcha(captcha_value, config):
                    file.close()

                    return err_handlers.handle_internal_error("unknown", "Unknown internal error",
                                                            500, "Failed captcha validation")

            return stegono.decode(file, filename, mode, response)

        # If the file provided is not an image.
        except UnidentifiedImageError as err:
            return err_handlers.handle_exception(err, "wrongFormat",
                                                "The file provided is not a valid image.")


# Service connections.
class EncodeAPI(Resource):
    """Encode API"""
    @dec.jwt_secured
    def post(self) -> Response:
        """Encode endpoint"""
        try:
            coded_file = Image.open(request.files["coded"])
            img_file = Image.open(request.files["img"])
            filename = request.form.get("filename")
            captcha_value = request.form.get("captchaValue")
            response = Response(mimetype="application/json")

            if captcha_value:
                coded_file.close()
                img_file.close()
                # The call comes from the browser if it has a captcha_value in the body.
                if not sec.validate_captcha(captcha_value, config):
                    return err_handlers.handle_internal_error("unknown", "Unknown internal error",
                                                            500, "Failed captcha validation")

            return stegono.encode(coded_file, img_file, filename, response)

        # If either file is not an image.
        except UnidentifiedImageError as err:
            return err_handlers.handle_exception(err, "wrongFormat",
                                                "The file provided is not a valid image.")


class FAQsAPI(Resource):
    """FAQs API"""
    @dec.jwt_secured
    def get(self) -> Response:
        """Get FAQs endpoint"""
        try:
            db_content = list(faqs_db.find({}, {"_id": 0, "rating": 0}))
            data = json_util.dumps(db_content)

            response = Response(mimetype="application/json")
            response.status_code = 200
            response.data = json.dumps({"faqs": json.loads(data)})

            return response

        # If the connection to the Mongo DB is not available.
        except me.ServerSelectionTimeoutError as err:
            return err_handlers.handle_exception(err, "noMongoDB", "No Mongo DB available.")


    @dec.jwt_secured
    def put(self) -> Response:
        """FAQs rating endpoint"""
        q_id = int(request.form.get("id"))
        vote = int(request.form.get("vote"))

        try:
            # Modifies the "rating" values for a given question.
            faqs_db.update_one({"id": q_id}, {"$inc": {"rating": vote}})

            response = Response(mimetype="application/json")
            response.status_code = 200

            response.data = json.dumps({
                "message": "Vote submitted succesfully."
            })

            return response

        # If the connection to the Mongo DB is not available.
        except me.ServerSelectionTimeoutError as err:
            return err_handlers.handle_exception(err, "noMongoDB", "No Mongo DB available.")


api.add_resource(DecodeAPI, "/decode")
api.add_resource(EncodeAPI, "/encode")
api.add_resource(FAQsAPI, "/faqs")
api.add_resource(Token, "/token")
