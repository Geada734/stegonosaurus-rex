"""Builds the Mongo DB"""
import json

import certifi
from pymongo import MongoClient, errors as me


def build_db() -> None:
    """Handles all the building."""
    with open("config/config.json", "r") as config_file:
        # Get the Mongo connection from configs.
        config = json.load(config_file)
        config_file.close()

    with open("static/questions.json", "r") as faqs_file:
        # Get the FAQs to populate the db.
        faqs = json.load(faqs_file)
        faqs_file.close()

    db_client = MongoClient(config["mongoServer"], tlsCAFile=certifi.where())
    # Call the stegonodb whithin Mongo.
    dbase = db_client.stegonodb

    faqs_db = dbase.faqs

    try:
    # Clean the db to repopulate it.
        faqs_db.delete_many({})
        faqs_db.insert_many(faqs)

        print("DB built successfully!")

    except me.ServerSelectionTimeoutError:
        # Catch error if the Mongo connection is closed.
        print("ERROR: No MongDB connection.")

build_db()
