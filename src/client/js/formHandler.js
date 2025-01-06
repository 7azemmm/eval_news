import { isValidUrl } from "./urlChecker";

function initializeFormHandler() {
  const form = document.getElementById("urlForm");
  if (!form) {
    console.error("Form element 'urlForm' not found");
    return;
  }

  form.addEventListener("submit", handleSubmit);

  const urlInput = document.getElementById("name");
  if (urlInput) {
    urlInput.addEventListener("blur", validateInput);
  }
}

function validateInput(event) {
  const input = event.target;
  const url = input.value.trim();

  if (url && !isValidUrl(url)) {
    input.classList.add("invalid");
    showError("Please enter a valid URL");
  } else {
    input.classList.remove("invalid");
    clearError();
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const urlInput = document.getElementById("name");
  if (!urlInput) {
    console.error("URL input element not found");
    return;
  }

  const url = urlInput.value.trim();

  if (!url) {
    showError("Please enter a URL");
    return;
  }

  if (!isValidUrl(url)) {
    showError("Please enter a valid URL");
    return;
  }

  clearError();
  sendUrlToServer(url);
}

async function sendUrlToServer(url) {
  try {
    showLoading();

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text :url }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error("Request failed:", error);
    showError(getErrorMessage(error));
  } finally {
    hideLoading();
  }
}

function updateUI(data) {
  const resultDiv = document.getElementById("results");
  if (!resultDiv) {
    console.error("Results container not found");
    return;
  }

  const entities = data.entities?.map(e => e.entityId).join(", ") || "None";
  const topics = data.topics?.map(t => t.label).join(", ") || "None";
  const summary = data.summary || "N/A";

  resultDiv.innerHTML = `
    <h3>Analysis Results:</h3>
    <div class="result-item">
      <h4>Entities:</h4>
      <p>${entities}</p>
    </div>
    <div class="result-item">
      <h4>Topics:</h4>
      <p>${topics}</p>
    </div>
    <div class="result-item">
      <h4>Summary:</h4>
      <p>${summary}</p>
    </div>
  `;
}

function showError(message) {
  const errorDiv = document.getElementById("error-message") || createErrorElement();
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

function clearError() {
  const errorDiv = document.getElementById("error-message");
  if (errorDiv) {
    errorDiv.style.display = "none";
  }
}

function createErrorElement() {
  const errorDiv = document.createElement("div");
  errorDiv.id = "error-message";
  errorDiv.className = "error-message";
  document.getElementById("urlForm").appendChild(errorDiv);
  return errorDiv;
}

function showLoading() {
  const button = document.querySelector("#urlForm button[type='submit']");
  if (button) {
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Analyzing...';
  }
}

function hideLoading() {
  const button = document.querySelector("#urlForm button[type='submit']");
  if (button) {
    button.disabled = false;
    button.textContent = "Analyze URL";
  }
}

function getErrorMessage(error) {
  if (error.message.includes("404")) {
    return "Endpoint not found. Ensure the backend is correctly configured.";
  }
  if (error.message.includes("Server is not responding")) {
    return "Server connection failed. Verify that the backend server is running.";
  }
  return "An unexpected error occurred. Please try again later.";
}

export { handleSubmit, initializeFormHandler };
