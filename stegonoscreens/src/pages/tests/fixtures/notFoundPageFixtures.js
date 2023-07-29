// Fixtures to be used in the unit tests for the NotFoundPage.

// Mock application context.
const mockContext = {
 language: "en",
};

// Page title in different languages.
const mockTitleEn = /Not Found/;
const mockTitleEs = /Página No Encontrada/;
// Used to search for the page text component in different languages.
const textSnippetEn =
 /The page you tried to reach does not exist within the application./;
const textSnippetEs = /La página que buscas no existe en la aplicación./;

module.exports = {
 mockContext: mockContext,
 mockTitleEn: mockTitleEn,
 mockTitleEs: mockTitleEs,
 textSnippetEn: textSnippetEn,
 textSnippetEs: textSnippetEs,
};
