"""Test the FAQs API."""
import json

from flask_restful import Api
from pymongo import errors as me

from src.utils import security_utils as sec
from src.controllers import faqs_controller as faqs_con


config = sec.load_config()


# FAQs retrieval tests:
def test_get_faqs(testegonoserver, timestamp_now, mocker, mockgo_db):
    """Test valid FAQs retrieval."""
    token = sec.encode_token(config, timestamp_now)

    mocker.patch.object(faqs_con, "faqs_db", new=mockgo_db.stegonodb.faqs)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}

    client = app.test_client()

    response = client.get("/faqs", headers=headers)
    data = json.loads(response.data)

    assert (response.status_code == 200 and
            data == {"faqs": [{
                        "id": 1,
                        "en": {
                            "question": "Test Question 1",
                            "answer": "Test Answer 1" 
                        },
                        "es": {
                            "question": "Test Pregunta 1",
                            "answer": "Test Respuesta 1" 
                        }
                    }, {
                        "id": 2,
                        "en": {
                            "question": "Test Question 2",
                            "answer": "Test Answer 2" 
                        },
                        "es": {
                            "question": "Test Pregunta 2",
                            "answer": "Test Respuesta 2" 
                        }
                    }]})


def test_wrapper_on_faqs_endpoint(testegonoserver, timestamp_now, test_config):
    """Test calling FAQs endpoint with a bad JWT."""
    token = sec.encode_token(test_config, timestamp_now)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}

    client = app.test_client()

    response = client.get("/faqs", headers=headers)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })
