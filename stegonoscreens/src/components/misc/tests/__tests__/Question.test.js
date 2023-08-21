// Unit tests for the Question component.
import React from "react";
import { render, screen } from "@testing-library/react";

import * as fixtures from "../fixtures/questionFixtures";
import Question from "../../Question";

describe("Standard rendering tests for the Question component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test normal rendering of all parts of a Question component", () => {
  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  expect(screen.getByText(fixtures.mockQuestion.question)).toBeInTheDocument();
  expect(screen.getByText(fixtures.mockQuestion.answer)).toBeInTheDocument();
 });
});
