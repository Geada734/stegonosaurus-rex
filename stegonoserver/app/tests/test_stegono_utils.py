import os
import sys
import json

from flask import Response
from stegonosaurus import stegofunctions as sf

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from src.utils import stegono_utils as su


# Image decoding unit tests:
def test_decode_valid_rgb_png_t(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    """Tests decoding on a valid RGB .png image, with lower case
    transparent mode.
    """
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


def test_decode_valid_rgba_png_t(raw_coded_rgb_bright_red_png, raw_image_rgba_png):
    """Tests decoding on a valid RGBA .png image, with lower case
    transparent mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgba_png)
    encoded.format = "PNG"
    encoded.mode = "RGBA"
    decoded = su.decode(encoded, "file.png", "t", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGElEQVR4nAXBgQEAAATAoPj/"
            + "ZlMiXTsdeEzOBvunXYHjAAAAAElFTkSuQmCC"
        }

def test_decode_valid_rgb_png_ut(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    """Tests decoding on a valid RGB .png image, with upper case
    transparent mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png)
    encoded.format = "PNG"
    encoded.mode = "RGB"
    decoded = su.decode(encoded, "file.png", "T", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4z8DA8P8fI8P/"
            + "fwwMDAAm4gT7wdmvEQAAAABJRU5ErkJggg=="
        }


def test_decode_valid_rgba_png_ut(raw_coded_rgb_bright_red_png, raw_image_rgba_png):
    """Tests decoding on a valid RGBA .png image, with upper case
    transparent mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgba_png)
    encoded.format = "PNG"
    encoded.mode = "RGBA"
    decoded = su.decode(encoded, "file.png", "T", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGElEQVR4nAXBgQEAAATAoPj/"
            + "ZlMiXTsdeEzOBvunXYHjAAAAAElFTkSuQmCC"
        }


def test_decode_valid_rgb_png_b(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    """Tests decoding on a valid RGB .png image, with lower case black
    mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png)
    encoded.format = "PNG"
    encoded.mode = "RGB"
    decoded = su.decode(encoded, "file.png", "b", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAADElEQVR4nGP4z4AEAA0BAQD2u9K"
            + "zAAAAAElFTkSuQmCC"
        }


def test_decode_valid_rgba_png_b(raw_coded_rgb_bright_red_png, raw_image_rgba_png):
    """Tests decoding on a valid RGBA .png image, with lower case
    black mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgba_png)
    encoded.format = "PNG"
    encoded.mode = "RGBA"
    decoded = su.decode(encoded, "file.png", "b", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVR4nGP4z8Dwn4GB4T8TIwME"
            + "AAApAwMBEJFSOQAAAABJRU5ErkJggg=="
        }


def test_decode_valid_rgb_png_ub(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    """Tests decoding on a valid RGB .png image, with upper case black
    mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png)
    encoded.format = "PNG"
    encoded.mode = "RGB"
    decoded = su.decode(encoded, "file.png", "B", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAADElEQVR4nGP4z4AEAA0BAQD2u9K"
            + "zAAAAAElFTkSuQmCC"
        }


def test_decode_valid_rgba_png_ub(raw_coded_rgb_bright_red_png, raw_image_rgba_png):
    """Tests decoding on a valid RGBA .png image, with upper case black
    mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgba_png)
    encoded.format = "PNG"
    encoded.mode = "RGBA"
    decoded = su.decode(encoded, "file.png", "B", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": "decoded_file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVR4nGP4z8Dwn4GB4T8TIwME"
            + "AAApAwMBEJFSOQAAAABJRU5ErkJggg=="
        }


def test_decode_invalid_rgb_jpeg(raw_image_rgb_jpeg):
    """Tests decoding an invalid RGB .jpeg image."""
    response = Response(mimetype="application/json")
    result = su.decode(raw_image_rgb_jpeg, "file.jpeg", "t", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "The file must be a multi-band .png image."
        }


def test_decode_invalid_l_png(raw_image_l_png):
    """Tests decoding an invalid single band .png image."""
    response = Response(mimetype="application/json")
    result = su.decode(raw_image_l_png, "file.png", "t", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "The file must be a multi-band .png image."
        }


def test_decode_valid_rgb_png_invalid_string_mode(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    """Tests decoding on a valid RGB .png image, with an invalid 
    decode mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png)
    encoded.format = "PNG"
    encoded.mode = "RGB"
    result = su.decode(encoded, "file.png", "CAKE", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongDecodeMode",
            "error_message": "The provided decode mode is invalid."
        }


def test_decode_valid_rgb_png_invalid_nonstring_mode(raw_coded_rgb_bright_red_png,
                                                    raw_image_rgb_png):
    """Tests decoding on a valid RGB .png image, with an invalid
    non string decode mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png)
    encoded.format = "PNG"
    encoded.mode = "RGB"
    result = su.decode(encoded, "file.png", 347, response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongDecodeMode",
            "error_message": "The provided decode mode is invalid."
        }
