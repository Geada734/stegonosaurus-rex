// Unit tests for the "FAQs" page.
import React from "react";
import { render, screen, act } from "@testing-library/react";

import axios from "axios";

import * as fixtures from "../fixtures/faqsPageFixtures";
import FAQPage from "../../FAQPage";

jest.useFakeTimers();

jest.mock("axios");

describe("FAQPage title rendering", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test title rendering in english", async () => {
  axios.get.mockResolvedValue(fixtures.mockResponse);

  await act(async () => {
   render(<FAQPage />);
  });

  expect(screen.getByText(fixtures.mockTitleEn)).toBeInTheDocument;
 });

 test("test title rendering in spanish", async () => {
  axios.get.mockResolvedValue(fixtures.mockResponse);

  fixtures.mockContext.language = "es";

  await act(async () => {
   render(<FAQPage />);
  });

  expect(screen.getByText(fixtures.mockTitleEs)).toBeInTheDocument;
 });

 afterAll(() => {
  fixtures.mockContext.language = "en";
 });
});

describe("Question component rendering tests", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test question rendering in english", async () => {
  axios.get.mockResolvedValue(fixtures.mockResponse);

  await act(async () => {
   render(<FAQPage />);
  });

  jest.advanceTimersByTime(1000);
  fixtures.questionPairsEn.forEach((str) => {
   expect(screen.getByText(str)).toBeInTheDocument();
  });
 });

 test("test question rendering in spanish", async () => {
  axios.get.mockResolvedValue(fixtures.mockResponse);

  fixtures.mockContext.language = "es";

  await act(async () => {
   render(<FAQPage />);
  });

  jest.advanceTimersByTime(1000);
  fixtures.questionPairsEs.forEach((str) => {
   expect(screen.getByText(str)).toBeInTheDocument();
  });
 });

 afterAll(() => {
  fixtures.mockContext.language = "en";
 });
});

describe("Handlers test", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test handling of a succcessful response", async () => {
  axios.get.mockResolvedValue(fixtures.mockResponse);

  await act(async () => {
   render(<FAQPage />);
  });

  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith(
   "Loading FAQs..."
  );
  jest.advanceTimersByTime(1000);
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith("");
  fixtures.questionPairsEn.forEach((str) => {
   expect(screen.getByText(str)).toBeInTheDocument();
  });
 });

 test("test handling of an errored response", async () => {
  axios.get.mockRejectedValue(new Error("unknown"));

  await act(async () => {
   render(<FAQPage />);
  });

  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith(
   "Loading FAQs..."
  );
  jest.advanceTimersByTime(1000);
  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith("");
 });
});
