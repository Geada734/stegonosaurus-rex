"""Test the stegonosaurus API."""
import json

from flask_restful import Api

from src.utils import load_helper as lh
from src.utils import security_utils as sec
from src.controllers import stegono_controller as stegono_con


config = sec.load_config()
constants = lh.load_constants()
errors = lh.load_errors()


# Image decoding tests:
def test_decode(testegonoserver, mocker):
    """Test valid decoding."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = True)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/" + constants["decodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/file.png", "rb")

    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png"),
            "captchaValue": "valid"
        }

    client = app.test_client()
    response = client.post("/" + constants["decodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 200
            and data["filename"] == constants["decodedPrefix"] + "file.png"
            and "result" in data)


def test_missing_image_decode(testegonoserver, mocker):
    """Test missing image."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = True)
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/" + constants["decodeEndpoint"])

    body_data = {
            "filename": "file.png",
            "mode": "t",
            "captchaValue": "valid"
        }

    client = app.test_client()
    response = client.post("/" + constants["decodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")

    data = json.loads(response.data)

    error = errors["malformed"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })


def test_not_image_decode(testegonoserver, mocker):
    """Test not an image."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = True)
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/" + constants["decodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")

    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png"),
            "captchaValue": "valid"
        }

    client = app.test_client()
    response = client.post("/" + constants["decodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    error = errors["notAnImage"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })

def test_invalid_captcha_decode(testegonoserver, mocker):
    """Test invalid captcha."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = False)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/" + constants["decodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/file.png", "rb")

    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png"),
            "captchaValue": "invalid"
        }

    client = app.test_client()
    response = client.post("/" + constants["decodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    error = errors["noCaptcha"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })


def test_no_captcha_decode(testegonoserver):
    """Test no captcha."""

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.DecodeAPI, "/" + constants["decodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/file.png", "rb")

    body_data = {
            "filename": "file.png",
            "mode": "t",
            "img": (img, "file.png")
        }

    client = app.test_client()
    response = client.post("/" + constants["decodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    error = errors["noCaptcha"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })


# Image encoding tests:
def test_encode(testegonoserver, mocker):
    """Test valid encoding."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = True)
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.EncodeAPI, "/" + constants["encodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/file.png", "rb")
    coded = open("app/tests/static/coded.png", "rb")

    body_data = {
            "filename": "file.png",
            "img": (img, "file.png"),
            "coded": (coded, "coded.png"),
            "captchaValue": "valid"
        }

    client = app.test_client()
    response = client.post("/" + constants["encodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    assert (response.status_code == 200
            and data["filename"] == constants["encodedPrefix"] + "file.png"
            and "result" in data)


def test_missing_image_encode(testegonoserver, mocker):
    """Test missing images."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = True)
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.EncodeAPI, "/" + constants["encodeEndpoint"])

    # Setting request body.
    body_data = {
            "filename": "file.png",
            "captchaValue": "valid"
        }

    client = app.test_client()
    response = client.post("/" + constants["encodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")

    data = json.loads(response.data)

    error = errors["malformed"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })


def test_not_image_file_encode(testegonoserver, mocker):
    """Test encoding to a non image file."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = True)
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.EncodeAPI, "/" + constants["encodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/image.txt", "rb")
    coded = open("app/tests/static/coded.png", "rb")

    body_data = {
            "filename": "file.png",
            "img": (img, "file.png"),
            "coded": (coded, "coded.png"),
            "captchaValue": "valid"
        }

    client = app.test_client()
    response = client.post("/" + constants["encodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    error = errors["notAnImage"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })


def test_not_image_coded_encode(testegonoserver, mocker):
    """Test encoding from a non image coded file."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = True)
    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.EncodeAPI, "/" + constants["encodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/file.png", "rb")
    coded = open("app/tests/static/image.txt", "rb")

    body_data = {
            "filename": "file.png",
            "img": (img, "file.png"),
            "coded": (coded, "coded.png"),
            "captchaValue": "valid"
        }

    client = app.test_client()
    response = client.post("/" + constants["encodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    error = errors["notAnImage"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })


def test_invalid_captcha_encode(testegonoserver, mocker):
    """Test invalid captcha."""
    mocker.patch("src.controllers.stegono_controller.sec.validate_captcha", return_value = False)

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.EncodeAPI, "/" + constants["encodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/file.png", "rb")
    coded = open("app/tests/static/coded.png", "rb")

    body_data = {
            "filename": "file.png",
            "img": (img, "file.png"),
            "coded": (coded, "coded.png"),
            "captchaValue": "invalid"
        }

    client = app.test_client()
    response = client.post("/" + constants["encodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    error = errors["noCaptcha"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })


def test_no_captcha_encode(testegonoserver):
    """Test no captcha."""

    # Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(stegono_con.EncodeAPI, "/" + constants["encodeEndpoint"])

    # Setting request body.
    img = open("app/tests/static/file.png", "rb")
    coded = open("app/tests/static/coded.png", "rb")

    body_data = {
            "filename": "file.png",
            "img": (img, "file.png"),
            "coded": (coded, "coded.png")
        }

    client = app.test_client()
    response = client.post("/" + constants["encodeEndpoint"], data=body_data,
                           content_type="multipart/form-data")
    img.close()
    data = json.loads(response.data)

    error = errors["noCaptcha"]

    assert (response.status_code == error["restCode"] and data == {
        'error_codename': error["errorKey"],
        'error_message': error["message"]
    })
