// Unit tests for the "Not Found" page.
import React from "react";
import { render, screen } from "@testing-library/react";

import * as fixtures from "../fixtures/notFoundPageFixtures";
import NotFoundPage from "../../NotFoundPage";

describe("Rendering tests for the Not Found Page", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test rendering the page in english", () => {
  render(<NotFoundPage />);

  expect(screen.getByText(fixtures.mockTitleEn)).toBeInTheDocument();
  expect(screen.getByText(fixtures.textSnippetEn)).toBeInTheDocument();
 });

 test("test rendering the page in spanish", () => {
  fixtures.mockContext.language = "es";

  render(<NotFoundPage />);

  expect(screen.getByText(fixtures.mockTitleEs)).toBeInTheDocument();
  expect(screen.getByText(fixtures.textSnippetEs)).toBeInTheDocument();
 });
});
