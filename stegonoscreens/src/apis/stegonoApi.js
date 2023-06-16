// REST calls for the Stegonoserver API.
import axios from "axios";

import config from "../configs/config.json";

// This endpoint encodes images.
export function encode(
  handleResponse,
  handleResults,
  handleError,
  token,
  formData
) {
  /*
   * handleResponse: callback which handles a successful response.
   * handleResults: callback that handles a resulting image.
   * handlError: callback which handles REST errors.
   * token: session token.
   * formData: images and pertinent data for stegonosaurus.
   */
  axios
    .post(config.stegonoServer + "/encode", formData, {
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

// This endpoint decodes images.
export function decode(
  handleResponse,
  handleResults,
  handleError,
  token,
  formData
) {
  /*
   * handleResponse: callback which handles a successful response.
   * handleResults: callback that handles a resulting image.
   * handlError: callback which handles REST errors.
   * token: session token.
   * formData: images and pertinent data for stegonosaurus.
   */
  axios
    .post(config.stegonoServer + "/decode", formData, {
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
