// Unit tests for the stegonosaurus API.
const axios = require("axios");

const fixtures = require("../fixtures/stegonoApiFixtures");
const stegonoApi = require("../../stegonoApi");

jest.mock("axios");

describe("encode API tests", () => {
 test("successfull call to the encode API", () => {
  axios.post.mockResolvedValue(fixtures.successfullResponse);

  stegonoApi.encode(
   fixtures.mockHandleResponse,
   fixtures.mockHandleResult,
   fixtures.mockHandleError,
   fixtures.encodeForm
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleResponse).toHaveBeenCalledWith(
    fixtures.successfullResponse
   );
   expect(fixtures.mockHandleResult).toHaveBeenCalledWith({
    result: "123",
    filename: "testFileName",
   });
  });
 });
 test("errored call to the encode API", () => {
  axios.post.mockRejectedValueOnce();

  stegonoApi.encode(
   fixtures.mockHandleResponse,
   fixtures.mockHandleResult,
   fixtures.mockHandleError,
   fixtures.encodeForm
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleError).toHaveBeenCalledTimes(1);
  });
 });
});

describe("decode API tests", () => {
 test("successfull call to the decode API", () => {
  axios.post.mockResolvedValue(fixtures.successfullResponse);

  stegonoApi.decode(
   fixtures.mockHandleResponse,
   fixtures.mockHandleResult,
   fixtures.mockHandleError,
   fixtures.decodeForm
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleResponse).toHaveBeenCalledWith(
    fixtures.successfullResponse
   );
   expect(fixtures.mockHandleResult).toHaveBeenCalledWith({
    result: "123",
    filename: "testFileName",
   });
  });
 });
 test("errored call to the decode API", () => {
  axios.post.mockRejectedValueOnce();

  stegonoApi.decode(
   fixtures.mockHandleResponse,
   fixtures.mockHandleResult,
   fixtures.mockHandleError,
   fixtures.decodeForm
  );

  new Promise((resolve) => setTimeout(resolve)).then(() => {
   expect(fixtures.mockHandleError).toHaveBeenCalledTimes(1);
  });
 });
});
