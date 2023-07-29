// Unit tests for the ImageProcessor component.
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

import * as fixtures from "../fixtures/imageProcessorFixtures";
import ImageProcessor from "../../ImageProcessor";

jest.useFakeTimers();

describe("ImageProcessor render test.", () => {
 beforeEach(() => {
  jest.spyOn(React, "useContext").mockImplementation(() => fixtures.mockContext);
 });

 test("test component is rendered completely.", () => {
  render(<ImageProcessor />);
  expect(screen.getByText(fixtures.encodeNavButton)).toBeInTheDocument();
  expect(screen.getByText(fixtures.decodeNavButton)).toBeInTheDocument();
  expect(screen.getByText(fixtures.encodeButton)).toBeInTheDocument();
 });
});

describe("Operational mode switching tests.", () => {
 beforeEach(() => {
  jest.spyOn(React, "useContext").mockImplementation(() => fixtures.mockContext);
 });

 test("test switching to decode mode.", () => {
  render(<ImageProcessor />);

  const navButton = screen.getByText(fixtures.decodeNavButton);

  act(() => {
   fireEvent.click(navButton);
  });

  jest.advanceTimersByTime(1000);

  expect(screen.getByText(fixtures.decodeButton)).toBeInTheDocument();
 });
});
