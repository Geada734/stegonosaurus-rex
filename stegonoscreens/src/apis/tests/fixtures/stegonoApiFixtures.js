// Fixtures used in the stegonoApi unit tests.
const stegonoForms = require("../../../utils/stegonoForms");

// Successful response for both endpoints in the stegonosaurus API.
const successfullResponse = {
 status: 200,
 data: {
  result: "123",
  filename: "testFileName",
 },
};

// Handler functions.
const mockHandleResult = jest.fn();
const mockHandleError = jest.fn();

// Forms for both stegonosaurus API endpoints.
const encodeForm = stegonoForms.createEncodingForm(
 "testCaptcha",
 "testCoded",
 "testTemplate",
 "testFilename"
);

const decodeForm = stegonoForms.createDecodingForm(
 "testCaptcha",
 "testImage",
 "testFilename",
 "testMode"
);

// Handler for the raw response.
function mockHandleResponse(response) {
 return response.data;
};

module.exports = {
    successfullResponse: successfullResponse,
    mockHandleResult: mockHandleResult,
    mockHandleError: mockHandleError,
    encodeForm: encodeForm,
    decodeForm: decodeForm,
    mockHandleResponse: mockHandleResponse,
}