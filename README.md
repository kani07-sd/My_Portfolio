# Kanishka Premium AI Portfolio — Python Edition

This is the Python/Flask version of the supplied portfolio. The original `index.html`,
`styles.css`, `app.js`, and `assets/` are preserved so the page design and existing
browser interactions remain the same. Python/Flask replaces the original Node.js server.

## Run in VS Code

1. Extract this ZIP file.
2. Open the extracted `Kanishka_Python_Portfolio` folder in VS Code.
3. Open the VS Code terminal (**Terminal → New Terminal**).
4. Create and activate a virtual environment (recommended):

   **Windows**
   ```powershell
   py -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

   **macOS / Linux**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

5. Install the Python dependency:
   ```bash
   pip install -r requirements.txt
   ```
6. Start the website:
   ```bash
   python app.py
   ```
7. Open **http://127.0.0.1:5000** in your browser.

### Windows quick start

You can alternatively double-click `run_windows.bat`. It creates a virtual environment
if needed, installs Flask, and starts the site.

## Project files

- `app.py` — Python Flask server and API routes
- `index.html` — portfolio page
- `styles.css` — original responsive styling
- `app.js` — original browser-side interactions and editable portfolio content
- `assets/` — original favicon and profile placeholder
- `requirements.txt` — Python dependencies

## Editing the portfolio

Use the existing **Edit portfolio** control on the page. For permanent default content
changes, edit the `DEFAULT_CONTENT`, `PROJECTS`, `CERTIFICATES`, `SKILLS`, and `INTERESTS`
data near the top of `app.js`. Browser edits are stored in that browser's local storage;
they do not automatically update the source files or sync to other devices.

## AI talking avatar

The existing welcome voice preview uses the browser's speech engine. It is not lip-synced.
To show a real talking avatar, upload a generated MP4/WebM through Edit Portfolio.
A provider-backed generation endpoint is only a scaffold: no provider credentials or
provider-specific API adapter were supplied with the original project.

## Notes

- This project uses Python for its local web server, while JavaScript remains in the
  browser for the original page's interactive features. HTML/CSS alone cannot replace
  those browser interactions without rewriting them.
- Do not put private API keys in frontend files.
