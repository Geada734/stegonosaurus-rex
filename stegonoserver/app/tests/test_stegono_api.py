"""Test the stegonosaurus API."""
import json

from flask_restful import Api

from src.utils import security_utils as sec
from src.controllers import stegono_controller as stegono_con

config = sec.load_config()


# Image decoding tests:
def test_decode(testegonoserver, timestamp_now):
    """Test valid decoding."""
    token = sec.encode_token(config, timestamp_now)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/encoded_black-kitten.png", "rb")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 200
            and data["filename"] == "decoded_file.png"
            and "result" in data)


def test_missing_image_decode(testegonoserver, timestamp_now):
    """Test missing image."""
    token = sec.encode_token(config, timestamp_now)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
            "filename": "file.png",
            "mode": "t"
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")

    data = json.loads(response.data)

    assert (response.status_code == 500 and data == {"error_codename": "malformedRequest",
                                                     "error_message": "Malformed request."})


def test_not_image_decode(testegonoserver, timestamp_now):
    """Test not an image."""
    token = sec.encode_token(config, timestamp_now)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 500 and data == {"error_codename": "wrongFormat",
                                                     "error_message": ("The file provided is not " +
                                                                       "a valid image.")})


def test_bad_jwt_decode(testegonoserver, timestamp_now, test_config):
    """Test invalid JWT."""
    token = sec.encode_token(test_config, timestamp_now)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 401 and data == {"error_codename": "invalidToken",
                                                     "error_message": ("Invalid JWT")})


def test_expired_jwt_decode(testegonoserver, timestamp_fixed):
    """Test expired JWT."""
    token = sec.encode_token(config, timestamp_fixed)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 401 and data == {"error_codename": "invalidToken",
                                                     "error_message": ("Invalid JWT")})


def test_future_jwt_decode(testegonoserver, timestamp_future):
    """Test a future JWT."""
    token = sec.encode_token(config, timestamp_future)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 401 and data == {"error_codename": "invalidToken",
                                                     "error_message": ("Invalid JWT")})


def test_not_a_jwt_decode(testegonoserver):
    """Test when the auth header is not a valid JWT."""
    token = "Obvious invalid token."

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    headers = {"Authorization": "Bearer " + token}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 401 and data == {"error_codename": "invalidToken",
                                                     "error_message": ("Invalid JWT")})


def test_empty_auth_header_decode(testegonoserver):
    """Test when there's no JWT in the auth header."""
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    headers = {"Authorization": "Bearer "}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 401 and data == {"error_codename": "invalidToken",
                                                     "error_message": ("Invalid JWT")})


def test_no_auth_header_decode(testegonoserver):
    """Test when there is no authentication header."""
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/decode")

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    headers = {}
    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/decode", data=body_data, headers=headers,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 401 and data == {"error_codename": "invalidToken",
                                                     "error_message": ("Invalid JWT")})
