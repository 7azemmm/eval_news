// Import JavaScript files
import { handleSubmit } from "./js/formHandler";
import { isValidUrl } from "./js/urlChecker";

// Import SCSS files for styling
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

// Attach the handleSubmit function to the form submission
document.getElementById("urlForm").addEventListener("submit", handleSubmit);

if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'})
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}


// Export functions
export { handleSubmit, isValidUrl };
