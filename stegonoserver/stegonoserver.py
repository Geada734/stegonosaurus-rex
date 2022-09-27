from PIL import Image
from flask import Flask
from flask import request
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
        img.show()
        
api.add_resource(DummyAPI, "/dummy")