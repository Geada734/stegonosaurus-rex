"""Controller for the security checks."""
import json
import time

from flask import Response
from flask_restful import Resource

import utils.security_utils as sec
import utils.logging_utils as logs

# Set the configs for the app.
config = sec.load_config()


class Token(Resource):
    """API for JWT generation"""
    def get(self) -> Response:
        """Endpoint to get token"""
        # Gets current time to encode into JWT as a timestamp.
        timestamp = int(round(time.time() * 1000))
        token = sec.encode_token(config, timestamp)
        response = Response(mimetype="application/json")
        response.status_code = 200
        response.data = json.dumps({
            "token":  token
        })

        logs.log(response.status_code, "GET /token: Successful call!")

        return response
