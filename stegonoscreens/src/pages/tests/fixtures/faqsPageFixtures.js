// Fixtures to be used in the unit tests for the AboutPage.
import strings from "../../../static/strings";

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
const mockTitleEn = strings.pageTitles.faqs["en"];
const mockTitleEs = strings.pageTitles.faqs["es"];

// Strings to search the questions in the page for.
const questionPairsEn = [
 mockResponse.data.faqs[0].en.question,
 mockResponse.data.faqs[0].en.answer,
 mockResponse.data.faqs[1].en.question,
 mockResponse.data.faqs[1].en.answer,
];
const questionPairsEs = [
 mockResponse.data.faqs[0].es.question,
 mockResponse.data.faqs[0].es.answer,
 mockResponse.data.faqs[1].es.question,
 mockResponse.data.faqs[1].es.answer,
];

module.exports = {
 mockContext: mockContext,
 mockResponse: mockResponse,
 mockTitleEn: mockTitleEn,
 mockTitleEs: mockTitleEs,
 questionPairsEn: questionPairsEn,
 questionPairsEs: questionPairsEs,
};
