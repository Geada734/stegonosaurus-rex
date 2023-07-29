// Fixtures to be used in the unit tests for the HomePage.
import strings from "../../../static/strings";

// Mock application context.
const mockContext = {
    language: "en",
   };

// Mocks for the text before the image handler component.
const title = strings.pageTitles.home.en;
const buttonText = strings.imageProcessor.buttonMessage.encode.en;
const importantText = strings.homePage.warning.important.en;
const warningText = strings.homePage.warning.warningText.en;
const codedUploadMessage = strings.imageProcessor.codedImageMessage.en;

module.exports = {
    mockContext: mockContext,
    title: title,
    buttonText: buttonText,
    importantText: importantText,
    warningText: warningText,
    codedUploadMessage: codedUploadMessage
};