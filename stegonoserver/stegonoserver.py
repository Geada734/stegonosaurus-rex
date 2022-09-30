import base64
from PIL import Image
from io import BytesIO
from flask import Flask
from flask import request
from flask import send_file
from flask_restful import Api, Resource

app = Flask(__name__)
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

api.add_resource(DummyAPI, "/dummy")