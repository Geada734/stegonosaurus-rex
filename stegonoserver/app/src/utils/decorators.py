"""Custom Decorators"""
from functools import wraps

from flask import request

from . import security_utils as sec
from . import error_handlers as err_handlers


# Get configs for secrets.
config = sec.load_config()


def jwt_secured(func: callable) -> None:
    """Wrapper for JWT validation."""
    @wraps(func)
    def wrapper(*args, **kwargs) -> callable:
        # Gets JWT from the Authorization header.
        auth = request.headers.get("Authorization")

        if auth:
            # Separates the token from the static string.
            token = auth.split(" ")

            if len(token) == 2:
                if not sec.validate_jwt(token[1], config):
                    # Invalid signature.
                    return err_handlers.handle_internal_error("invalidToken", "Invalid JWT",
                                                              401, "Invalid JWT.")
            else:
                # No token in Authorization header.
                return err_handlers.handle_internal_error("invalidToken", "Invalid JWT", 401,
                                                          "Invalid JWT.")
        else:
            # No Authorization header.
            return err_handlers.handle_internal_error("invalidToken", "Invalid JWT", 401,
                                                      "Invalid JWT.")

        return func(*args, **kwargs)

    return wrapper
