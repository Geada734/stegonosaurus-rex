// Error handlers for the application.
import errors from "../static/errors.js";

// Handler that gets error info from the errors file.
export function handleRestError(e, errorHandler) {
  /*
   * e: error
   * errorHandler: callback to handle the error.
   */
  let errorKey;

  // If the error is one handled by the Stegonoserver, get the error key.
  if (e.response.status === 500 || e.response.status === 401) {
    errorKey = e.response.data.error_codename;
    // For a forbidden error, remove the current session token so a new one can be
    // requested upon refresh.
    if (e.response.status === 401) localStorage.removeItem("stegoToken");
  } else {
    // Handle the error as unknown.
    errorKey = "unknown";
  }

  errorHandler(errors[errorKey]);
}
