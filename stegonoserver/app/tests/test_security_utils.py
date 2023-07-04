"""Tests Security Utils."""
from src.utils import security_utils as sec


# JWT Encoding test.
def test_encode_token(test_config, timestamp_fixed):
    """Test the provided values for data encoding work fine."""
    token = sec.encode_token(test_config, timestamp_fixed)

    assert token == ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2ODc0NjQ5MjI1NjB9"
    + ".vBASjOlvYgy3XBbMy35SZmcc2Chd5cBKpVsY0PjrYh8")


# Captcha Validation tests.
def test_valid_captcha_response(config_for_captcha, mocker):
    """Tests a successful captcha validation."""
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"success": True}
    mocker.patch("src.utils.security_utils.call_captcha_url",
                 return_value=mock_response.json())

    assert sec.validate_captcha(config_for_captcha, "noValue")


def test_invalid_or_old_captcha_response(config_for_captcha, mocker):
    """Tests a bad captcha validation."""
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"success": False}
    mocker.patch("src.utils.security_utils.call_captcha_url",
                 return_value=mock_response.json())

    assert not sec.validate_captcha(config_for_captcha, "noValue")


def test_broken_captcha_response(config_for_captcha, mocker):
    """Tests a malformed response validation."""
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {}
    mocker.patch("src.utils.security_utils.call_captcha_url",
                 return_value=mock_response.json())

    assert not sec.validate_captcha(config_for_captcha, "noValue")


# JWT Validation tests.
def test_valid_decode(test_config, timestamp_now):
    """Test the validation of a valid and current JWT."""
    token = sec.encode_token(test_config, timestamp_now)

    assert sec.validate_jwt(token, test_config)


def test_invalid_signature_decode(test_config, other_config, timestamp_now):
    """Test the validation of a JWT with the wrong signature."""
    token = sec.encode_token(other_config, timestamp_now)

    assert not sec.validate_jwt(token, test_config)


def test_expired_decode(test_config, timestamp_fixed):
    """Test the validation of an expired JWT."""
    token = sec.encode_token(test_config, timestamp_fixed)

    assert not sec.validate_jwt(token, test_config)


def test_future_decode(test_config, timestamp_future):
    """Test the validation of a future JWT."""
    token = sec.encode_token(test_config, timestamp_future)

    assert not sec.validate_jwt(token, test_config)
