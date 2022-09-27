from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class DummyAPI(Resource):
    def get(self):
        response_body = {"body": "Hello"}
        return response_body

api.add_resource(DummyAPI, "/", endpoint = "/")