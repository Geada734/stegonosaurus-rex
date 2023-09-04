// Fixtures to be used in the unit tests for the App container.

// Mock application context.
const mockContext = {
 language: "en",
 changeLanguage: jest.fn(),
 popDisclaimer: jest.fn()
};

module.exports = {
 mockContext: mockContext,
};
