import os
import sys
import json

import pytest
from flask import Response
from stegonosaurus import stegofunctions as sf

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from src.utils import stegono_utils as su


def test_decode_valid_rgb_png_t(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png)
    encoded.format = "PNG"
    encoded.mode = "RGB"
    decoded = su.decode(encoded, "file.png", "t", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4z8DA8P8fI8P/"
            + "fwwMDAAm4gT7wdmvEQAAAABJRU5ErkJggg=="
        }
