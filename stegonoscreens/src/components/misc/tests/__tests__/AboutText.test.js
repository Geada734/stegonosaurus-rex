// Unit tests for the text displayed in the about page.
import React from "react";
import { render, screen } from "@testing-library/react";

import * as fixtures from "../fixtures/aboutTextFixtures";
import AboutText from "../../AboutText";

describe("AboutText render tests.", () => {
 test("rendering text in english", () => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);

  render(<AboutText />);

  expect(screen.getByText(fixtures.textSnippetEn)).toBeInTheDocument();
 });
 test("rendering text in spanish", () => {
  fixtures.mockContext.language = "es";

  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);

  render(<AboutText />);

  expect(screen.getByText(fixtures.textSnippetEs)).toBeInTheDocument();
 });
});
