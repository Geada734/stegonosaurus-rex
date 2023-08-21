"""Fixtures for unit tests."""
import os
import sys

import pytest
from PIL import Image
from flask import Flask


parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))


# Sample abstract images used for testing:
@pytest.fixture
def raw_image_rgb_png():
    """Creates a raw RGB image used to hide a message in."""
    new_image = Image.new(mode="RGB", size=(2, 2))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (0, 255, 255))
    new_image.putpixel((0, 1), (0, 255, 255))
    new_image.putpixel((1, 0), (0, 255, 255))
    new_image.putpixel((1, 1), (0, 255, 255))

    return new_image


@pytest.fixture
def raw_image_rgba_png():
    """Creates a raw RGBA .png image used to hide a message in."""
    new_image = Image.new(mode="RGBA", size=(2, 2))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (0, 255, 255, 255))
    new_image.putpixel((0, 1), (0, 255, 255, 255))
    new_image.putpixel((1, 0), (0, 255, 255, 255))
    new_image.putpixel((1, 1), (0, 255, 255, 255))

    return new_image


@pytest.fixture
def raw_image_l_png():
    """Creates a raw single band .png image used to hide a message in."""
    new_image = Image.new(mode="L", size=(2, 2))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), 0)
    new_image.putpixel((0, 1), 0)
    new_image.putpixel((1, 0), 0)
    new_image.putpixel((1, 1), 0)

    return new_image


@pytest.fixture
def raw_image_rgb_jpeg():
    """Creates a raw RGB .jpeg image used to hide a message in."""
    new_image = Image.new(mode="RGB", size=(2, 2))
    new_image.format = "JPG"

    new_image.putpixel((0, 0), (0, 255, 255))
    new_image.putpixel((0, 1), (0, 255, 255))
    new_image.putpixel((1, 0), (0, 255, 255))
    new_image.putpixel((1, 1), (0, 255, 255))

    return new_image


@pytest.fixture
def raw_image_rgba_jpeg():
    """Creates a raw RGB .jpeg image used to hide a message in."""
    new_image = Image.new(mode="RGB", size=(2, 2))
    new_image.format = "JPG"

    new_image.putpixel((0, 0), (0, 255, 255, 255))
    new_image.putpixel((0, 1), (0, 255, 255, 255))
    new_image.putpixel((1, 0), (0, 255, 255, 255))
    new_image.putpixel((1, 1), (0, 255, 255, 255))

    return new_image


@pytest.fixture
def raw_coded_rgb_bright_red_png():
    """Creates a raw RGB image used to encode a message in bright red."""
    new_image = Image.new(mode="RGB", size=(2, 2))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (255, 0, 0))
    new_image.putpixel((0, 1), (0, 1, 1))
    new_image.putpixel((1, 0), (0, 1, 1))
    new_image.putpixel((1, 1), (0, 1, 1))

    return new_image


@pytest.fixture
def raw_coded_rgba_bright_red_png():
    """Creates a raw RGBA image used to encode a message in bright red."""
    new_image = Image.new(mode="RGBA", size=(2,2))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (255, 0, 0, 255))
    new_image.putpixel((0, 1), (0, 1, 1, 255))
    new_image.putpixel((1, 0), (0, 1, 1, 255))
    new_image.putpixel((1, 1), (0, 1, 1, 255))

    return new_image


@pytest.fixture
def raw_coded_smaller_rgb_png():
    """Creates a small raw RGB image used to encode a message."""
    new_image = Image.new(mode="RGB", size=(2,2))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (255, 0, 0))

    return new_image


@pytest.fixture
def raw_coded_larger_x_rgb_png():
    """Creates a horizontally larger raw RGB image used to encode a message."""
    new_image = Image.new(mode="RGBA", size=(3, 2))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (255, 0, 0))
    new_image.putpixel((0, 1), (0, 1, 1))
    new_image.putpixel((1, 0), (0, 1, 1))
    new_image.putpixel((1, 1), (0, 1, 1))
    new_image.putpixel((2, 0), (0, 1, 1))
    new_image.putpixel((2, 1), (0, 1, 1))

    return new_image


@pytest.fixture
def raw_coded_larger_y_rgb_png():
    """Creates a vertically larger raw RGB image used to encode a message."""
    new_image = Image.new(mode="RGBA", size=(2, 3))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (255, 0, 0))
    new_image.putpixel((0, 1), (0, 1, 1))
    new_image.putpixel((0, 2), (0, 1, 1))
    new_image.putpixel((1, 0), (0, 1, 1))
    new_image.putpixel((1, 1), (0, 1, 1))
    new_image.putpixel((1, 2), (0, 1, 1))

    return new_image


@pytest.fixture
def raw_coded_larger_rgb_png():
    """Creates a larger raw RGB image used to encode a message."""
    new_image = Image.new(mode="RGBA", size=(3, 3))
    new_image.format = "PNG"

    new_image.putpixel((0, 0), (255, 0, 0))
    new_image.putpixel((0, 1), (0, 1, 1))
    new_image.putpixel((0, 2), (0, 1, 1))
    new_image.putpixel((1, 0), (0, 1, 1))
    new_image.putpixel((1, 1), (0, 1, 1))
    new_image.putpixel((1, 2), (0, 1, 1))
    new_image.putpixel((2, 0), (0, 1, 1))
    new_image.putpixel((2, 1), (0, 1, 1))
    new_image.putpixel((2, 2), (0, 1, 1))

    return new_image


# Configs fixtures
@pytest.fixture
def config_for_captcha():
    """Dummy values for captcha validation."""
    return {"captchaSecret": "noSecret"}


# Test Servers
@pytest.fixture
def testegonoserver():
    """Test server for tests."""  
    app = Flask(__name__)

    return app
