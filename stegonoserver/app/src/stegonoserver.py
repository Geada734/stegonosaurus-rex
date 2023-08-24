"""Server app file."""
import os
import sys

from waitress import serve
from flask_cors import CORS
from flask_restful import Api
from flask import Flask, Response
from werkzeug.exceptions import NotFound

import utils.load_helper as lh
import utils.security_utils as sec
import utils.error_handlers as err_handlers
import controllers.stegono_controller as stegono_con

# Set the configs for the app.
config = sec.load_config()

# Set the string constants used in the app.
constants = lh.load_constants()

# Set the errors that can be thrown at server level.
errors = lh.load_errors()

# Set directory path to build controllers.
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

# Build app.
app = Flask(__name__)
CORS(app)
api = Api(app)


@app.errorhandler(NotFound)
def handle_not_found_error(err: NotFound) -> Response:
    """Handles NotFound errors."""
    error = errors["notFound"]
    return err_handlers.handle_rest_error(err, error["errorKey"], error["message"], 404)


@app.errorhandler(Exception)
def handle_error(err: Exception) -> Response:
    """Handles any unspecified exceptions."""
    error = errors["unknown"]
    return err_handlers.handle_exception(err, error["errorKey"], error["message"])


# Set APIs.
api.add_resource(stegono_con.DecodeAPI, "/" + constants["decodeEndpoint"])
api.add_resource(stegono_con.EncodeAPI, "/" + constants["encodeEndpoint"])

# Serve the server using Waitress.
print("Server running...")
print("xxxxxxxxxxxxxxxxxxxxxxxxx")
serve(app, host=config["host"], port=config["port"], ident="stegonoserver")
