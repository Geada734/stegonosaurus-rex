"""Controller for the stegonosaurus functions."""
from flask_restful import Resource
from flask import request, Response
from werkzeug.exceptions import BadRequest
from PIL import Image, UnidentifiedImageError

from utils import security_utils as sec
from utils import stegono_utils as stegono
from utils import error_handlers as err_handlers


# Set the configs for the app.
config = sec.load_config()


class DecodeAPI(Resource):
    """Decode API"""
    def post(self) -> Response:
        """Decode endpoint"""
        try:
            file = Image.open(request.files["img"])
            filename = request.form.get("filename")
            mode = request.form.get("mode")
            captcha_value = request.form.get("captchaValue")
            response = Response(mimetype="application/json")

            # Validate captcha for every call.
            if captcha_value:
                valid_captcha = sec.validate_captcha(captcha_value, config)
                if not valid_captcha:
                    file.close()

                    return err_handlers.handle_internal_error("unknown", "Unknown internal error",
                                                            500, "Failed captcha validation")
            else:
                return err_handlers.handle_internal_error("unknown", "Unknown internal error",
                                                        500, "Failed captcha validation")

            return stegono.decode(file, filename, mode, response)

        # If either file is not an image, or the request is malformed.
        except (UnidentifiedImageError, BadRequest) as err:
            if isinstance(err, UnidentifiedImageError):
                return err_handlers.handle_exception(err, "wrongFormat",
                                                    "The file provided is not a valid image.")
            return err_handlers.handle_exception(err, "malformedRequest", "Malformed request.")


# Service connections.
class EncodeAPI(Resource):
    """Encode API"""
    def post(self) -> Response:
        """Encode endpoint"""
        try:
            coded_file = Image.open(request.files["coded"])
            img_file = Image.open(request.files["img"])
            filename = request.form.get("filename")
            captcha_value = request.form.get("captchaValue")
            response = Response(mimetype="application/json")

            # Validate captcha for every call.
            if captcha_value:
                valid_captcha = sec.validate_captcha(captcha_value, config)
                if not valid_captcha:
                    coded_file.close()
                    img_file.close()

                    return err_handlers.handle_internal_error("unknown", "Unknown internal error",
                                                            500, "Failed captcha validation")
            else:
                return err_handlers.handle_internal_error("unknown", "Unknown internal error",
                                                        500, "Failed captcha validation")

            return stegono.encode(coded_file, img_file, filename, response)

        # If either file is not an image, or the request is malformed.
        except (UnidentifiedImageError, BadRequest) as err:
            if isinstance(err, UnidentifiedImageError):
                return err_handlers.handle_exception(err, "wrongFormat",
                                                    "The file provided is not a valid image.")
            return err_handlers.handle_exception(err, "malformedRequest", "Malformed request.")
