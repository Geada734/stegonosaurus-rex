// Fixtures to be used in the unit tests for the ImageUpload component.

// Mock application context.
const mockContext = {
 raiseError: jest.fn(),
};

// Mock image handler, runs when image is uploaded.
const mockHandleImage = jest.fn();

// Label for the file input.
const mockMessage = "Rendered alright, I guess";

// Different valid and invalid files to be uploaded.
const mockPng = new File(["mockPng"], "mockUpload.png", { type: "image/png" });
const mockJpeg = new File(["mockJpeg"], "mockUpload.jpeg", {
 type: "image/jpeg",
});
const mockTxt = new File(["mockTxt"], "mockUpload.txt", { type: "text/plain" });
const mockLargePng = new File(["mockPng"], "mockUpload.png", {
 type: "image/png",
});

Object.defineProperty(mockLargePng, "size", { value: 1001 });

module.exports = {
 mockContext: mockContext,
 mockHandleImage: mockHandleImage,
 mockMessage: mockMessage,
 mockPng: mockPng,
 mockJpeg: mockJpeg,
 mockTxt: mockTxt,
 mockLargePng: mockLargePng,
};
