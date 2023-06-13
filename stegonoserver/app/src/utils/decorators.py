"""Custom Decorators"""
import json

from functools import wraps
from flask import request, Response

from . import security_utils as sec


def jwt_secured(func: callable) -> None:
    """Wrapper for JWT validation."""
    @wraps(func)
    def wrapper(*args, **kwargs) -> callable:
        # Form 401 response in case the validation fails.
        err_response = Response(mimetype="application/json")
        err_response.status_code = 401
        err_response.data = json.dumps({"error_codename": "invalidToken",
                        "error_message": "Invalid JWT token"})

        # Gets JWT from the Authorization header.
        auth = request.headers.get("Authorization")

        if auth:
            # Separates the token from the static string.
            token = auth.split(" ")

            if len(token) == 2:
                if not sec.validate_jwt(token[1]):
                    # Invalid signature.
                    return err_response
            else:
                # No token in Authorization header.
                return err_response
        else:
            # No Authorization header.
            return err_response

        return func(*args, **kwargs)

    return wrapper
