// Unit tests for the appwide API.
const axios = require("axios");

const fixtures = require("../fixtures/appApiFixtures");
const appApi = require("../../appApi");

jest.mock("axios");

describe("token API test", () => {
    test("successfull call to appwide API", () => {
        axios.get.mockResolvedValue(fixtures.successfulResponse);

        appApi.getToken(fixtures.mockHandleToken, fixtures.mockHandleError);

        new Promise(resolve => setTimeout(resolve)).then(() => {
            expect(mockHandleToken).toHaveBeenCalledWith("testToken");
        });
    });
    test("errored call to appwide API", () => {
        axios.get.mockRejectedValueOnce();

        appApi.getToken(fixtures.mockHandleToken, fixtures.mockHandleError);

        new Promise(resolve => setTimeout(resolve)).then(() => {
            expect(mockHandleError).toHaveBeenCalledTimes(1);
        });
    });
}) ; 