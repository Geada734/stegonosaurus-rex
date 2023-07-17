// Fixturest to be used in the unit tests for the AboutPage.
const mockContext = {
 language: "en",
};

// Page title in different languages.
const mockTitleEn = /About Stegonosaurus-Rex/;
const mockTitleEs = /Acerca De Stegonosaurus-Rex/;
// Used to search for the AboutText component.
const aboutTextSnippet = /Stegonosaurus-Rex is a fullstack web application/;

module.exports = {
 mockContext: mockContext,
    mockTitleEn: mockTitleEn,
    mockTitleEs: mockTitleEs,
    aboutTextSnippet: aboutTextSnippet
};
