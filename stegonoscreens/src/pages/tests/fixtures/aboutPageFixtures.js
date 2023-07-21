// Fixtures to be used in the unit tests for the AboutPage.
import strings from "../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
};

// Page title in different languages.
const mockTitleEn = strings.pageTitles.about["en"];
const mockTitleEs = strings.pageTitles.about["es"];
// Used to search for the AboutText component.
const aboutTextSnippet = /Stegonosaurus-Rex is a fullstack web application/;

module.exports = {
 mockContext: mockContext,
    mockTitleEn: mockTitleEn,
    mockTitleEs: mockTitleEs,
    aboutTextSnippet: aboutTextSnippet
};
