const known500Error = {
 response: {
  status: 500,
  data: {
   error_codename: "wrongFormat",
  },
 },
};

const unknown500Error = {
 response: {
  status: 500,
  data: {
   error_codename: "unknown",
  },
 },
};

const known401Error = {
 response: {
  status: 401,
  data: {
   error_codename: "invalidToken",
  },
 },
};

const unknownStatusCodeError = {
    response: {
     status: 404,
     data: {
      error_codename: "notFound",
     },
    },
};

const mockErrorHandler = {
 handleError: jest.fn(),
};

module.exports = {
 known500Error: known500Error,
 known401Error: known401Error,
 unknown500Error: unknown500Error,
 mockErrorHandler: mockErrorHandler,
 unknownStatusCodeError: unknownStatusCodeError
};
