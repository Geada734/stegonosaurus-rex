// Fixtures to be used in the unit tests for the EncodeMode component.
import strings from "../../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
 popLoading: jest.fn(),
 popResult: jest.fn(),
 raiseError: jest.fn(),
};

// Mock successful decode response.
const mockResponse = {
 status: 200,
 data: {
  result: "mockResult",
  filename: "mockFilename.png",
 },
};

// Mock reset captcha function.
const mockResetCaptcha = jest.fn();

// Upload component strings.
const codedUploadLabel =
 strings.imageProcessor.codedImageMessage[mockContext.language];
const templateUploadLabel =
 strings.imageProcessor.templateImageMessage[mockContext.language];

// Encode button label.
const encodeButton =
 strings.imageProcessor.buttonMessage.encode[mockContext.language];

// Text for the loading modal header.
const loadingText = strings.loadingModal.processingImages[mockContext.language];

module.exports = {
 mockContext: mockContext,
 mockResponse: mockResponse,
 mockResetCaptcha: mockResetCaptcha,
 codedUploadLabel: codedUploadLabel,
 templateUploadLabel: templateUploadLabel,
 encodeButton: encodeButton,
 loadingText: loadingText,
};
