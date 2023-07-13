// Unit tests for the stegonoForms util.
const fixtures = require("../fixtures/stegonoFormsFixtures");
const stegonoForms = require("../../stegonoForms");

describe("encoding form tests", () => {
 test("encode form creation test", () => {
  const formData = stegonoForms.createEncodingForm(
   "testCaptcha",
   "testCoded",
   "testTemplate",
   "testFilename"
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(data).toEqual(fixtures.encodeFormResult);
 });
});

describe("decoding form tests", () => {
 test("decode form creation test", () => {
  const formData = stegonoForms.createDecodingForm(
   "testCaptcha",
   "testImage",
   "testFilename",
   "testMode"
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(data).toEqual(fixtures.decodeFormResult);
 });
});
