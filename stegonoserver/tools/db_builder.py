"""Builds the Mongo DB"""
import json
from pymongo import MongoClient, errors as me


def db_build() -> None:
    """Handles all the building."""
    with open("config/config.json", "r") as config_file:
        config = json.load(config_file)
        config_file.close()

    with open("static/questions.json", "r") as faqs_file:
        faqs = json.load(faqs_file)
        faqs_file.close()

    db_client = MongoClient(config["mongoServer"])
    dbase = db_client.stegonodb

    faqs_db = dbase.faqs

    try:
        faqs_db.delete_many({})
        faqs_db.insert_many(faqs)

    except me.ServerSelectionTimeoutError:
        print("ERROR: No MongDB connection.")

    print("DB built successfully!")


db_build()
