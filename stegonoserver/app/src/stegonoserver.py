"""Server app file."""
import os
import sys

from flask_cors import CORS
from flask import Flask, Response
from flask_restful import Api

import utils.error_handlers as err_handlers
import controllers.security_controller as sec_con
import controllers.stegono_controller as stegono_con
import controllers.faqs_controller as faqs_con


# Set directory path to build controllers.
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

# Build app.
app = Flask(__name__)
CORS(app)
api = Api(app)


@app.errorhandler(Exception)
def handle_error(err: Exception) -> Response:
    """Handles any unspecified exception."""
    return err_handlers.handle_exception(err, "unknown", "Unknown internal error.")


# Set APIs.
api.add_resource(sec_con.Token, "/token")
api.add_resource(stegono_con.DecodeAPI, "/decode")
api.add_resource(stegono_con.EncodeAPI, "/encode")
api.add_resource(faqs_con.FAQsAPI, "/faqs")
