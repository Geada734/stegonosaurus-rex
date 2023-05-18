import json
from pymongo import MongoClient, errors as me

def main():
    with open("config/config.json") as configFile:
        config = json.load(configFile)
        configFile.close()

    with open("static/questions.json") as faqsFile:
        faqs = json.load(faqsFile)
        faqsFile.close()

    db_client = MongoClient(config["mongoServer"])
    db = db_client.stegonodb

    faqs_db = db.faqs

    try:
        faqs_db.delete_many({})
        faqs_db.insert_many(faqs)

    except(me.ServerSelectionTimeoutError):
        print("ERROR: No MongDB connection.")

    print("DB built successfully!")

main()