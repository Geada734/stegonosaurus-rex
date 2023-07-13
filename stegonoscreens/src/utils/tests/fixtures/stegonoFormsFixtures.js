// Fixtures used in the stegonoForms unit tests.

// Sample output of the createEncodingForm function.
const encodeFormResult = {
 captchaValue: "testCaptcha",
 coded: "testCoded",
 img: "testTemplate",
 filename: "testFilename",
};

// Sample output of the createDecodingForm function.
const decodeFormResult = {
 captchaValue: "testCaptcha",
 img: "testImage",
 filename: "testFilename",
 mode: "testMode",
};

module.exports = {
 encodeFormResult: encodeFormResult,
 decodeFormResult: decodeFormResult,
};
