import json
import base64
import utils.security_utils as sec
import utils.decorators as dec
import utils.error_handlers as err
from io import BytesIO
from bson import json_util
from flask_cors import CORS
from flask_restful import Api, Resource
from pymongo import MongoClient, errors as me
from PIL import Image, UnidentifiedImageError
from stegonosaurus import stegofunctions as sf
from stegonosaurus import stegoexceptions as se
from flask import Flask, request, Response

app = Flask(__name__)
CORS(app)
api = Api(app)

with open("config/config.json") as configFile:
    config = json.load(configFile)
    configFile.close()

db_client = MongoClient(config["mongoServer"])
db = db_client.stegonodb
faqs_db = db.faqs

@app.errorhandler(se.StegonosaurusIncorrectFormatError)
def handle_stego_format_exception(e):
    return err.handle_exception(e, "wrongFormat", e.message)

@app.errorhandler(se.StegonosaurusIncorrectSizeError)
def handle_stego_size_exception(e):
    return err.handle_exception(e, "wrongSize", e.message)

@app.errorhandler(se.StegonosaurusInvalidDecodeModeError)
def handle_stego_decode_mode_exception(e):
    return err.handle_exception(e, "wrongDecodeMode", e.message)

@app.errorhandler(me.ServerSelectionTimeoutError)
def handle_server_selection_timeout_error(e):
    return err.handle_exception(e, "noMongoDB", "No Mongo DB available.")

@app.errorhandler(UnidentifiedImageError)
def handle_unidentified_image_error(e):
    return err.handle_exception(e, "wrongFormat", "The file provided is not a valid image.")

@app.errorhandler(Exception)
def handle_error(e):
    return err.handle_exception(e, "unknown", "Unknown internal error.")

class DummyAPI(Resource):
    @dec.jwt_secured
    def get(self):
        response_body = {"result": "hello"}

        return response_body

    def post(self):
        args = request.files["file"]
        img = Image.open(args)

        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())

        return {"result": img_str.decode("utf-8")}

class Token(Resource):
    def get(self):
        token = sec.encode_token("first_run")
        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({
            "token":  token
        })

        return response

class DecodeAPI(Resource):
    @dec.jwt_secured
    def post(self):
        file = request.files["img"]
        filename = request.form.get("filename")
        mode = request.form.get("mode")
        captcha_value = request.form.get("captchaValue")
        response = Response(mimetype="application/json")

        if(captcha_value):
            if(not sec.validate_captcha(captcha_value)):
                response.status_code = 500
                response.data = json.dumps({
                    "error_codename": "unknown",
                    "error_message": "Unknown internal error"
                })

                return response

        img = Image.open(file)
        img = sf.decode(img, mode)

        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())

        response.status_code = 200
        response.data = json.dumps({
                "result": img_str.decode("utf-8"),
                "filename": "decoded_" + filename
        })

        img.close()

        return response

class EncodeAPI(Resource):
    @dec.jwt_secured
    def post(self):
        coded_file = request.files["coded"]
        img_file = request.files["img"]
        filename = request.form.get("filename")
        captcha_value = request.form.get("captchaValue")
        response = Response(mimetype="application/json")

        if(captcha_value):
            if(not sec.validate_captcha(captcha_value)):
                response.status_code = 500
                response.data = json.dumps({
                    "error_codename": "unknown",
                    "error_message": "Unknown internal error"
                })

                return response

        coded = Image.open(coded_file)
        img = Image.open(img_file)
        img = sf.encode(coded, img)

        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())

        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({
                "result": img_str.decode("utf-8"),
                "filename": "encoded_" + filename
        })

        coded.close()
        img.close()

        return response

class FAQsAPI(Resource):
    @dec.jwt_secured
    def get(self):
        db_content = list(faqs_db.find({}, {"_id": 0, "rating": 0}))
        data = json_util.dumps(db_content)

        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({"faqs": json.loads(data)})

        return response

    @dec.jwt_secured
    def put(self):
        id = int(request.form.get("id"))
        vote = int(request.form.get("vote"))

        faqs_db.update_one({"id": id}, {"$inc": {"rating": vote}})

        response = Response(mimetype="application/json")
        response.status_code = 200

        response.data = json.dumps({
            "message": "Vote submitted succesfully."
        })

        return response

api.add_resource(DummyAPI, "/dummy")
api.add_resource(DecodeAPI, "/decode")
api.add_resource(EncodeAPI, "/encode")
api.add_resource(FAQsAPI, "/faqs")
api.add_resource(Token, "/token")
