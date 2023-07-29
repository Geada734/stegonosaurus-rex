// Unit tests for the "About" page.
import React from "react";
import { render, screen } from "@testing-library/react";

import * as fixtures from "../fixtures/aboutPageFixtures";
import AboutPage from "../../AboutPage";

describe("AboutPage title rendering tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test title rendering in english", () => {
  render(<AboutPage />);

  expect(screen.getByText(fixtures.mockTitleEn)).toBeInTheDocument();
 });
 test("test title rendering in spanish", () => {
  fixtures.mockContext.language = "es";
  render(<AboutPage />);

  expect(screen.getByText(fixtures.mockTitleEs)).toBeInTheDocument();
 });

 // Revert the mocked app to english for the next test suite.
 afterAll(() => {
  fixtures.mockContext.language = "en";
 });
});

describe("AboutText component rendering tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test the AboutText render", () => {
  render(<AboutPage />);
  expect(screen.getByText(fixtures.aboutTextSnippet)).toBeInTheDocument();
 });
});
