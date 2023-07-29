// Fixtures to be used in the unit tests for the Question component.
import strings from "../../../../static/strings";

// Mock application context.
const mockContext = {
 token: "testToken",
 language: "en",
 raiseError: jest.fn(),
};

// Mock rateQuestion response.
const mockResponse = {
 status: 200,
 data: {
  message: "Vote submitted successfully.",
 },
};

// Mock values to render a Question component.
const mockQuestion = {
 id: 1,
 question: "Test Question",
 answer: "Test Answer",
};

// Text between the answer and the button group.
const usefulTextEn = strings.useful.unrated["en"];
const usefulTextEs = strings.useful.unrated["es"];
const thanksTextEn = strings.useful.rated["en"];
const thanksTextEs = strings.useful.rated["es"];

module.exports = {
 mockContext: mockContext,
 mockResponse: mockResponse,
 mockQuestion: mockQuestion,
 usefulTextEn: usefulTextEn,
 usefulTextEs: usefulTextEs,
 thanksTextEn: thanksTextEn,
 thanksTextEs: thanksTextEs,
};
