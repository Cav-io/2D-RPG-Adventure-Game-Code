# 2D RPG Adventure Game (A-Level Computer Science NEA)

This is my **Non-Exam Assessment (NEA) project** for A-Level Computer Science. It is a 2D browser-based RPG game written in **HTML**, **CSS**, and **JavaScript**, featuring a tile-based world, sprite movement, and basic game mechanics.

The goal was to demonstrate key principles of software development including planning, design, implementation, and testing, while also creating a playable and engaging product.

---

## 📌 Project Aims

- Develop a functional and interactive 2D RPG game.
- Demonstrate proficiency in JavaScript and DOM manipulation.
- Use a modular and maintainable codebase.

---

## 🎮 Features Implemented

- 👾 Player character movement with keyboard input
- 🧱 Collision detection with world boundaries and obstacles
- 🗺️ Tile-based map rendering using 2D arrays
- 🌐 Built to run in modern web browsers
- 💾 Designed to be lightweight and easily testable

## ▶️ How to Run

You no longer need the VS Code "Live Server" extension. Pick any one option:

**Option 1 – Just open it (easiest)**
Double-click `index.html` (or drag it into Chrome / Edge / Firefox). That's it.

**Option 2 – Node.js** (if you have Node installed)
```bash
npm start
```
Then open http://localhost:8000

**Option 3 – Python** (if you have Python installed)
```bash
python -m http.server 8000
```
Then open http://localhost:8000

**Option 4 – Play online with GitHub Pages**
On GitHub go to *Settings → Pages*, set the source to the `main` branch (root folder) and save. The game will be live at `https://<your-username>.github.io/<repo-name>/`.

### Controls
| Key | Action |
| --- | --- |
| Arrow keys / WASD | Move |
| Left Shift (hold) | Run |
| Enter | Talk to the NPC you are facing |

### Editing maps
The collision data and font are bundled into `Maps/collisionData.js` and `fonts.css` so the game works when opened directly from a file. If you change a `Maps/*/collision.json` file (or the font), regenerate them with:
```bash
npm run build
```

---

## 📄 Full NEA Documentation

You can find the complete 300-page project write-up here:

👉 [View NEA_Documentation.pdf](docs/NEA_documentation.pdf)

