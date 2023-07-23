// Fixtures to be used in the unit tests for the ErrorModal component.
import errors from "../../../../static/errors";

// Errors to showcase different modal functionalities.
const regularError = errors.wrongFormat;
const forbiddenError = errors.invalidToken;

// Mock application context.
const mockContext = {
 error: regularError,
 language: "en",
 showError: true,
 raiseError: jest.fn(),
};


module.exports = {
    regularError: regularError,
    forbiddenError: forbiddenError,
    mockContext: mockContext
};