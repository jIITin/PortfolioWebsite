# Jitin Kumar — Portfolio Website

A modern, animated developer portfolio built with HTML, TailwindCSS, and vanilla JavaScript, served by a minimal Go backend that exposes a `/api/resume` endpoint.

## Features
- Professional dark UI with gradients, glassmorphism cards, and scroll animations (AOS)
- Three.js animated particle background with safe fallbacks
- Responsive mobile navigation with smooth scrolling and active-section highlighting
- Role rotator in hero section
- Global image and background fallbacks to avoid broken images
- Download CV button that fetches resume JSON from `/api/resume`

## Project Structure
```
PortfolioWebsite/
├─ assets/
│  ├─ placeholder-avatar.svg
│  └─ placeholder-image.svg
├─ index.html
├─ styles.css
├─ scripts.js
├─ main.go
├─ go.mod
└─ README.md
```

## Prerequisites
- Go 1.20+ installed (for API server). Live Server (VS Code) optional for static serving.

## Running Locally

### Option 1: Go server (recommended)
This serves the frontend and the `/api/resume` API on the same origin.

1. From the project root, run:
   ```bash
   go run main.go
   ```
2. Open http://localhost:8080

### Option 2: Live Server (static only)
This will serve `index.html` but not the Go API. The current UI does not require the API except when clicking "Download CV".

1. Open `index.html` with Live Server.
2. If you want the Download CV button to work, also start the Go server (Option 1) and open the site via the Go server instead of Live Server, or configure CORS and use the full API URL.

## Notes
- Three.js gracefully disables if WebGL or helper utilities are missing.
- Image fallbacks ensure placeholders display when remote images fail.
- The API returns structured resume JSON; adjust `main.go` to change content.

## Deploy
For static hosting, you can deploy the HTML/CSS/JS to any static host. If you need `/api/resume`, deploy the Go server (e.g., Fly.io, Render, Railway) or serve a static `resume.json` and adjust the download logic to fetch it.