// Unit tests for the ImageUpload component.
import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as fixtures from "../fixtures/imageUploadFixtures";
import ImageUpload from "../../ImageUpload";

jest.useFakeTimers();

jest.mock("../../../../configs/config.json", () => {
 return {
  imageSizeLimit: 1000,
 };
});

describe("Render tests for the ImageUpload component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test all pieces of the components are rendered", () => {
  render(
   <ImageUpload
    imageHandler={fixtures.mockHandleImage}
    message={fixtures.mockMessage}
   />
  );

  expect(screen.getByLabelText(fixtures.mockMessage)).toBeInTheDocument();
  expect(screen.getByAltText("to upload"));
 });
});

describe("Image upload tests.", () => {
 beforeEach(() => {
  URL.createObjectURL = () => {
   return fixtures.mockPng.name;
  };
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test a valid png file.", async () => {
  render(
   <ImageUpload
    imageHandler={fixtures.mockHandleImage}
    message={fixtures.mockMessage}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.mockMessage);
  const image = screen.getByRole("img");

  await act(async () => {
   userEvent.upload(imageUpload, fixtures.mockPng);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockHandleImage).toHaveBeenCalledWith(fixtures.mockPng);
  expect(image).toHaveAttribute("src", fixtures.mockPng.name);
 });

 test("test a png file that is too large.", async () => {
  render(
   <ImageUpload
    imageHandler={fixtures.mockHandleImage}
    message={fixtures.mockMessage}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.mockMessage);
  const image = screen.getByRole("img");

  await act(async () => {
   userEvent.upload(imageUpload, fixtures.mockLargePng);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
  expect(image).toHaveAttribute("src", "upload.svg");
 });

 test("test an invalid jpeg file.", async () => {
  render(
   <ImageUpload
    imageHandler={fixtures.mockHandleImage}
    message={fixtures.mockMessage}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.mockMessage);
  const image = screen.getByRole("img");

  await act(async () => {
   userEvent.upload(imageUpload, fixtures.mockJpeg);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
  expect(image).toHaveAttribute("src", "upload.svg");
 });

 test("test a file that isn't even an image.", async () => {
  render(
   <ImageUpload
    imageHandler={fixtures.mockHandleImage}
    message={fixtures.mockMessage}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.mockMessage);
  const image = screen.getByRole("img");

  await act(async () => {
   userEvent.upload(imageUpload, fixtures.mockTxt);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
  expect(image).toHaveAttribute("src", "upload.svg");
 });
 test("test a cancelled upload.", async () => {
  render(
   <ImageUpload
    imageHandler={fixtures.mockHandleImage}
    message={fixtures.mockMessage}
   />
  );

  const imageUpload = screen.getByLabelText(fixtures.mockMessage);
  const image = screen.getByRole("img");

  await act(async () => {
   userEvent.upload(imageUpload, null);
  });

  jest.advanceTimersByTime(1000);

  expect(fixtures.mockHandleImage).toHaveBeenCalledWith(null);
  expect(image).toHaveAttribute("src", "upload.svg");
 });
});
