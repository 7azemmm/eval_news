const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 8000;
const TEXT_RAZOR_API_URL = "http://api.textrazor.com";
const TEXT_RAZOR_API_KEY = process.env.API_KEY || "a70ce9b2bf0c236f776f92cb00391080c2a9dc2fcde60274668f538c";

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../../dist")));

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});


async function analyzeTextWithTextRazor(url) {
  const response = await fetch(TEXT_RAZOR_API_URL, {
      method: "POST",
      headers: {
          "x-textrazor-key": TEXT_RAZOR_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
          extractors: "entities,topics,phrases",
          url: url, 
      }),
  });

  if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`API error: ${response.statusText} - ${errorDetails}`);
  }

  return response.json();
}

// API endpoint
app.post("/api/analyze", async (req, res) => {
  try {
      console.log(req.body)
      const { url } = req.body; 

      if (!url) {
          return res.status(400).json({ error: "The 'url' field is required" });
      }

      console.log("Analyzing URL:", url);

      const data = await analyzeTextWithTextRazor(url);
      res.status(200).json(data);
  } catch (error) {
      console.error("Error calling TextRazor API:", error.message);
      res.status(500).json({
          error: "Failed to analyze the URL. Please try again later.",
          details: error.message,
      });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
