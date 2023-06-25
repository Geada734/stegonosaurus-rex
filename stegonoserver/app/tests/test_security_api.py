"""Test the security API."""
import json

from flask_restful import Api

from src.utils import security_utils as sec
from src.controllers import security_controller as sec_con


# Token generation tests:
def test_token(mocker, config, testegonoserver):
    """Tests the API endpoint used to get a JWT for calling the other APIs."""
    mocker.patch.object(sec_con, "config", new=config)

    #Setting endpoint for testing.
    app = testegonoserver
    api = Api(app)
    api.add_resource(sec_con.Token, "/token")

    client = app.test_client()
    response = client.get("/token")
    data = json.loads(response.data)

    assert response.status_code == 200 and sec.validate_jwt(data["token"], config)
