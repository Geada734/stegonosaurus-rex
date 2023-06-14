import axios from "axios";
import config from "../configs/config.json";

export function getToken(handleToken, handleError) {
  axios
    .get(config.flaskServer + "/token")
    .then((response) => {
      handleToken(response.data.token);
    })
    .catch((e) => {
      handleError(e);
    });
}
