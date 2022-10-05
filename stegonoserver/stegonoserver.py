import base64
from PIL import Image
from io import BytesIO
from flask import Flask, request, json, Response
from flask_cors import CORS
from flask_restful import Api, Resource
from stegonosaurus import stego_functions as sf

app = Flask(__name__)
CORS(app)
api = Api(app)

@app.errorhandler(Exception)
def handle_error(e):
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "code": "001",
        "name": "name",
        "description": "Desc",
    })
    
    response.status_code = 500
    
    return response

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

        return response

api.add_resource(DummyAPI, "/dummy")
api.add_resource(DecodeAPI, "/decode")