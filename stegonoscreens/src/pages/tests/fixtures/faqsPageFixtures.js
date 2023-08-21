// Fixtures to be used in the unit tests for the AboutPage.
import strings from "../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
};

// Page title.
const mockTitleEn = strings.pageTitles.faqs["en"];

// Questions and Answers
const questionPairsEn = [
 /What is steganography/,
 /Are there any practical uses for steganography/,
 /How do you use this app/,
 /Can I use stegonosaurus in my Python project/,
];

module.exports = {
 mockContext: mockContext,
 mockTitleEn: mockTitleEn,
 questionPairsEn: questionPairsEn,
};
