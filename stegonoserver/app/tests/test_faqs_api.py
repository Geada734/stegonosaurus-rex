"""Test the FAQs API."""
import json

from flask_restful import Api

from src.utils import security_utils as sec
from src.controllers import faqs_controller as faqs_con


config = sec.load_config()


# FAQs retrieval tests:
def test_decode(testegonoserver, timestamp_now, mocker, mockgo_db):
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

    assert data == {} and response.status_code == 200
