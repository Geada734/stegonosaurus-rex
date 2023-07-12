// Unit tests for the errorHandlers util.
const fixtures = require("../fixtures/errorHandlersFixtures");
const errorHandlers = require("../../errorHandlers");

describe("handleRestError when errors are known.", () => {
 beforeEach(() => {
  localStorage.setItem("stegoToken", "testToken");
 });

 test("test handling of a known 500 REST error.", () => {
  errorHandlers.handleRestError(
   fixtures.known500Error,
   fixtures.mockErrorHandler.handleError
  );

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.wrongFormatErrorObject
  );
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });

 test("test handling of a known 401 forbidden REST error.", () => {
  errorHandlers.handleRestError(
   fixtures.known401Error,
   fixtures.mockErrorHandler.handleError
  );

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.invalidTokenErrorObject
  );
  // The stegoToken value will only get removed from local storage
  // when the status code is 401 (forbidden).
  expect(localStorage.getItem("stegoToken")).toEqual(null);
 });
});

describe("handleRestError when errors are unknown.", () => {
 beforeEach(() => {
  localStorage.setItem("stegoToken", "testToken");
 });

 test("test handling of an unknown 500 REST error.", () => {
  errorHandlers.handleRestError(
   fixtures.unknown500Error,
   fixtures.mockErrorHandler.handleError
  );

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });

 test("test handling an unknown error with an unhandled status code.", () => {
  errorHandlers.handleRestError(
   fixtures.unknownStatusCodeError,
   fixtures.mockErrorHandler.handleError
  );

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });

 test("test handling of an unknown 500 REST error with an unknown error code name.", () => {
  errorHandlers.handleRestError(
   fixtures.unknownErrorCodeName,
   fixtures.mockErrorHandler.handleError
  );

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });

 test("test handling of an errored null response.", () => {
  errorHandlers.handleRestError({}, fixtures.mockErrorHandler.handleError);

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });

 test("test handling of an errored malformed response.", () => {
  errorHandlers.handleRestError(
   fixtures.malformedResponse,
   fixtures.mockErrorHandler.handleError
  );

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });

 test("test handling of an errored malformed response with no error codename.", () => {
  errorHandlers.handleRestError(
   fixtures.malformedResponseNoCodename,
   fixtures.mockErrorHandler.handleError
  );

  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });
});
