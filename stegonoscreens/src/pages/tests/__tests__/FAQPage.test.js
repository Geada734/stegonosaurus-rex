// Unit tests for the "FAQs" page.
import React from "react";
import { render, screen, act } from "@testing-library/react";

import * as fixtures from "../fixtures/faqsPageFixtures";
import FAQPage from "../../FAQPage";

describe("FAQPage title rendering", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test title rendering", () => {
  act(() => {
   render(<FAQPage />);
  });

  expect(screen.getByText(fixtures.mockTitleEn)).toBeInTheDocument;
 });
});

describe("Question component rendering tests", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test questions rendering", async () => {
  act(() => {
   render(<FAQPage />);
  });

  fixtures.questionPairsEn.forEach((str) => {
   expect(screen.getByText(str)).toBeInTheDocument();
  });
 });
});
