"""Controller for the FAQs page API."""
import json

from bson import json_util

from flask_restful import Resource
from flask import request, Response
from pymongo import MongoClient, errors as me

from utils import decorators as dec
from utils import error_handlers as err_handlers


with open("config/config.json", "r") as configFile:
    # Get the Mongo connection from configs.
    config = json.load(configFile)
    configFile.close()

db_client = MongoClient(config["mongoServer"])
db = db_client.stegonodb
faqs_db = db.faqs

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
