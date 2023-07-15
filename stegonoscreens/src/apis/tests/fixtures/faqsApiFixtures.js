// Fixtures used in the faqsApi unit tests.
const faqsForms = require("../../../utils/faqsForms");

// Test token to be added to the call's header.
const mockToken = "testToken";

// Successful response for the getFaqs endpoint.
const successfullGetResponse = {
 status: 200,
 data: {
  faqs: [
   {
    id: 1,
    en: {
     question: "question",
     answer: "answer",
    },
    es: {
     question: "pregunta",
     answer: "respuesta",
    },
   },
  ],
 },
};

// Successful response for the rateQuestion endpoint.
const successfullPutResponse = {
 status: 200,
 data: {
  message: "Vote submitted successfully.",
 },
};

// Handler functions.
const mockHandleResponse = jest.fn();
const mockHandleError = jest.fn();
// Function that sets the user rating for a given question.
const mockSetUserRating = jest.fn();

// Form to be used in the rateQuestion body.
const faqsForm = faqsForms.createVoteForm(1, 1, 0, mockSetUserRating);

module.exports = {
 mockToken: mockToken,
 successfullGetResponse: successfullGetResponse,
 successfullPutResponse: successfullPutResponse,
 mockHandleResponse: mockHandleResponse,
 mockHandleError: mockHandleError,
 mockSetUserRating: mockSetUserRating,
 faqsForm: faqsForm,
};
