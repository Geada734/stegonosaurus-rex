"""Server app file."""
import os
import sys

from waitress import serve
from flask_cors import CORS
from flask_restful import Api
from flask import Flask, Response
from werkzeug.exceptions import NotFound

import utils.security_utils as sec
import utils.error_handlers as err_handlers
import controllers.security_controller as sec_con
import controllers.stegono_controller as stegono_con

# Set the configs for the app.
config = sec.load_config()

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
    return err_handlers.handle_rest_error(err, "notFound", "The endpoint does not exist.", 404)


@app.errorhandler(Exception)
def handle_error(err: Exception) -> Response:
    """Handles any unspecified exception."""
    return err_handlers.handle_exception(err, "unknown", "Unknown internal error.")


# Set APIs.
api.add_resource(stegono_con.DecodeAPI, "/decode")
api.add_resource(stegono_con.EncodeAPI, "/encode")

# Serve the server using Waitress.
print("Server running...")
print("xxxxxxxxxxxxxxxxxxxxxxxxx")
serve(app, host=config["host"], port=config["port"], ident="stegonoserver")
