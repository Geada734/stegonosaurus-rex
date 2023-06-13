"""Custom Decorators"""
import json

from functools import wraps
from flask import request, Response

from . import security_utils as sec


def jwt_secured(func: callable) -> None:
    """Wrapper for JWT validation."""
    @wraps(func)
    def wrapper(*args, **kwargs) -> callable:
        err_response = Response(mimetype="application/json")
        err_response.status_code = 401
        err_response.data = json.dumps({"error_codename": "invalidToken",
                        "error_message": "Invalid JWT token"})

        auth = request.headers.get('Authorization')

        if auth:
            token = auth.split(" ")

            if len(token) == 2:
                if not sec.validate_jwt(token[1]):
                    return err_response
            else:
                return err_response
        else:
            return err_response

        return func(*args, **kwargs)

    return wrapper
