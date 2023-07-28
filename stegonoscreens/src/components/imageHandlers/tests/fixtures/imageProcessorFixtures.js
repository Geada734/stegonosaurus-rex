// Fixtures to be used in the unit tests for the ImageProcessor component.
import strings from "../../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
};

// Buttons that switch between modes.
const encodeNavButton = strings.imageProcessor.modes.encode[mockContext.language];
const decodeNavButton = strings.imageProcessor.modes.decode[mockContext.language];

// Execution buttons.
const encodeButton = strings.imageProcessor.buttonMessage.encode[mockContext.language];
const decodeButton = strings.imageProcessor.buttonMessage.decode[mockContext.language];

module.exports = {
 mockContext: mockContext,
 encodeNavButton: encodeNavButton,
 decodeNavButton: decodeNavButton,
 encodeButton: encodeButton,
 decodeButton: decodeButton,
};
