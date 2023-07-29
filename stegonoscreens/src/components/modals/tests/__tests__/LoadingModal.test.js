// Unit tests for the loading modal.
import React from "react";
import { render, screen } from "@testing-library/react";

import * as fixtures from "../fixtures/loadingModalFixtures";
import LoadingModal from "../../LoadingModal";

describe("Render test for the LoadingModal component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test show flag as false", () => {
  render(<LoadingModal />);

  expect(
   screen.queryByText(fixtures.mockContext.loadingText)
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
 });

 test("test show flag as true", () => {
  fixtures.mockContext.showLoading = true;

  render(<LoadingModal />);

  expect(
   screen.getByText(fixtures.mockContext.loadingText)
  ).toBeInTheDocument();
  expect(screen.getByRole("status")).toBeInTheDocument();
 });
});
