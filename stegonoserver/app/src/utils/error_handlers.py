"""Error handlers for error responses and debugging."""
import json

from flask import Response

from utils import logging_utils as logs

def handle_exception(err: Exception, code_name: str, message: str) -> Response:
    """Handles exceptions and returns error responses, and messages for debugging."""
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": code_name,
        "error_message": message
    })

    log_message = "ERROR: " + str(type(err)) + "\n" + str(err) + "\n"
    response.status_code = 500

    logs.log(response.status_code, log_message)

    return response


def handle_internal_error(code_name: str, message: str, status_code: int,
                                                        debug_message: str) -> Response:
    """Handles internal errors and returns error responses, and messages for debugging."""
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": code_name,
        "error_message": message
    })

    log_message = "ERROR: " + debug_message
    response.status_code = status_code

    logs.log(status_code, log_message)

    return response


def handle_rest_error(err: Exception, code_name: str, message: str, status_code: int) -> Response:
    """Handles standard REST errored behavior."""
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": code_name,
        "error_message": message
    })


    log_message = "ERROR: " + str(type(err)) + "\n" + str(err) + "\n"
    response.status_code = status_code

    logs.log(status_code, log_message)

    return response
