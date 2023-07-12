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
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });
 test("test handling of a known 401 forbidden REST error.", () => {
  errorHandlers.handleRestError(
   fixtures.known401Error,
   fixtures.mockErrorHandler.handleError
  );
  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith({
   code: "ERR05",
   en: {
    summary: "Invalid Session",
    message: "The current session is invalid, please refresh the page.",
   },
   es: {
    summary: "Sesión Inválida",
    message: "La sesión actual es inválida, por favor actualiza la página.",
   },
  });
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
  expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith({
   code: "ERR99",
   en: {
    summary: "Something went wrong...",
    message: "There has been an unknown error, please try again later.",
   },
   es: {
    summary: "Algo salió mal...",
    message: "Ocurrió un error desconocido, por favor inténtalo más tarde.",
   },
  });
  expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });
 test("test handling an unknown error with an unhandled status code.", () => {
    errorHandlers.handleRestError(
        fixtures.unknownStatusCodeError,
        fixtures.mockErrorHandler.handleError
    );
    expect(fixtures.mockErrorHandler.handleError).toHaveBeenCalledWith({
     code: "ERR99",
     en: {
      summary: "Something went wrong...",
      message: "There has been an unknown error, please try again later.",
     },
     es: {
      summary: "Algo salió mal...",
      message: "Ocurrió un error desconocido, por favor inténtalo más tarde.",
     },
    });
    expect(localStorage.getItem("stegoToken")).toEqual("testToken");
 });
});
