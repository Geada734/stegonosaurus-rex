"""Tests stegonosaurus' functions."""
import os
import sys
import json

from stegonosaurus import stegofunctions as sf, stegoexceptions as se

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from src.utils import error_handlers as err_handlers


# Internal error handler test.
def test_handle_internal_error(capfd):
    """Tests handling of internal errors, not directly related to Exceptions."""
    response = err_handlers.handle_internal_error("testError", "testMessage", 500, "testMessage")
    data = json.loads(response.data)

    expected_debug = """xxxxxxxxxxxxxxxxxxxxxxxxx
testMessage
xxxxxxxxxxxxxxxxxxxxxxxxx
"""

    debug, err = capfd.readouterr()

    assert response.status_code == 500 and debug == expected_debug and data == {
        "error_codename": "testError",
        "error_message": "testMessage"
    }


# Exception handler test.
def test_handle_exception(raw_image_l_png, capfd):
    "Tests handling of a raised exception."
    try:
        sf.decode(raw_image_l_png, "t")
    except(se.StegonosaurusIncorrectFormatError) as exception:
        response = err_handlers.handle_exception(exception, "wrongFormat", exception.message)

        expected_debug = """xxxxxxxxxxxxxxxxxxxxxxxxx
<class 'stegonosaurus.stegoexceptions.StegonosaurusIncorrectFormatError'>
The file must be a multi-band .png image.
xxxxxxxxxxxxxxxxxxxxxxxxx
"""

        debug, err = capfd.readouterr()
        data = json.loads(response.data)

        assert response.status_code == 500 and debug == expected_debug and data == {
            "error_codename": "wrongFormat",
            "error_message": "The file must be a multi-band .png image."
        }
