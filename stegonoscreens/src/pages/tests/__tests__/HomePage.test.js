// Unit tests for the Home page.
import React from "react";
import { render, screen } from "@testing-library/react";

import * as fixtures from "../fixtures/homePageFixtures";
import HomePage from "../../HomePage";

describe("Page rendering tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test page rendering.", () => {
  render(<HomePage />);

  expect(screen.getByText(fixtures.title)).toBeInTheDocument();
  expect(screen.getByText(fixtures.buttonText)).toBeInTheDocument();
  expect(screen.getByText(fixtures.importantText)).toBeInTheDocument();
  expect(screen.getByText(fixtures.warningText)).toBeInTheDocument();
  expect(screen.getByText(fixtures.codedUploadMessage)).toBeInTheDocument();
 });
});
