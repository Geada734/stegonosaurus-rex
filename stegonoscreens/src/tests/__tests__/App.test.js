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

  expect(localStorage.getItem("stegoLang")).toEqual(null);
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

 afterAll(() => {
  fixtures.mockContext.language = "en";
  localStorage.removeItem(constants.localValues.language);
 });
});
