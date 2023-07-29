// Unit tests for the decode mode of the image processor.
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import axios from "axios";

import * as fixtures from "../fixtures/decodeModeFixtures";
import DecodeMode from "../../modes/DecodeMode";

const mockPng = new File(["mockPng"], "mockUpload.png", { type: "image/png" });

function mockUpload({ message, imageHandler, operation }) {
 return (
  <div>
   <label htmlFor={operation + "-mock-upload"}>{message}</label>
   <input
    type="file"
    id={operation + "-mock-upload"}
    onChange={(e) => imageHandler(e)}
   />
  </div>
 );
}

jest.useFakeTimers();

jest.mock("axios");
jest.mock("../../ImageUpload", () => mockUpload);

describe("Render tests for the DecodeMode component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test rendering of all pieces in the component.", () => {
  render(
   <DecodeMode captchaValue={null} captchaReset={fixtures.mockResetCaptcha} />
  );

  const decodeButton = screen.getByText(fixtures.decodeButton);

  expect(screen.getByText(fixtures.transparentButton)).toBeInTheDocument();
  expect(screen.getByText(fixtures.blackButton)).toBeInTheDocument();
  expect(screen.getByText(fixtures.uploadLabel)).toBeInTheDocument();
  expect(screen.getByText(fixtures.decodeButton)).toBeInTheDocument();
  expect(decodeButton).toHaveAttribute("disabled", "");
 });

 test("test clicking on mode buttons, I guess...", () => {
  render(
   <DecodeMode captchaValue={null} captchaReset={fixtures.mockResetCaptcha} />
  );

  const transparentButton = screen.getByText(fixtures.transparentButton);
  const blackButton = screen.getByText(fixtures.blackButton);

  act(() => {
   fireEvent.click(transparentButton);
   fireEvent.click(blackButton);
  });

  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(0);
 });
});

describe("Enabling and disabling execution button tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test clicking on disabled button", () => {
  render(
   <DecodeMode captchaValue={null} captchaReset={fixtures.mockResetCaptcha} />
  );

  const decodeButton = screen.getByText(fixtures.decodeButton);

  act(() => {
   fireEvent.click(decodeButton);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockResetCaptcha).toHaveBeenCalledTimes(0);
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledTimes(0);
  expect(fixtures.mockContext.popResult).toHaveBeenCalledTimes(0);
  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(0);
 });

 test("test button is disabled even with a captcha value", () => {
  render(
   <DecodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const decodeButton = screen.getByText(fixtures.decodeButton);

  expect(decodeButton).toHaveAttribute("disabled", "");
 });

 test("test button is disabled with no captcha value but uploaded image", () => {
  render(
   <DecodeMode captchaValue={null} captchaReset={fixtures.mockResetCaptcha} />
  );

  const imageUpload = screen.getByLabelText(fixtures.uploadLabel);
  const decodeButton = screen.getByText(fixtures.decodeButton);

  act(() => {
   userEvent.upload(imageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  expect(decodeButton).toHaveAttribute("disabled", "");
 });

 test("test button is enabled when a captcha value and an image are present", () => {
  render(
   <DecodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.uploadLabel);
  const decodeButton = screen.getByText(fixtures.decodeButton);

  act(() => {
   userEvent.upload(imageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  expect(decodeButton).not.toHaveAttribute("disabled", "");
 });
});

describe("Functionality tests for the DecodeMode component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test a successful call", async () => {
  axios.post.mockResolvedValue(fixtures.mockResponse);

  render(
   <DecodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.uploadLabel);
  const decodeButton = screen.getByText(fixtures.decodeButton);

  await act(async () => {
   userEvent.upload(imageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  await act(async () => {
   fireEvent.click(decodeButton);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith(
   fixtures.loadingText
  );
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledWith("");
  expect(fixtures.mockContext.popResult).toHaveBeenCalledWith(
   "data:image/png;base64, " + fixtures.mockResponse.data.result
  );
  expect(fixtures.mockResetCaptcha).toHaveBeenCalledTimes(1);
 });

 test("test a errored call", async () => {
  axios.post.mockRejectedValueOnce(new Error("unknown"));

  render(
   <DecodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.uploadLabel);
  const decodeButton = screen.getByText(fixtures.decodeButton);

  await act(async () => {
   userEvent.upload(imageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  await act(async () => {
   fireEvent.click(decodeButton);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
 });
});
