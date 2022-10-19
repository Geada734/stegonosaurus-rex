import json
import base64
from PIL import Image
from io import BytesIO
from bson import json_util
from flask_cors import CORS
from pymongo import MongoClient
from flask_restful import Api, Resource
from flask import Flask, request, json, Response
from pymongo import MongoClient
from stegonosaurus import stego_functions as sf
from stegonosaurus import stego_exceptions as se

app = Flask(__name__)
CORS(app)
api = Api(app)

with open("config/config.json") as configFile:
    config = json.load(configFile)
    configFile.close()

db_client = MongoClient(config["mongoServer"])
db = db_client.stegonodb
faqs_db = db.faqs

@app.errorhandler(se.StegonosaurusIncorrectFormatException)
def handle_stego_format_exception(e):
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": "wrongFormat",
        "error_message": e.message
    })

    print("xxxxxxxxxxxxxxxxxxxxxxxxx")
    print(type(e))
    print(e)
    print("xxxxxxxxxxxxxxxxxxxxxxxxx")

    response.status_code = 500

    return response

@app.errorhandler(se.StegonosaurusIncorrectSizeException)
def handle_stego_size_exception(e):
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": "wrongSize",
        "error_message": e.message
    })

    print("xxxxxxxxxxxxxxxxxxxxxxxxx")
    print(type(e))
    print(e)
    print("xxxxxxxxxxxxxxxxxxxxxxxxx")

    response.status_code = 500

    return response

@app.errorhandler(Exception)
def handle_error(e):
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": "unknown",
        "error_message": "Unknown internal error"
    })

    print("xxxxxxxxxxxxxxxxxxxxxxxxx")
    print(type(e))
    print(e)
    print("xxxxxxxxxxxxxxxxxxxxxxxxx")

    response.status_code = 500

    return response

class DummyAPI(Resource):
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

class DecodeAPI(Resource):
    def post(self):
        file = request.files["img"]
        filename = request.form.get("filename")
        mode = request.form.get("mode")

        img = Image.open(file)
        img = sf.decode(img, mode)

        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())

        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({
                "result": img_str.decode("utf-8"),
                "filename": "decoded_" + filename
        })

        img.close()

        return response

class EncodeAPI(Resource):
    def post(self):
        coded_file = request.files["coded"]
        img_file = request.files["img"]
        filename = request.form.get("filename")

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
    def get(self):
        lang = request.args.get("lang")
        db_content = list(faqs_db.find({}, {lang: 1}))
        data = json_util.dumps(db_content)
        
        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({"db_content": json.loads(data)})

        return response

api.add_resource(DummyAPI, "/dummy")
api.add_resource(DecodeAPI, "/decode")
api.add_resource(EncodeAPI, "/encode")
api.add_resource(FAQsAPI, "/faqs")