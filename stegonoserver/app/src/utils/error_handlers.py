import json
from stegonosaurus import stegoexceptions as se
from flask import Response

def handle_exception(e, code_name, message):
    response = Response(mimetype="application/json")
    response.data = json.dumps({
        "error_codename": code_name,
        "error_message": message
    })

    print("xxxxxxxxxxxxxxxxxxxxxxxxx")
    print(type(e))
    print(e)
    print("xxxxxxxxxxxxxxxxxxxxxxxxx")

    response.status_code = 500

    return response