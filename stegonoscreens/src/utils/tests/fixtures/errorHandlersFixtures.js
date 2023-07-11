const mockKnown500Error = {
 response: {
  status: 500,
  data: {
   error_codename: "wrongFormat",
  },
 },
};

const mockErrorHandler = {
 handleError: jest.fn(),
};

module.exports = {
 mockKnown500Error: mockKnown500Error,
 mockErrorHandler: mockErrorHandler,
};
