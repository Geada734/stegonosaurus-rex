// Unit tests for the errorHandlers util.
const fixtures = require("../fixtures/errorHandlersFixtures");
const errorHandlers = require("../../errorHandlers");

describe("handleRestError when errors are known.", () => {
 test("test handling of a known 500 REST error.", () => {
  errorHandlers.handleRestError(
   fixtures.known500Error,
   fixtures.mockHandleError
  );

  expect(fixtures.mockHandleError).toHaveBeenCalledWith(
   fixtures.wrongFormatErrorObject
  );
 });
});

describe("handleRestError when errors are unknown.", () => {
 test("test handling of an unknown 500 REST error.", () => {
  errorHandlers.handleRestError(
   fixtures.unknown500Error,
   fixtures.mockHandleError
  );

  expect(fixtures.mockHandleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
 });

 test("test handling an unknown error with an unhandled status code.", () => {
  errorHandlers.handleRestError(
   fixtures.unknownStatusCodeError,
   fixtures.mockHandleError
  );

  expect(fixtures.mockHandleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
 });

 test("test handling of an unknown 500 REST error with an unknown error code name.", () => {
  errorHandlers.handleRestError(
   fixtures.unknownErrorCodeName,
   fixtures.mockHandleError
  );

  expect(fixtures.mockHandleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
 });

 test("test handling of an errored null response.", () => {
  errorHandlers.handleRestError({}, fixtures.mockHandleError);

  expect(fixtures.mockHandleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
 });

 test("test handling of an errored malformed response.", () => {
  errorHandlers.handleRestError(
   fixtures.malformedResponse,
   fixtures.mockHandleError
  );

  expect(fixtures.mockHandleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
 });

 test("test handling of an errored malformed response with no error codename.", () => {
  errorHandlers.handleRestError(
   fixtures.malformedResponseNoCodename,
   fixtures.mockHandleError
  );

  expect(fixtures.mockHandleError).toHaveBeenCalledWith(
   fixtures.unknownErrorObject
  );
 });
});
