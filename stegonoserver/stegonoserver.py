import base64
from PIL import Image
from io import BytesIO
from flask import Flask
from flask import request
from flask import send_file
from flask_cors import CORS
from flask_restful import Api, Resource

app = Flask(__name__)
CORS(app)
api = Api(app)

class DummyAPI(Resource):
    def get(self):
        response_body = {"body": "Hello"}
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
        print(request.files)
        file = request.files["img"]
        img = Image.open(file)

        img.show()

        return None

api.add_resource(DummyAPI, "/dummy")
api.add_resource(DecodeAPI, "/decode")