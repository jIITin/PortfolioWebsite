Jitin's Portfolio
A sleek, animated portfolio website showcasing Jitin's resume, built with HTML, CSS, JavaScript, and Tailwind CSS, inspired by Linear.app.
Project Structure
jitin-portfolio/
├── static/
│   ├── index.html
│   ├── styles.css
│   ├── scripts.js
├── main.go (optional)
├── go.mod (optional)
└── README.md

Local Development

Static Site:

Place index.html, styles.css, and scripts.js in the static directory.
Serve using a local server (e.g., python -m http.server 8000 in the static directory).
Access at http://localhost:8000.


With Go Backend (optional):

Ensure Go is installed (https://golang.org/dl/).
Run go mod init portfolio to initialize the module.
Run go run main.go to start the server.
Access at http://localhost:8080.



Deploy to Netlify

Prepare Files:

Ensure index.html, styles.css, and scripts.js are in the static directory.
The Go backend is not needed for Netlify, as it supports static sites.


Push to GitHub:

Initialize a Git repository: git init.
Add files: git add ..
Commit: git commit -m "Initial commit".
Create a GitHub repository and push: git remote add origin <repo-url> and git push origin main.


Deploy on Netlify:

Sign up/log in at https://app.netlify.com.
Click "New site from Git" and connect to your GitHub repository.
Set the build settings:
Build command: Leave blank (no build step needed).
Publish directory: static.


Deploy the site. Netlify will provide a URL (e.g., https://jitin.netlify.app).


Custom Domain (optional):

In Netlify, go to "Domain settings" and add a custom domain if you have one.
Update DNS settings with your domain registrar.



Troubleshooting

Content not showing: Check browser console (F12 > Console) for errors. Ensure Tailwind CSS CDN is accessible.
Deployment issues: Verify the publish directory is set to static in Netlify.
Animations: CSS animations are applied on load. Ensure scripts.js is loaded.

© 2025 Jitin