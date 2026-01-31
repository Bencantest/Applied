# Applied
A privacy-first Chrome Extension that uses AI  to build, tailor and export professional resumes and cover letters directly from your browser.
Applied is a local-first Chrome Extension designed to streamline the job application process. It combines a real-time document editor with generative AI to help users create highly tailored resumes and cover letters in seconds.

Unlike web-based builders that lock your data behind a login, Applied runs entirely in your browser using Chrome Storage, ensuring your personal information stays private.

# Key Features

 **Split-Screen Editor:** Edit your details on the left and see a live, print-ready A4 preview on the right.

 **AI Tailoring:** Paste a job description to automatically rewrite your resume summary, skills, and bullet points using the Groq API (Llama-3).

 **Cover Letter Generator:** Auto-generates persuasive cover letters that link your experience to specific job requirements.

 **Privacy-First:** No database required. All data is saved locally to chrome.storage.

 **PDF Export:** One-click download for formatted, ATS-friendly PDF documents.

 **Dynamic Sections:** easily add, remove, or reorder work experience, education, and certifications.

 # Tech Stack:
**Frontend:** HTML5, CSS3, Vanilla JavaScript

**Platform:** Chrome Extension Manifest V3

**AI Engine:** Groq API (Llama-3-70b)

**PDF Generation:** html2pdf.js

# Installation

*Clone this repository:* git clone https://github.com/yourusername/applied-resume-builder.git

Open Chrome and navigate to chrome://extensions/.

Toggle Developer Mode (top right corner).

Click Load Unpacked and select the folder where you cloned this repo.

Open the extension popup and navigate to Settings to add your free Groq API key.
