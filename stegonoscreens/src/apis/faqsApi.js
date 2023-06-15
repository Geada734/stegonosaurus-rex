// REST calls for the FAQs page.
import axios from "axios";
import config from "../configs/config.json";

// This endpoint gets the list of FAQs from the backend.
export function getFaqs(handleResponse, handleError, token) {
  /*
   * handleResponse: callback which handles a successful response.
   * handlError: callback which handles REST errors.
   * token: session token.
   */
  axios
    .get(config.stegonoServer + "/faqs", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      handleResponse(response);
    })
    .catch((e) => {
      handleError(e);
    });
}

// This endpoints sends the user rating of any given FAQ.
export function rateQuestion(handleResponse, handleError, token, formData) {
  /*
   * handleResponse: callback which handles a successful response.
   * handlError: callback which handles REST errors.
   * token: session token.
   * formData: includes the id of the FAQ and the vote value.
   */
  axios
    .put(config.stegonoServer + "/faqs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
    .then(() => handleResponse())
    .catch((e) => {
      handleError(e);
    });
}
