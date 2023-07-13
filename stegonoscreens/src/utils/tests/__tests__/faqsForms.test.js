// Unit tests for the faqsForms util.
const fixtures = require("../fixtures/faqsFormsFixtures");
const faqsForms = require("../../faqsForms");

describe("rating faqs tests", () => {
 test("voting a thumbs up on an unrated faq", () => {
  const formData = faqsForms.createVoteForm(
   1,
   1,
   0,
   fixtures.mockUserRatingSetter.setUserRating
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(fixtures.mockUserRatingSetter.setUserRating).toBeCalledWith(1);
  expect(data).toEqual(fixtures.thumbsUpUnratedForm);
 });
 test("voting a thumbs down on an unrated faq", () => {
  const formData = faqsForms.createVoteForm(
   1,
   -1,
   0,
   fixtures.mockUserRatingSetter.setUserRating
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(fixtures.mockUserRatingSetter.setUserRating).toBeCalledWith(-1);
  expect(data).toEqual(fixtures.thumbsDownUnratedForm);
 });
 test("undoing a thumbs up", () => {
  const formData = faqsForms.createVoteForm(
   1,
   1,
   1,
   fixtures.mockUserRatingSetter.setUserRating
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(fixtures.mockUserRatingSetter.setUserRating).toBeCalledWith(0);
  expect(data).toEqual(fixtures.thumbsDownUnratedForm);
 });
 test("undoing a thumbs down", () => {
  const formData = faqsForms.createVoteForm(
   1,
   -1,
   -1,
   fixtures.mockUserRatingSetter.setUserRating
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(fixtures.mockUserRatingSetter.setUserRating).toBeCalledWith(0);
  expect(data).toEqual(fixtures.thumbsUpUnratedForm);
 });
 test("thumbs up after a thumbs down", () => {
  const formData = faqsForms.createVoteForm(
   1,
   1,
   -1,
   fixtures.mockUserRatingSetter.setUserRating
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(fixtures.mockUserRatingSetter.setUserRating).toBeCalledWith(1);
  expect(data).toEqual(fixtures.thumbsUpDownratedForm);
 });
 test("thumbs down after a thumbs up", () => {
  const formData = faqsForms.createVoteForm(
   1,
   -1,
   1,
   fixtures.mockUserRatingSetter.setUserRating
  );

  let data = {};

  for (const entry of formData.entries()) {
   data[entry[0]] = entry[1];
  }

  expect(fixtures.mockUserRatingSetter.setUserRating).toBeCalledWith(-1);
  expect(data).toEqual(fixtures.thumbsDownUpratedForm);
 });
});
