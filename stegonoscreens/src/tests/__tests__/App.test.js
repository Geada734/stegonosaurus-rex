// Unit tests for the App container.
import React from "react";
import { render, screen, act } from "@testing-library/react";

import * as fixtures from "../fixtures/appFixtures";
import App from "../../App";

import constants from "../../static/constants";

function mockLayout() {
 return <div>App renders here.</div>;
}


jest.mock("../../layout/Layout", () => mockLayout);

describe("App steps rendering tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test rendering with no local data.", () => {
  act(() => {
   render(<App />);
  });

  expect(localStorage.getItem(constants.localValues.language)).toEqual(null);
  expect(localStorage.getItem(constants.localValues.acknowledged)).toEqual(null);
  expect(fixtures.mockContext.popDisclaimer).toHaveBeenCalledWith(true);
  expect(screen.getByText("App renders here.")).toBeInTheDocument();
 });

 test("test rendering with language in localStorage", () => {
  localStorage.setItem(constants.localValues.language, "es");

  act(() => {
   render(<App />);
  });

  expect(fixtures.mockContext.changeLanguage).toHaveBeenCalledWith("es");
  expect(screen.getByText("App renders here.")).toBeInTheDocument();
 });

 test("test rendering for later than the first time", () => {
  localStorage.setItem(constants.localValues.acknowledged, true);

  act(() => {
   render(<App />);
  });

  expect(fixtures.mockContext.popDisclaimer).toHaveBeenCalledTimes(0);
  expect(screen.getByText("App renders here.")).toBeInTheDocument();
 });

 afterAll(() => {
  fixtures.mockContext.language = "en";
  localStorage.removeItem(constants.localValues.language);
  localStorage.removeItem(constants.localValues.acknowledged);
 });
});
