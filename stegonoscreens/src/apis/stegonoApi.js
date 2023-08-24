// REST calls for the Stegonoserver API.
import axios from "axios";

import config from "../configs/config.json";

const encodeEndpoint = "/encode";
const decodeEndpoint = "/decode";

// This endpoint encodes images.
export function encode(
  handleResponse,
  handleResults,
  handleError,
  formData
) {
  /*
   * handleResponse: callback which handles a successful response.
   * handleResults: callback that handles a resulting image.
   * handlError: callback which handles REST errors.
   * formData: images and pertinent data for stegonosaurus.
   */
  axios
    .post(config.stegonoServer + encodeEndpoint, formData)
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
  formData
) {
  /*
   * handleResponse: callback which handles a successful response.
   * handleResults: callback that handles a resulting image.
   * handlError: callback which handles REST errors.
   * formData: images and pertinent data for stegonosaurus.
   */
  axios
    .post(config.stegonoServer + decodeEndpoint, formData)
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
