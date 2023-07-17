// Unit tests for the text displayed in the "About" page.
import React from "react";
import { render, screen } from "@testing-library/react";

import * as fixtures from "../fixtures/aboutTextFixtures";
import AboutText from "../../AboutText";

describe("AboutText render tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });
 
 test("rendering text in english", () => {
  render(<AboutText />);

  expect(screen.getByText(fixtures.textSnippetEn)).toBeInTheDocument();
 });
 test("rendering text in spanish", () => {
  fixtures.mockContext.language = "es";

  render(<AboutText />);

  expect(screen.getByText(fixtures.textSnippetEs)).toBeInTheDocument();
 });
});
