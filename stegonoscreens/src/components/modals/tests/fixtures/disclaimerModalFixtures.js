// Fixtures to be used in the unit tests for the DisclaimerModal component.
import strings from "../../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
 showDisclaimer: true,
 popDisclaimer: jest.fn(),
};

// Mock text for the modal.
const header = strings.disclaimerModal.header.en;
const infoText = /Welcome to Stegonosaurus-Rex/;

module.exports = {
 mockContext: mockContext,
 header: header,
 infoText: infoText,
};
