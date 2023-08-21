"""Tests Security Utils."""
from src.utils import security_utils as sec


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
