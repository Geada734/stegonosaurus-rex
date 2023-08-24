// Unit tests for the navigation bar at the top of the page.
import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as fixtures from "../fixtures/navigationFixtures";
import Navigation from "../../Navigation";

import constants from "../../../static/constants";

function mockDropdown({ onSelect }) {
 return (
  <div>
   <select onChange={(e) => onSelect(e.target.value)}>
    <option value="en">en</option>
    <option value="es">es</option>
   </select>
  </div>
 );
}

jest.useFakeTimers();

jest.mock("react-bootstrap/NavDropdown", () => mockDropdown);

describe("Navbar rendering tests.", () => {
 beforeEach(() => {
  jest
   .spyOn(React, "useContext")
   .mockImplementation(() => fixtures.mockContext);
 });

 test("test rendering of all components in the nav bar.", () => {
  render(<Navigation />);

  const userLang = localStorage.getItem(constants.localValues.language);

  expect(userLang).toEqual(null);
  expect(screen.getByAltText(fixtures.logoAltText)).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toBeInTheDocument();

  fixtures.navLinks.forEach((navLink) => {
   expect(screen.getByText(navLink)).toBeInTheDocument();
  });
 });

 test("test choosing a language.", async () => {
  render(<Navigation />);

  const dropdown = screen.getByRole("combobox");

  await act(async () => {
   userEvent.selectOptions(dropdown, "es");
  });

  jest.advanceTimersByTime(1000);

  const userLang = localStorage.getItem(constants.localValues.language);

  expect(fixtures.mockContext.changeLanguage).toHaveBeenCalledWith("es");
  expect(userLang).toEqual("es");
 });

 afterAll(() => {
  localStorage.removeItem(constants.localValues.language);
 });
});
