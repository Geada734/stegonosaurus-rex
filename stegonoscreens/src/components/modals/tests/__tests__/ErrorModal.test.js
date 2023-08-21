// Unit tests for the error modal.
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

import * as fixtures from "../fixtures/errorModalFixtures";
import ErrorModal from "../../ErrorModal";

describe("Render tests for the ErrorModal component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test the modal is shown when the flag is true, and there's an error to show.", () => {
  render(<ErrorModal />);

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText(fixtures.regularError.code)).toBeInTheDocument();
  expect(
   screen.getByText(fixtures.regularError.en.summary)
  ).toBeInTheDocument();
  expect(
   screen.getByText(fixtures.regularError.en.message)
  ).toBeInTheDocument();
 });

 test("test click event on the close button.", async () => {
  render(<ErrorModal />);
  const closeButton = screen.getByRole("button");

  await act(async () => {
   fireEvent.click(closeButton);
  });

  expect(fixtures.mockContext.raiseError).toHaveBeenCalledWith(null);
 });

 test("test nothing is showed when the modal is closed.", () => {
  fixtures.mockContext.error = null;
  fixtures.mockContext.showError = false;

  render(<ErrorModal />);

  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(
   screen.queryByText(fixtures.regularError.code)
  ).not.toBeInTheDocument();
  expect(
   screen.queryByText(fixtures.regularError.en.summary)
  ).not.toBeInTheDocument();
  expect(
   screen.queryByText(fixtures.regularError.en.message)
  ).not.toBeInTheDocument();
 });

 afterAll(() => {
  fixtures.mockContext.error = fixtures.regularError;
  fixtures.mockContext.showError = true;
 });
});
