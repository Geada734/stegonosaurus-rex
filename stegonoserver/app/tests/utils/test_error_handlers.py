"""Tests stegonosaurus' functions."""
import json

from werkzeug.exceptions import NotFound
from stegonosaurus import stegofunctions as sf, stegoexceptions as se

from src.utils import error_handlers as err_handlers


# Internal error handler test.
def test_handle_internal_error():
    """Tests handling of internal errors, not directly related to Exceptions."""
    response = err_handlers.handle_internal_error("testError", "testMessage", 500, "testMessage")
    data = json.loads(response.data)

    assert response.status_code == 500 and data == {
        "error_codename": "testError",
        "error_message": "testMessage"
    }


# Exception handler test.
def test_handle_exception(raw_image_l_png):
    """Tests handling of a raised exception."""
    try:
        sf.decode(raw_image_l_png, "t")
    except(se.StegonosaurusIncorrectFormatError) as exception:
        response = err_handlers.handle_exception(exception, "wrongFormat", exception.message)

        data = json.loads(response.data)

        assert response.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "The file must be a multi-band .png image."
        }


# Standard REST error handling tests.
def test_handle_rest_error():
    """Tests handling standard errored REST behavior."""
    try:
        raise NotFound
    except(NotFound) as exception:
        response = err_handlers.handle_rest_error(exception, "notFound", "notFoundMessage", 404)

        data = json.loads(response.data)

        assert response.status_code == 404 and data == {
            "error_codename": "notFound",
            "error_message": "notFoundMessage"
        }
