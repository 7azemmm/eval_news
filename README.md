# **Evaluate News NLP**

This project is a web-based tool that allows users to analyze articles and blogs using Natural Language Processing (NLP) techniques. It leverages the **TextRazor API** to classify content as **subjective** or **objective** and determine the tone as **positive**, **neutral**, or **negative**.

---

## **Table of Contents**
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
---

## **Features**
- Input a URL to analyze the content of an article or blog.
- NLP analysis determines:
  - **Polarity**: Whether the tone is positive, neutral, or negative.
  - **Subjectivity**: Whether the content is subjective (opinion) or objective (fact-based).
- Works offline with service workers.

---

## **Technologies**
This project uses the following technologies:
- **Frontend**: HTML5, CSS3 (SCSS), JavaScript (ES6+)
- **Backend**: Node.js, Express
- **API**: TextRazor API
- **Build Tool**: Webpack (with separate dev and prod configurations)
- **Offline Support**: Service Workers (via Workbox Webpack Plugin)
- **Testing**: Jest

---

## **Installation**

### **Prerequisites**
- Node.js (v14.x or later)
- npm (Node Package Manager)

### **Steps**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/evaluate-news-nlp.git
   cd evaluate-news-nlp

2. **install dependencies**:
   ```bash
   npm install
3. **run project**:
   ```bash
   npm run dev

4. **run server**:
open new terminal , navigate to src then server then run the server
   ```bash
   node index.js

