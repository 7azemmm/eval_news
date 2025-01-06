// Function to check if a URL is valid
function isValidUrl(string) {
  try {
    new URL(string); // This will throw if the string is not a valid URL
    return true;
  } catch (_) {
    return false;
  }
}
// Export the function
export { isValidUrl };
