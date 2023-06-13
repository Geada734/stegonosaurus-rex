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
