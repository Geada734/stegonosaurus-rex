// Fixtures to be used in the unit tests for the DecodeMode component.
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

// Buttons that switch between modes.
const transparentButton =
 strings.imageProcessor.decodingModes.t[mockContext.language];
const blackButton =
 strings.imageProcessor.decodingModes.b[mockContext.language];

// Upload component strings.
const uploadLabel =
 strings.imageProcessor.toDecodeImageMessage[mockContext.language];
const decodeButton =
 strings.imageProcessor.buttonMessage.decode[mockContext.language];

// Text for the loading modal header.
const loadingText = strings.loadingModal.processingImages[mockContext.language];

module.exports = {
 mockContext: mockContext,
 mockResponse: mockResponse,
 mockResetCaptcha: mockResetCaptcha,
 transparentButton: transparentButton,
 blackButton: blackButton,
 uploadLabel: uploadLabel,
 decodeButton: decodeButton,
 loadingText: loadingText,
};
