// Fixtures to be used in the unit tests for the App container.
import strings from "../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
 popLoading: jest.fn(),
 changeLanguage: jest.fn(),
 setToken: jest.fn(),
 raiseError: jest.fn(),
};

// Data to be tested in localStorage.
const testToken = "testToken";
const localToken = "localToken";

// Text on the loading popup.
const loadingText = strings.loadingModal.loadingApp.en;

// Mock response for the token API.
const mockResponse = {
 status: 200,
 data: {
  token: testToken,
 },
};

module.exports = {
 mockContext: mockContext,
 testToken: testToken,
 localToken: localToken,
 mockResponse: mockResponse,
 loadingText: loadingText,
};
