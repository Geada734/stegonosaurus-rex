// Unit tests for the App container.
import React from "react";
import { render, screen, act } from "@testing-library/react";

import axios from "axios";

import * as fixtures from "../fixtures/appFixtures";
import App from "../../App";

function mockLayout() {
 return <div>App renders here.</div>;
}

jest.useFakeTimers();

jest.mock("axios");
jest.mock("../../layout/Layout", () => mockLayout);

describe("App steps rendering tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test rendering with no local data.", async () => {
  axios.get.mockResolvedValue(fixtures.mockResponse);

  await act(async () => {
   render(<App />);
  });

  jest.advanceTimersByTime(1000);

  expect(localStorage.getItem("stegoToken")).toEqual(fixtures.testToken);
  expect(localStorage.getItem("stegoLang")).toEqual(null);
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith(
   fixtures.loadingText
  );
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith("");
  expect(fixtures.mockContext.setToken).toHaveBeenCalledWith(
   fixtures.testToken
  );
  expect(screen.getByText("App renders here.")).toBeInTheDocument();
 });

 test("test rendering with language and token in localStorage", async () => {
  localStorage.setItem("stegoLang", "es");
  localStorage.setItem("stegoToken", fixtures.localToken);

  await act(async () => {
   render(<App />);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith(
   fixtures.loadingText
  );
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith("");
  expect(fixtures.mockContext.changeLanguage).toHaveBeenCalledWith("es");
  expect(fixtures.mockContext.setToken).toHaveBeenCalledWith(
   fixtures.localToken
  );
  expect(screen.getByText("App renders here.")).toBeInTheDocument();
 });

 afterAll(() => {
  fixtures.mockContext.language = "en";
  localStorage.removeItem("stegoLang");
  localStorage.removeItem("stegoToken");
 });
});

describe("Errors when rendering App.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test getting an error when retrieving token.", async () => {
  axios.get.mockRejectedValueOnce(new Error("unknown"));

  await act(async () => {
   render(<App />);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith(
   fixtures.loadingText
  );
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith("");
  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("App renders here.")).not.toBeInTheDocument();
 });
});
