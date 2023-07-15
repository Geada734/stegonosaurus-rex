// Fixtures used in the appApi unit tests.

// Successfull REST response.
const successfullResponse = {status: 200, data: {token: "testToken"}}

// Mocks the handleToken callback.
const mockHandleToken = jest.fn();
// Mocks the handleError callback.
const mockHandleError = jest.fn();

module.exports = {
    successfullResponse: successfullResponse,
    mockHandleToken: mockHandleToken,
    mockHandleError: mockHandleError
};