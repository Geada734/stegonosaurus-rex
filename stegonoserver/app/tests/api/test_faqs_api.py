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


def test_no_db_get_faqs(testegonoserver, timestamp_now, mocker, mockgo_db):
    """Test FAQs retrieval with no db connection."""
    def mock_find(*args):
        """Mocks find function to always return a timeout error."""
        raise me.ServerSelectionTimeoutError

    token = sec.encode_token(config, timestamp_now)
    mockgo_db.stegonodb.faqs.find = mock_find
    mocker.patch.object(faqs_con, "faqs_db", new=mockgo_db.stegonodb.faqs)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}

    client = app.test_client()

    response = client.get("/faqs", headers=headers)
    data = json.loads(response.data)

    assert (response.status_code == 500 and
            data == {"error_codename": "noMongoDB", "error_message": "No Mongo DB available."})


def test_bad_jwt_get_faqs(testegonoserver, timestamp_now, test_config):
    """Test calling get FAQs endpoint with a bad JWT."""
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


def test_expired_jwt_get_faqs(testegonoserver, timestamp_fixed):
    """Test calling get FAQs endpoint with an expired JWT."""
    token = sec.encode_token(config, timestamp_fixed)

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


def test_future_jwt_get_faqs(testegonoserver, timestamp_future):
    """Test calling get FAQs endpoint with an future JWT."""
    token = sec.encode_token(config, timestamp_future)

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


def test_not_a_jwt_get_faqs(testegonoserver):
    """Test calling get FAQs endpoint with something that isn't a JWT."""
    token = "Obviously invalid token."

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


def test_empty_auth_header_get_faqs(testegonoserver):
    """Test calling get FAQs endpoint with an empty auth header."""
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer "}

    client = app.test_client()

    response = client.get("/faqs", headers=headers)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })


def test_no_auth_header_get_faqs(testegonoserver):
    """Test calling get FAQs endpoint with no auth header."""
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    client = app.test_client()

    response = client.get("/faqs")
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })


# FAQs rating tests:
def test_rate_faq(testegonoserver, timestamp_now, mocker, mockgo_db):
    """Test valid FAQs rating."""
    token = sec.encode_token(config, timestamp_now)

    mocker.patch.object(faqs_con, "faqs_db", new=mockgo_db.stegonodb.faqs)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", headers=headers, data=body_data)
    data = json.loads(response.data)
    faq = mockgo_db.stegonodb.faqs.find_one({"id": 2}, {"_id": 0})

    assert (response.status_code == 200 and
            data == {
                "message": "Vote submitted succesfully."
            } and
            faq["rating"] == 1)


def test_no_db_rate_faq(testegonoserver, timestamp_now, mocker, mockgo_db):
    """Test FAQs rating with no db."""
    def mock_update_one(*args):
        """Mocks update_one function to always return a timeout error."""
        raise me.ServerSelectionTimeoutError

    token = sec.encode_token(config, timestamp_now)
    mockgo_db.stegonodb.faqs.update_one = mock_update_one
    mocker.patch.object(faqs_con, "faqs_db", new=mockgo_db.stegonodb.faqs)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", headers=headers, data=body_data)
    data = json.loads(response.data)

    assert (response.status_code == 500 and
            data == {"error_codename": "noMongoDB", "error_message": "No Mongo DB available."})


def test_bad_jwt_rate_faq(testegonoserver, test_config, timestamp_now):
    """Test FAQs rating with a bad JWT."""
    token = sec.encode_token(test_config, timestamp_now)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", headers=headers, data=body_data)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })


def test_expired_jwt_rate_faq(testegonoserver,  timestamp_fixed):
    """Test FAQs rating with an expired JWT."""
    token = sec.encode_token(config, timestamp_fixed)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", headers=headers, data=body_data)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })


def test_future_jwt_rate_faq(testegonoserver,  timestamp_future):
    """Test FAQs rating with a future JWT."""
    token = sec.encode_token(config, timestamp_future)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", headers=headers, data=body_data)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })


def test_not_a_jwt_rate_faq(testegonoserver):
    """Test FAQs rating with something that isn't a JWT."""
    token = "Obviously invalid JWT."

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", headers=headers, data=body_data)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })


def test_empty_auth_header_rate_faq(testegonoserver):
    """Test FAQs rating with an empty auth header."""
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    headers = {"Authorization": "Bearer "}
    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", headers=headers, data=body_data)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })


def test_no_auth_header_rate_faq(testegonoserver):
    """Test FAQs rating with no auth header."""
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(faqs_con.FAQsAPI, "/faqs")

    body_data = {
                    "id": 2, 
                    "vote": 1
                }

    client = app.test_client()

    response = client.put("/faqs", data=body_data)
    data = json.loads(response.data)

    assert (response.status_code == 401 and
            data == {
                "error_codename": "invalidToken",
                "error_message": "Invalid JWT"
            })
