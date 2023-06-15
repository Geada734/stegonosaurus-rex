import axios from "axios";
import config from "../configs/config.json";

export function getFaqs(handleResponse, handleError, token) {
  axios
    .get(config.server + "/faqs", {
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

export function rateQuestion(handleResponse, handleError, token, formData) {
  axios
    .put(config.server + "/faqs", formData, {
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
