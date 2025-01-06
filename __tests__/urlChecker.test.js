// Import the function
import { isValidUrl } from "../src/client/js/urlChecker";

describe("isValidUrl", () => {
  it("should return true for a valid URL", () => {
    const validUrl = "https://www.google.com";
    expect(isValidUrl(validUrl)).toBe(true);
  });

  it("should return false for an invalid URL", () => {
    const invalidUrl = "not-a-valid-url";
    expect(isValidUrl(invalidUrl)).toBe(false);
  });

  it("should return true for a valid URL with query parameters", () => {
    const urlWithParams = "https://www.example.com?param1=value1&param2=value2";
    expect(isValidUrl(urlWithParams)).toBe(true);
  });

  it("should return false for an empty string", () => {
    const emptyString = "";
    expect(isValidUrl(emptyString)).toBe(false);
  });

  it("should return true for a URL with unusual formats (e.g., IP address)", () => {
    const ipUrl = "http://127.0.0.1";
    expect(isValidUrl(ipUrl)).toBe(true);
  });

  it("should return false for a string missing protocol", () => {
    const missingProtocol = "www.example.com";
    expect(isValidUrl(missingProtocol)).toBe(false);
  });
});
