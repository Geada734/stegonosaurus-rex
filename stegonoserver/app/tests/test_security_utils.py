"""Tests Security Utils."""
import os
import sys

import jwt

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from src.utils import security_utils as su


# JWT Encoding test.
def test_encode_token(config, timestamp_fixed):
    """Test the provided values for data encoding work fine."""
    token = su.encode_token(config, timestamp_fixed)

    assert token == ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2ODc0NjQ5MjI1NjB9"
    + ".vBASjOlvYgy3XBbMy35SZmcc2Chd5cBKpVsY0PjrYh8")


# JWT Validation tests.
def test_valid_decode(config, timestamp_now):
    """Test the validation of a valid and current JWT."""
    token = su.encode_token(config, timestamp_now)

    assert su.validate_jwt(token, config)


def test_invalid_signature_decode(config, other_config, timestamp_now):
    """Test the validation of a JWT with the wrong signature."""
    token = su.encode_token(other_config, timestamp_now)

    assert not su.validate_jwt(token, config)


def test_expired_decode(config, timestamp_fixed):
    """Test the validation of am expired JWT."""
    token = su.encode_token(config, timestamp_fixed)

    assert not su.validate_jwt(token, config)
