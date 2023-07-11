const fixtures = require("../fixtures/errorHandlersFixtures");
const errorHandlers = require("../../errorHandlers.js");

describe("handleRestError when errors are known.", () => {
 test("test handling of a known 500 REST error.", () => {
  errorHandlers.handleRestError(
   fixtures.mockKnown500Error,
   fixtures.mockErrorHandler.handleError
  );
  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith({
   code: "ERR02",
   en: {
    summary: "Wrong Image Format",
    message: "All uploaded images must be multi-band .png files.",
   },
   es: {
    summary: "Formato Incorrecto",
    message: "Todas las imágenes subidas deben ser archivos .png multibanda.",
   },
  });
 });
});
