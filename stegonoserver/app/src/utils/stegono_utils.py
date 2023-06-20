"""Wrapper functions for stegonosaurus' functions."""
import json
import base64
from io import BytesIO

from PIL import Image
from flask import Response
from stegonosaurus import stegofunctions as sf, stegoexceptions as se

from . import error_handlers as err_handlers


def decode(img: Image, filename: str, mode: str, response: Response) -> Response:
    """Decode wrapper function, returns a response with the result."""
    try:
        img = sf.decode(img, mode)

        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())

        response.status_code = 200
        response.data = json.dumps({
                "result": img_str.decode("utf-8"),
                "filename": "decoded_" + filename
        })

        img.close()

    # Handle exceptions from stegonosaurus.
    except (se.StegonosaurusIncorrectFormatError, se.StegonosaurusInvalidDecodeModeError) as err:
        img.close()
        if isinstance(err, se.StegonosaurusIncorrectFormatError):
            return err_handlers.handle_exception(err, "wrongFormat", err.message)

        if isinstance(err, se.StegonosaurusInvalidDecodeModeError):
            return err_handlers.handle_exception(err, "wrongDecodeMode", err.message)

    return response


def encode(coded: Image, img: Image, filename: str, response: Response) -> Response:
    """Encode wrapper function, returns a response with the result."""
    try:
        img = sf.encode(coded, img)

        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())

        response.status_code = 200
        response.data = json.dumps({
                "result": img_str.decode("utf-8"),
                "filename": "encoded_" + filename
        })

        coded.close()
        img.close()

    # Handle exceptions from stegonosaurus.
    except(se.StegonosaurusIncorrectFormatError, se.StegonosaurusIncorrectSizeError) as err:
        coded.close()
        img.close()
        if isinstance(err, se.StegonosaurusIncorrectFormatError):
            return err_handlers.handle_exception(err, "wrongFormat", err.message)

        if isinstance(err, se.StegonosaurusIncorrectSizeError):
            return err_handlers.handle_exception(err, "wrongSize", err.message)

    return response
