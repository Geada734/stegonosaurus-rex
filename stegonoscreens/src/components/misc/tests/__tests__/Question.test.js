// Unit tests for the Question component.
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

import axios from "axios";

import * as fixtures from "../fixtures/questionFixtures";
import Question from "../../Question";

function mockButton({ onClick, variant, active }) {
 return (
  <div>
   <span>{active.toString() + "-" + variant}</span>
   <button onClick={onClick}>{variant}</button>
  </div>
 );
}

function mockButtonGroup({ children }) {
 return <div>{children}</div>;
}

jest.useFakeTimers();

jest.mock("axios");
jest.mock("react-bootstrap/Button", () => mockButton);
jest.mock("react-bootstrap/ButtonGroup", () => mockButtonGroup);

describe("Standard rendering tests for the Question component.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test normal rendering of all parts of a Question component", () => {
  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  expect(screen.getByText(fixtures.mockQuestion.question)).toBeInTheDocument();
  expect(screen.getByText(fixtures.mockQuestion.answer)).toBeInTheDocument();
  expect(screen.getByText(fixtures.usefulTextEn)).toBeInTheDocument();
  expect(screen.getByText("outline-success")).toBeInTheDocument();
  expect(screen.getByText("outline-danger")).toBeInTheDocument();
  expect(screen.getByText("false-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 test("test the useful text gets rendered in spanish too.", () => {
  fixtures.mockContext.language = "es";

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  expect(screen.getByText(fixtures.mockQuestion.question)).toBeInTheDocument();
  expect(screen.getByText(fixtures.mockQuestion.answer)).toBeInTheDocument();
  expect(screen.getByText(fixtures.usefulTextEs)).toBeInTheDocument();
  expect(screen.getByText("outline-success")).toBeInTheDocument();
  expect(screen.getByText("outline-danger")).toBeInTheDocument();
  expect(screen.getByText("false-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 afterAll(() => {
  fixtures.mockContext.language = "en";
 });
});

describe("test the rating functionalities", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test successful up vote in english", async () => {
  axios.put.mockResolvedValue(fixtures.mockResponse);

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const upButton = screen.getByText("outline-success");

  await act(async () => {
   fireEvent.click(upButton);
  });

  jest.advanceTimersByTime(1000);

  // Upvote button turned active, and the text changes.
  expect(screen.getByText(fixtures.thanksTextEn)).toBeInTheDocument();
  expect(screen.getByText("true-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 test("test successful down vote", async () => {
  axios.put.mockResolvedValue(fixtures.mockResponse);

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const downButton = screen.getByText("outline-danger");

  await act(async () => {
   fireEvent.click(downButton);
  });

  jest.advanceTimersByTime(1000);

  // Downvote button turned active, and the text changes.
  expect(screen.getByText(fixtures.thanksTextEn)).toBeInTheDocument();
  expect(screen.getByText("false-outline-success")).toBeInTheDocument();
  expect(screen.getByText("true-outline-danger")).toBeInTheDocument();
 });

 test("test successful up vote after down vote", async () => {
  axios.put.mockResolvedValue(fixtures.mockResponse);

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const upButton = screen.getByText("outline-success");
  const downButton = screen.getByText("outline-danger");

  await act(async () => {
   fireEvent.click(upButton);
   fireEvent.click(downButton);
  });

  jest.advanceTimersByTime(1000);

  // Upvote button turned active, and the text changes.
  expect(screen.getByText(fixtures.thanksTextEn)).toBeInTheDocument();
  expect(screen.getByText("false-outline-success")).toBeInTheDocument();
  expect(screen.getByText("true-outline-danger")).toBeInTheDocument();
 });

 test("test successful down vote after up vote", async () => {
  axios.put.mockResolvedValue(fixtures.mockResponse);

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const upButton = screen.getByText("outline-success");
  const downButton = screen.getByText("outline-danger");

  await act(async () => {
   fireEvent.click(downButton);
   fireEvent.click(upButton);
  });

  jest.advanceTimersByTime(1000);

  // Downvote button turned active, and the text changes.
  expect(screen.getByText(fixtures.thanksTextEn)).toBeInTheDocument();
  expect(screen.getByText("true-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 test("test successful undoing of up vote", async () => {
  axios.put.mockResolvedValue(fixtures.mockResponse);

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const upButton = screen.getByText("outline-success");

  await act(async () => {
   fireEvent.dblClick(upButton);
  });

  jest.advanceTimersByTime(1000);

  // Both buttons and text returned to default.
  expect(screen.getByText(fixtures.usefulTextEn)).toBeInTheDocument();
  expect(screen.getByText("false-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 test("test successful undoing of a down vote", async () => {
  axios.put.mockResolvedValue(fixtures.mockResponse);

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const downButton = screen.getByText("outline-danger");

  await act(async () => {
   fireEvent.dblClick(downButton);
  });

  jest.advanceTimersByTime(1000);

  // Both buttons and text returned to default.
  expect(screen.getByText(fixtures.usefulTextEn)).toBeInTheDocument();
  expect(screen.getByText("false-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 test("test errored REST response", async () => {
  axios.put.mockRejectedValueOnce(new Error("unknown"));

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const upButton = screen.getByText("outline-success");

  await act(async () => {
   fireEvent.click(upButton);
  });

  jest.advanceTimersByTime(1000);

  // Both buttons and text returned to default.
  expect(fixtures.mockContext.raiseError).toHaveBeenCalledTimes(1);
  expect(screen.getByText(fixtures.usefulTextEn)).toBeInTheDocument();
  expect(screen.getByText("false-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 test("test successful up vote in spanish", async () => {
  fixtures.mockContext.language = "es";

  axios.put.mockResolvedValue(fixtures.mockResponse);

  render(
   <Question
    qId={fixtures.mockQuestion.id}
    question="Test Question"
    answer="Test Answer"
   />
  );

  const upButton = screen.getByText("outline-success");

  await act(async () => {
   fireEvent.click(upButton);
  });

  jest.advanceTimersByTime(1000);

  // Upvote button turned active, and the text changes.
  expect(screen.getByText(fixtures.thanksTextEs)).toBeInTheDocument();
  expect(screen.getByText("true-outline-success")).toBeInTheDocument();
  expect(screen.getByText("false-outline-danger")).toBeInTheDocument();
 });

 afterAll(() => {
  fixtures.mockContext.language = "en";
 });
});
