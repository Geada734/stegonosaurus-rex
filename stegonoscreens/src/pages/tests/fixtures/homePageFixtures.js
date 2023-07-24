// Fixtures to be used in the unit tests for the HomePage.
import strings from "../../../static/strings";

// Mock application context.
const mockContext = {
    language: "en",
   };

// Mocks for the text before the image handler component.
const title = strings.pageTitles.home.en;
const instructionsSnippet = /Upload the image with the coded message:/;
const importantText = strings.homePage.warning.important.en;
const warningText = strings.homePage.warning.warningText.en;
const codedUploadMessage = strings.imageProcessor.codedImageMessage.en;

module.exports = {
    mockContext: mockContext,
    title: title,
    instructionsSnippet: instructionsSnippet,
    importantText: importantText,
    warningText: warningText,
    codedUploadMessage: codedUploadMessage
};