"""Server app file."""
import json

from bson import json_util
from flask_cors import CORS
from PIL import UnidentifiedImageError
from flask_restful import Api, Resource
from flask import Flask, request, Response
from pymongo import MongoClient, errors as me
from stegonosaurus import stegoexceptions as se

import utils.decorators as dec
import utils.error_handlers as err_handlers
import utils.security_utils as sec
import utils.stegono_utils as stegono


app = Flask(__name__)
CORS(app)
api = Api(app)


with open("config/config.json", "r") as configFile:
    config = json.load(configFile)
    configFile.close()


db_client = MongoClient(config["mongoServer"])
db = db_client.stegonodb
faqs_db = db.faqs


# Error handlers for multiple types of exceptions.
@app.errorhandler(se.StegonosaurusIncorrectFormatError)
def handle_stego_format_exception(err: se.StegonosaurusIncorrectFormatError) -> Response:
    """Handles format exceptions."""
    return err_handlers.handle_exception(err, "wrongFormat", err.message)


@app.errorhandler(se.StegonosaurusIncorrectSizeError)
def handle_stego_size_exception(err: se.StegonosaurusIncorrectSizeError) -> Response:
    """Handles size exceptions."""
    return err_handlers.handle_exception(err, "wrongSize", err.message)


@app.errorhandler(se.StegonosaurusInvalidDecodeModeError)
def handle_stego_decode_mode_exception(err: se.StegonosaurusInvalidDecodeModeError) -> Response:
    """Handles invalid devode mode exceptions."""
    return err_handlers.handle_exception(err, "wrongDecodeMode", err.message)


@app.errorhandler(me.ServerSelectionTimeoutError)
def handle_server_selection_timeout_error(err: me.ServerSelectionTimeoutError) -> Response:
    """Handles error when there is no Mongo DB available."""
    return err_handlers.handle_exception(err, "noMongoDB", "No Mongo DB available.")


@app.errorhandler(UnidentifiedImageError)
def handle_unidentified_image_error(err: UnidentifiedImageError) -> Response:
    """Handles error when an incomming file is not an image."""
    return err_handlers.handle_exception(err, "wrongFormat",
                                        "The file provided is not a valid image.")


@app.errorhandler(Exception)
def handle_error(err: Exception) -> Response:
    """Handles any unspecified exception."""
    return err_handlers.handle_exception(err, "unknown", "Unknown internal error.")


class Token(Resource):
    """API for JWT generation"""
    def get(self) -> Response:
        """Endpoint to get token"""
        token = sec.encode_token()
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
        file = request.files["img"]
        filename = request.form.get("filename")
        mode = request.form.get("mode")
        captcha_value = request.form.get("captchaValue")
        response = Response(mimetype="application/json")

        if captcha_value:
            if not sec.validate_captcha(captcha_value):
                response.status_code = 500
                response.data = json.dumps({
                    "error_codename": "unknown",
                    "error_message": "Unknown internal error"
                })

                return response

        return stegono.decode(file, filename, mode, response)


# Service connections.
class EncodeAPI(Resource):
    """Encode API"""
    @dec.jwt_secured
    def post(self) -> Response:
        """Encode endpoint"""
        coded_file = request.files["coded"]
        img_file = request.files["img"]
        filename = request.form.get("filename")
        captcha_value = request.form.get("captchaValue")
        response = Response(mimetype="application/json")

        if captcha_value:
            if not sec.validate_captcha(captcha_value):
                response.status_code = 500
                response.data = json.dumps({
                    "error_codename": "unknown",
                    "error_message": "Unknown internal error"
                })

                return response

        return stegono.encode(coded_file, img_file, filename, response)


class FAQsAPI(Resource):
    """FAQs API"""
    @dec.jwt_secured
    def get(self) -> Response:
        """Get FAQs endpoint"""
        db_content = list(faqs_db.find({}, {"_id": 0, "rating": 0}))
        data = json_util.dumps(db_content)

        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({"faqs": json.loads(data)})

        return response


    @dec.jwt_secured
    def put(self) -> Response:
        """FAQs rating endpoint"""
        q_id = int(request.form.get("id"))
        vote = int(request.form.get("vote"))

        faqs_db.update_one({"id": q_id}, {"$inc": {"rating": vote}})

        response = Response(mimetype="application/json")
        response.status_code = 200

        response.data = json.dumps({
            "message": "Vote submitted succesfully."
        })

        return response


api.add_resource(DecodeAPI, "/decode")
api.add_resource(EncodeAPI, "/encode")
api.add_resource(FAQsAPI, "/faqs")
api.add_resource(Token, "/token")
