// Error handlers for the application.
import errors from "../static/errors";

// Default error key.
const unknownErrorKey = "unknown";

// Handler that gets error info from the errors file.
export function handleRestError(e, errorHandler) {
 /*
  * e: error
  * errorHandler: callback to handle the error.
  */
 let errorKey;

 // If the error is one handled by the Stegonoserver, get the error key.
 if (
  e.response &&
  e.response.status &&
  e.response.status === 500
 ) {
  errorKey = e.response.data && e.response.data.error_codename ? e.response.data.error_codename : unknownErrorKey;
 } else {
  // Handle the error as unknown.
  errorKey = unknownErrorKey;
 }

 // Get the error to be returned.
 let error = errors[errorKey] ? errors[errorKey] : errors[unknownErrorKey];

 errorHandler(error);
}
