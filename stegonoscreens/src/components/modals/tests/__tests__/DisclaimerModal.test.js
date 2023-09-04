// Unit tests for the disclaimer modal.
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

import * as fixtures from "../fixtures/disclaimerModalFixtures";
import DisclaimerModal from "../../DisclaimerModal";

import constants from "../../../../static/constants";

describe("Render tests for the DisclaimerModal component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test rendering of component parts", () => {
  render(<DisclaimerModal />);

  expect(screen.getByText(fixtures.header)).toBeInTheDocument();
  expect(screen.getByText(fixtures.infoText)).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
 });
});

describe("Closing functionality test.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test clicking in the accept button", () => {
  render(<DisclaimerModal />);

  const acceptButton = screen.getByRole("button");

  act(() => {
   fireEvent.click(acceptButton);
  });

  const acknowledged = localStorage.getItem(constants.localValues.acknowledged);

  expect(fixtures.mockContext.popDisclaimer).toHaveBeenCalledWith(false);
  expect(acknowledged).toEqual("true");
 });
});
