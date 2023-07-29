// Fixturest to be used in the unit tests for the AboutText component.

// Mock app context.
const mockContext = {
 language: "en",
};

// Text snippets to be searched on the component in different languages.
const textSnippetEn = /Stegonosaurus-Rex is a fullstack web application/;
const textSnippetEs = /Stegonosaurus-Rex es una aplicación web fullstack/;

module.exports = {
 mockContext: mockContext,
 textSnippetEn: textSnippetEn,
 textSnippetEs: textSnippetEs,
};
