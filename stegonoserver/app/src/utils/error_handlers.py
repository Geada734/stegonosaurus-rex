"""Error handlers for error responses and debugging."""
import json

from flask import Response


def handle_exception(err: Exception, code_name: str, message: str) -> Response:
    """Handles exceptions and returns error responses, and messages for debugging."""
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": code_name,
        "error_message": message
    })

    print("xxxxxxxxxxxxxxxxxxxxxxxxx")
    print(type(err))
    print(err)
    print("xxxxxxxxxxxxxxxxxxxxxxxxx")

    response.status_code = 500

    return response


def handle_internal_error(code_name: str, message: str, status_code: int,
                                                        debug_message: str) -> Response:
    """Handles internal errors and returns error responses, and messages for debugging."""
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": code_name,
        "error_message": message
    })

    print("xxxxxxxxxxxxxxxxxxxxxxxxx")
    print(debug_message)
    print("xxxxxxxxxxxxxxxxxxxxxxxxx")

    response.status_code = status_code

    return response
