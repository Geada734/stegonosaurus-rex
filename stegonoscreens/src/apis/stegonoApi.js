import axios from "axios";
import config from "../configs/config.json";

export function encode(
  handleResponse,
  handleResults,
  handleError,
  token,
  formData
) {
  axios
    .post(config.flaskServer + "/encode", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      return handleResponse(response);
    })
    .then((results) => {
      handleResults(results);
    })
    .catch((e) => {
      return handleError(e);
    });
}

export function decode(
  handleResponse,
  handleResults,
  handleError,
  token,
  formData
) {
  axios
    .post(config.flaskServer + "/decode", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      return handleResponse(response);
    })
    .then((results) => {
      handleResults(results);
    })
    .catch((e) => {
      return handleError(e);
    });
}
