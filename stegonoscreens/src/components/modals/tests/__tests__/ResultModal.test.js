// Unit tests for the result modal.
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

import * as fixtures from "../fixtures/resultModalFixtures";
import ResultModal from "../../ResultModal";

describe("Render test for the ResultModal component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test show flag as false", () => {
  render(<ResultModal />);

  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.queryByText(fixtures.header)).not.toBeInTheDocument();
  expect(screen.queryByText(fixtures.downloadText)).not.toBeInTheDocument();
  expect(screen.queryByAltText("result")).not.toBeInTheDocument();
 });

 test("test show flag as true", () => {
  fixtures.mockContext.result = "result";
  fixtures.mockContext.showResult = true;

  render(<ResultModal />);
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText(fixtures.header)).toBeInTheDocument();
  expect(screen.getByText(fixtures.downloadText)).toBeInTheDocument();
  expect(screen.getByAltText("result")).toBeInTheDocument();
 });

 test("test the close button functionality", async () => {
  render(<ResultModal />);

  const closeButton = screen.getByRole("button");

  await act(async () => {
   fireEvent.click(closeButton);
  });

  expect(fixtures.mockContext.popResult).toHaveBeenCalledWith("");
 });

 afterAll(() => {
  fixtures.mockContext.result = "";
  fixtures.mockContext.showResult = false;
 });
});
