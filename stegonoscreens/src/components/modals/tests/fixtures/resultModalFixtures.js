// Fixtures to be used in the unit tests for the ResultModal component.
import strings from "../../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
 showResult: false,
 result: "",
 popResult: jest.fn(),
};

// Mock text for the modal.
const header = strings.resultsModal.header.en;
const downloadText = strings.resultsModal.download.en;

module.exports = {
 mockContext: mockContext,
 header: header,
 downloadText: downloadText,
};
