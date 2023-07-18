import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";

import axios from "axios";

import FAQPage from "../../FAQPage";

jest.useFakeTimers();

jest.mock("axios");

const mockContext = {
 token: "testToken",
 language: "en",
 popLoading: jest.fn(),
 raiseError: jest.fn(),
};

const mockResponse = {
 status: 200,
 data: {
  faqs: [
   {
    id: 1,
    en: {
     question: "Question 1",
     answer: "Answer 1",
    },
    es: {
     question: "Pregunta 1",
     answer: "Respuesta 1",
    },
   },
   {
    id: 2,
    en: {
     question: "Question 2",
     answer: "Answer 2",
    },
    es: {
     question: "Pregunta 2",
     answer: "Respuesta 2",
    },
   },
  ],
 },
};

function mockQuestion(props){
 return (
  <div>
   <span>{props.question}</span>
   <span>{props.answer}</span>
  </div>
 );
};

jest.mock("../../../components/misc/Question", () => mockQuestion);

describe("test page render", () => {
 beforeEach(() => {
  jest.spyOn(React, "useContext").mockImplementation(() => mockContext);
 });
 test("test page render", async () => {
  axios.get.mockResolvedValue(mockResponse);

  await act(async () => {
   render(<FAQPage />);
  });

  jest.advanceTimersByTime(1000);
  expect(screen.getByText(/Question 1/)).toBeInTheDocument();
  expect(screen.getByText(/Answer 1/)).toBeInTheDocument();
  expect(screen.getByText(/Question 2/)).toBeInTheDocument();
  expect(screen.getByText(/Answer 2/)).toBeInTheDocument();
 });
});
