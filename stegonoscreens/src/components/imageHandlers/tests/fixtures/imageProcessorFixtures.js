// Fixtures to be used in the unit tests for the ImageProcessor component.
import strings from "../../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
};

// Buttons that switch between modes.
const encodeNavButton = strings.imageProcessor.modes.encode.en;
const decodeNavButton = strings.imageProcessor.modes.decode.en;

// Execution buttons.
const encodeButton = strings.imageProcessor.buttonMessage.encode.en;
const decodeButton = strings.imageProcessor.buttonMessage.decode.en;

module.exports = {
 mockContext: mockContext,
 encodeNavButton: encodeNavButton,
 decodeNavButton: decodeNavButton,
 encodeButton: encodeButton,
 decodeButton: decodeButton,
};
