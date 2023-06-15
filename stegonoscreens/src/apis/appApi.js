// REST calls for the whole app.
import axios from "axios";
import config from "../configs/config.json";

// This endpoint gets a session token from the server.
export function getToken(handleToken, handleError) {
  /*
   * handleToken: callback which handles a successful response.
   * handlError: callback which handles REST errors.
   */
  axios
    .get(config.stegonoServer + "/token")
    .then((response) => {
      handleToken(response.data.token);
    })
    .catch((e) => {
      handleError(e);
    });
}
