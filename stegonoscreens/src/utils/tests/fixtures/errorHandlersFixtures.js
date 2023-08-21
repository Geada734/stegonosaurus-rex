// Fixtures used in the errorHandlers unit tests.
import errors from "../../../static/errors";

// Errors from the static errors file, used to compare.
const wrongFormatErrorObject = errors["wrongFormat"];
const unknownErrorObject = errors["unknown"];

// 500 error for which the code name is known.
const known500Error = {
 response: {
  status: 500,
  data: {
   error_codename: "wrongFormat",
  },
 },
};

// Generic 500 error returned by the server.
const unknown500Error = {
 response: {
  status: 500,
  data: {
   error_codename: "unknown",
  },
 },
};

// Unhandled status code error.
const unknownStatusCodeError = {
 response: {
  status: 404,
  data: {
   error_codename: "notFound",
  },
 },
};

// Unknown error codename in the error response.
const unknownErrorCodeName = {
 response: {
  status: 500,
  data: {
   error_codename: "mysterious",
  },
 },
};

// Malformed errored response.
const malformedResponse = {
 response: {},
};

// Malformed response with no error data.
const malformedResponseNoCodename = {
 response: {
  status: 500,
 },
};

// Mock function to pass as a callback in the handleRestError function.
const mockHandleError = jest.fn();

module.exports = {
 wrongFormatErrorObject: wrongFormatErrorObject,
 unknownErrorObject: unknownErrorObject,
 known500Error: known500Error,
 unknown500Error: unknown500Error,
 unknownStatusCodeError: unknownStatusCodeError,
 unknownErrorCodeName: unknownErrorCodeName,
 malformedResponse: malformedResponse,
 malformedResponseNoCodename: malformedResponseNoCodename,
 mockHandleError: mockHandleError,
};
