"""Wrapper functions for stegonosaurus' functions."""
import json
import base64
from io import BytesIO

from PIL import Image
from flask import Response
from stegonosaurus import stegofunctions as sf


def decode(file: Image, filename: str, mode: str, response: Response) -> Response:
    """Decode wrapper function, returns a response with the result."""    
    img = Image.open(file)
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

    return response


def encode(coded_file: Image, img_file: str, filename: str, response: Response) -> Response:
    """Encode wrapper function, returns a response with the result."""    
    coded = Image.open(coded_file)
    img = Image.open(img_file)
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

    return response
