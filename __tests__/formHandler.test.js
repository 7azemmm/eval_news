// Import necessary functions
import {
  handleSubmit,
  initializeFormHandler,
} from "../src/client/js/formHandler";
import { isValidUrl } from "../src/client/js/urlChecker";

// Mock the isValidUrl function
jest.mock("../src/client/js/urlChecker", () => ({
  isValidUrl: jest.fn(),
}));

// Mock fetch API
global.fetch = jest.fn();

describe("handleSubmit", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" type="text" value="" />
        <div id="results"></div>
      </form>
    `;
    initializeFormHandler();
  });

  it("should alert if the URL is invalid", () => {
    // Mocking the isValidUrl function to return false
    isValidUrl.mockReturnValue(false);
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const event = { preventDefault: jest.fn() };
    document.getElementById("name").value = "invalid-url";

    handleSubmit(event);

    expect(isValidUrl).toHaveBeenCalledWith("invalid-url");
    expect(alertMock).toHaveBeenCalledWith("Please enter a valid URL.");
    expect(event.preventDefault).toHaveBeenCalled();

    alertMock.mockRestore();
  });

  it("should send the URL to the server if valid", async () => {
    // Mocking the isValidUrl function to return true
    isValidUrl.mockReturnValue(true);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ entities: [], topics: [], summary: "Test Summary" }),
    });

    const event = { preventDefault: jest.fn() };
    document.getElementById("name").value = "http://valid.url";

    await handleSubmit(event);

    expect(isValidUrl).toHaveBeenCalledWith("http://valid.url");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "http://valid.url" }),
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("should handle server errors gracefully", async () => {
    isValidUrl.mockReturnValue(true);
    fetch.mockRejectedValueOnce(new Error("Server error"));

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const event = { preventDefault: jest.fn() };
    document.getElementById("name").value = "http://valid.url";

    await handleSubmit(event);

    expect(isValidUrl).toHaveBeenCalledWith("http://valid.url");
    expect(fetch).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "There was an error processing your request. Please try again."
    );

    alertMock.mockRestore();
  });
});
