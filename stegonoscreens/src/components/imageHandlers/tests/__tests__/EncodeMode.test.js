// Unit tests for the encode mode of the image processor.
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import axios from "axios";

import * as fixtures from "../fixtures/encodeModeFixtures";
import EncodeMode from "../../modes/EncodeMode";

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

describe("Render tests for the EncodeMode component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test rendering of all pieces in the component.", () => {
  render(
   <EncodeMode captchaValue={null} captchaReset={fixtures.mockResetCaptcha} />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);

  expect(screen.getByText(fixtures.codedUploadLabel)).toBeInTheDocument();
  expect(screen.getByText(fixtures.templateUploadLabel)).toBeInTheDocument();
  expect(screen.getByText(fixtures.encodeButton)).toBeInTheDocument();
  expect(encodeButton).toHaveAttribute("disabled", "");
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
   <EncodeMode captchaValue={null} captchaReset={fixtures.mockResetCaptcha} />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);

  act(() => {
   fireEvent.click(encodeButton);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockResetCaptcha).toHaveBeenCalledTimes(0);
  expect(fixtures.mockContext.popLoading).toHaveBeenCalledTimes(0);
  expect(fixtures.mockContext.popResult).toHaveBeenCalledTimes(0);
  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(0);
 });

 test("test button is disabled even with a captcha value", () => {
  render(
   <EncodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);

  expect(encodeButton).toHaveAttribute("disabled", "");
 });

 test("test button is disabled even with a captcha value and submitted coded image", () => {
  render(
   <EncodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);
  const codedImageUpload = screen.getByLabelText(fixtures.codedUploadLabel);

  act(() => {
   userEvent.upload(codedImageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  expect(encodeButton).toHaveAttribute("disabled", "");
 });

 test("test button is disabled even with a captcha value and submitted template image", () => {
  render(
   <EncodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);
  const templateImageUpload = screen.getByLabelText(
   fixtures.templateUploadLabel
  );

  act(() => {
   userEvent.upload(templateImageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  expect(encodeButton).toHaveAttribute("disabled", "");
 });

 test("test button is disabled with no captcha but two images", () => {
  render(
   <EncodeMode captchaValue={null} captchaReset={fixtures.mockResetCaptcha} />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);
  const codedImageUpload = screen.getByLabelText(fixtures.codedUploadLabel);
  const templateImageUpload = screen.getByLabelText(
   fixtures.templateUploadLabel
  );

  act(() => {
   userEvent.upload(codedImageUpload, mockPng);
   userEvent.upload(templateImageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  expect(encodeButton).toHaveAttribute("disabled", "");
 });

 test("test button is enable with a valid captcha and two images", () => {
  render(
   <EncodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);
  const codedImageUpload = screen.getByLabelText(fixtures.codedUploadLabel);
  const templateImageUpload = screen.getByLabelText(
   fixtures.templateUploadLabel
  );

  act(() => {
   userEvent.upload(codedImageUpload, mockPng);
   userEvent.upload(templateImageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  expect(encodeButton).not.toHaveAttribute("disabled", "");
 });
});

describe("Functionality tests for the EncodeMode component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test successful call", async () => {
  axios.post.mockResolvedValue(fixtures.mockResponse);

  render(
   <EncodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);
  const codedImageUpload = screen.getByLabelText(fixtures.codedUploadLabel);
  const templateImageUpload = screen.getByLabelText(
   fixtures.templateUploadLabel
  );

  await act(async () => {
   userEvent.upload(codedImageUpload, mockPng);
   userEvent.upload(templateImageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  await act(async () => {
   fireEvent.click(encodeButton);
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

 test("test errored call", async () => {
  axios.post.mockRejectedValueOnce(new Error("unknown"));

  render(
   <EncodeMode
    captchaValue="test captcha value"
    captchaReset={fixtures.mockResetCaptcha}
   />
  );

  const encodeButton = screen.getByText(fixtures.encodeButton);
  const codedImageUpload = screen.getByLabelText(fixtures.codedUploadLabel);
  const templateImageUpload = screen.getByLabelText(
   fixtures.templateUploadLabel
  );

  await act(async () => {
   userEvent.upload(codedImageUpload, mockPng);
   userEvent.upload(templateImageUpload, mockPng);
  });

  jest.advanceTimersByTime(1000);

  await act(async () => {
   fireEvent.click(encodeButton);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
 });
});
