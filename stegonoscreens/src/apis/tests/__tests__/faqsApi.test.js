// Unit tests for the FAQs API.
const axios = require("axios");

const fixtures = require("../fixtures/faqsApiFixtures");
const faqsApi = require("../../faqsApi");

jest.mock("axios");

describe("getFAQs API tests", () => {
 test("successful call to the getFAQs API", () => {
  axios.get.mockResolvedValue(fixtures.successfullGetResponse);

  faqsApi.getFaqs(
   fixtures.mockHandleResponse,
   fixtures.mockHandleError,
   fixtures.mockToken
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleResponse).toHaveBeenCalledWith(
    fixtures.successfullGetResponse
   );
  });
 });
 test("errored call to the getFAQs API", () => {
  axios.get.mockRejectedValueOnce();

  faqsApi.getFaqs(
   fixtures.mockHandleResponse,
   fixtures.mockHandleError,
   fixtures.mockToken
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleError).toHaveBeenCalledTimes(1);
  });
 });
});

describe("rateQuestion API tests", () => {
 test("successful call to the rateQuestion API", () => {
  axios.put.mockResolvedValue(fixtures.successfullPutResponse);

  faqsApi.rateQuestion(
   fixtures.mockHandleResponse,
   fixtures.mockHandleError,
   fixtures.mockToken,
   fixtures.faqsForm
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleResponse).toHaveBeenCalledWith(
    fixtures.successfullPutResponse
   );
  });
 });
 test("errored call to the rateQuestion API", () => {
  axios.put.mockRejectedValueOnce();

  faqsApi.rateQuestion(
   fixtures.mockHandleResponse,
   fixtures.mockHandleError,
   fixtures.mockToken,
   fixtures.faqsForm
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleError).toHaveBeenCalledTimes(1);
  });
 });
});
