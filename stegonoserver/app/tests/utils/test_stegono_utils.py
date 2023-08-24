"""Tests stegonosaurus' functions."""
import json

from flask import Response
from stegonosaurus import stegofunctions as sf

from src.utils import load_helper as lh
from src.utils import stegono_utils as stegono


constants = lh.load_constants()


# Image decoding unit tests:
def test_decode_valid_rgb_png_t(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    """Tests decoding on a valid RGB .png image, with lower case
    transparent mode.
    """
    response = Response(mimetype="application/json")
    encoded = sf.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png)
    encoded.format = "PNG"
    encoded.mode = "RGB"
    decoded = stegono.decode(encoded, "file.png", "t", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
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
    decoded = stegono.decode(encoded, "file.png", "t", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
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
    decoded = stegono.decode(encoded, "file.png", "T", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
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
    decoded = stegono.decode(encoded, "file.png", "T", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
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
    decoded = stegono.decode(encoded, "file.png", "b", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
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
    decoded = stegono.decode(encoded, "file.png", "b", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
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
    decoded = stegono.decode(encoded, "file.png", "B", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
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
    decoded = stegono.decode(encoded, "file.png", "B", response)
    data = json.loads(decoded.data)

    assert data == {
            "filename": constants["decodedPrefix"] + "file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVR4nGP4z8Dwn4GB4T8TIwME"
            + "AAApAwMBEJFSOQAAAABJRU5ErkJggg=="
        }


def test_decode_invalid_rgb_jpeg(raw_image_rgb_jpeg):
    """Tests decoding an invalid RGB .jpeg image."""
    response = Response(mimetype="application/json")
    result = stegono.decode(raw_image_rgb_jpeg, "file.jpeg", "t", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "The file must be a multi-band .png image."
        }


def test_decode_invalid_l_png(raw_image_l_png):
    """Tests decoding an invalid single band .png image."""
    response = Response(mimetype="application/json")
    result = stegono.decode(raw_image_l_png, "file.png", "t", response)
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
    result = stegono.decode(encoded, "file.png", "CAKE", response)
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
    result = stegono.decode(encoded, "file.png", 347, response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongDecodeMode",
            "error_message": "The provided decode mode is invalid."
        }


# Image encoding unit tests:
def test_encode_rgb_png(raw_coded_rgb_bright_red_png, raw_image_rgb_png):
    """Tests encoding both valid RGB .png images, with a valid 
    message.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_png, "file.png", response)
    data = json.loads(result.data)

    assert data == {
            "filename": constants["encodedPrefix"] + "file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGNk+P+fgeE"
            + "/EwPDfwYGBgAjBwQAw0d3/gAAAABJRU5ErkJggg=="
        }


def test_encode_rgba_png(raw_coded_rgba_bright_red_png, raw_image_rgba_png):
    """Tests encoding both valid RGBA.png images, with a valid 
    message.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_rgba_bright_red_png, raw_image_rgba_png, "file.png", response)
    data = json.loads(result.data)

    assert data == {
            "filename": constants["encodedPrefix"] + "file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGElEQVR4nAXBAQEAAAjDIG7/"
            + "zhOmIkfgAT34BP9m/Y84AAAAAElFTkSuQmCC"
        }


def test_encode_valid_rgb_smaller_png(raw_coded_smaller_rgb_png,
                                      raw_image_rgb_png):
    """Tests encoding a smaller RGB .png into a RGB .png image."""
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_smaller_rgb_png, raw_image_rgb_png, "file.png", response)
    data = json.loads(result.data)

    assert data == {
            "filename": constants["encodedPrefix"] + "file.png", 
            "result": "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGNk+P+fgeE/" 
            + "EwPDfwYGBgAjBwQAw0d3/gAAAABJRU5ErkJggg=="
        }


def test_encode_invalid_rgb_coded_jpeg(raw_image_rgb_jpeg, raw_image_rgb_png):
    """Tests encoding of an invalid RGB .jpeg image into a valid RGB
    .png image.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_image_rgb_jpeg, raw_image_rgb_png, "file.png", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "Both files must be multi-band .png images."
        }


def test_encode_invalid_rgb_image_jpeg(raw_coded_rgb_bright_red_png, raw_image_rgb_jpeg):
    """Tests encoding of a valid RGB .png image into an invalid RGB
    .jpeg image.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_rgb_bright_red_png, raw_image_rgb_jpeg, "file.png", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "Both files must be multi-band .png images."
        }


def test_encode_invalid_l_coded_png(raw_image_l_png, raw_image_rgb_png):
    """Tests encoding an invalid single band .png image into an valid RGB .png
    image.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_image_l_png, raw_image_rgb_png, "file.png", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "Both files must be multi-band .png images."
        }


def test_encode_invalid_l_image_png(raw_coded_rgb_bright_red_png, raw_image_l_png):
    """Tests encoding an invalid single band .png image into an valid RGB .png
    image.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_rgb_bright_red_png, raw_image_l_png, "file.png", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongFormat",
            "error_message": "Both files must be multi-band .png images."
        }


def test_encode_invalid_rgb_larger_png(raw_coded_larger_rgb_png,
                                       raw_image_rgb_png):
    """Tests encoding an invalid larger RGB .png image into a valid RGB
    .png image.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_larger_rgb_png, raw_image_rgb_png, "file.png", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongSize",
            "error_message": "The image with the coded message should be smaller than the image " 
            + "where the message will be hidden."
        }


def test_encode_invalid_rgb_larger_x_png(raw_coded_larger_x_rgb_png,
                                         raw_image_rgb_png):
    """Tests encoding an invalid horizontally larger RGB .png image
    into a valid RGB .png image.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_larger_x_rgb_png, raw_image_rgb_png, "file.png", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongSize",
            "error_message": "The image with the coded message should be smaller than the image " 
            + "where the message will be hidden."
        }


def test_encode_invalid_rgb_larger_y_png(raw_coded_larger_y_rgb_png,
                                         raw_image_rgb_png):
    """Tests encoding an invalid vertically larger RGB .png image into
    a valid RGB .png image.
    """
    response = Response(mimetype="application/json")
    result = stegono.encode(raw_coded_larger_y_rgb_png, raw_image_rgb_png, "file.png", response)
    data = json.loads(result.data)

    assert result.status_code == 500 and data == {
            "error_codename": "wrongSize",
            "error_message": "The image with the coded message should be smaller than the image " 
            + "where the message will be hidden."
        }
    