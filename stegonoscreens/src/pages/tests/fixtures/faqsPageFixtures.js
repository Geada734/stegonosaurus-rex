// Fixtures to be used in the unit tests for the AboutPage.

// Mock application context.
const mockContext = {
 token: "testToken",
 language: "en",
 popLoading: jest.fn(),
 raiseError: jest.fn(),
};

// Mock getFaqs response.
const mockResponse = {
 status: 200,
 data: {
  faqs: [
   {
    id: 1,
    en: {
     question: "Question 1",
     answer: "Answer 1",
    },
    es: {
     question: "Pregunta 1",
     answer: "Respuesta 1",
    },
   },
   {
    id: 2,
    en: {
     question: "Question 2",
     answer: "Answer 2",
    },
    es: {
     question: "Pregunta 2",
     answer: "Respuesta 2",
    },
   },
  ],
 },
};

// Page title in different languages.
const mockTitleEn = /Frequently Asked Questions/;
const mockTitleEs = /Preguntas Frecuentes/;

// Strings to search the questions in the page for.
const questionPairsEn = [/Question 1/, /Answer 1/, /Question 2/, /Answer 2/];
const questionPairsEs = [
 /Pregunta 1/,
 /Respuesta 1/,
 /Pregunta 2/,
 /Respuesta 2/,
];

module.exports = {
 mockContext: mockContext,
 mockResponse: mockResponse,
 mockTitleEn: mockTitleEn,
 mockTitleEs: mockTitleEs,
 questionPairsEn: questionPairsEn,
 questionPairsEs: questionPairsEs,
};
