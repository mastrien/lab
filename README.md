# Labs & Experimental Projects Hub 🧪

Welcome to my experimental playground! This repository serves as a centralized hub for web prototypes, tools, and experimental projects built during my learning journey and development sessions.

## 🚀 Projects

### 1. ENEM API Explorer
An interactive web application designed to help Brazilian students study for the ENEM (Exame Nacional do Ensino Médio). 

- **Purpose:** Provide a clean, fast interface to browse and solve historical exam questions.
- **Key Features:**
    - **Randomized Discovery:** Search for random questions by year or specific knowledge areas (Math, Sciences, etc.).
    - **Progress Tracking:** Saves your results (Correct/Incorrect) to your browser's `localStorage`.
    - **Interactive Feedback:** Reveal correct answers and track your overall performance stats in real-time.
    - **Native Integration:** Built with Vanilla JS and Tailwind CSS for a lightweight, responsive experience.
- **API:** Powered by the community-driven [enem.dev API](https://enem.dev).

### 2. MathGen - Treino de Cálculo e Álgebra
An interactive training tool designed to help students practice calculus and algebra through procedurally generated problems.

- **Purpose:** Provide a lightweight, focused environment for repetitive practice of mathematical operations.
- **Key Features:**
    - **Procedural Generation:** Dynamically generates problems, ensuring a fresh challenge every time (e.g., polynomial derivatives).
    - **High-Quality Rendering:** Uses KaTeX for professional-grade mathematical notation.
    - **Interactive Practice:** Built with React to provide immediate feedback and a smooth user experience.
    - **Modern Aesthetics:** Styled with Tailwind CSS and Phosphor Icons for a clean, distraction-free interface.

### 3. Banco Imobiliário - Maquininha Digital
Digital credit card machine for Monopoly-style board games, replacing physical money with a fast web interface.

- **Purpose:** Simplify money management during board games with digital transactions and persistence.
- **Key Features:**
    - **Player Management:** Create cards with custom names and colors.
    - **Digital Transactions:** Easy "Receive" and "Pay" buttons, plus direct transfers between players.
    - **Data Persistence:** Automatically saves game state to `localStorage`.
    - **Responsive Design:** Optimized for mobile devices to be used at the table.
    - **Dark Mode:** Support for both light and dark themes.
### 4. Hub de Jogos de Navegador
A premium, interactive web portal that gathers the best daily mini-games, logic puzzles, and trivia games of the web.

- **Purpose:** Serve as a clean, centralized playground for daily games with tools to search, filter, and customize the experience.
- **Key Features:**
    - **Curated Database:** Pre-configured list of 20 highly addictive games (Wordle, GeoGuessr, Conexo, dialed.gg suite, and more).
    - **Advanced Tag Filters:** Instantly search by title/description or filter by tags (Geral vs. specific Niches like Frieren, League of Legends, and English games).
    - **Favoriting & Hiding:** Mark your favorite games or archive/hide games you don't play. Housed in a collapsible drawer at the bottom of the page.
    - **Random Selector:** Clicking the "Tô Sem Ideia" button dynamically picks, scrolls to, and flashes a random game for you.
    - **Data Persistence:** Keeps all favorited, hidden, and theme states saved locally via `localStorage`.
    - **Theme Toggle:** Fully responsive layout with smooth transitions between light and dark modes.

### 5. Arkeynist - Typing Reader
A premium, interactive reading experience that transforms any long text into a speed-typing game, boosting focus and WPM.

- **Purpose:** Transform the passive act of reading into an active, physically engaging experience with real-time feedback.
- **Key Features:**
    - **Local File Import:** Upload TXT files to train on your own texts, books, or articles.
    - **Advanced Typing Engine:** Real-time calculation of WPM (Words Per Minute), CPM, and Accuracy with sliding window stats.
    - **Multiple Display Modes:** Choose between Paginated mode or Autoscroll (a butter-smooth infinite scrolling line).
    - **Deep Customization:** Configure font size, family, punctuation/accent sensitivity, and performance tweaks.
    - **Local Persistence:** Everything is saved locally via IndexedDB (Dexie.js), ensuring complete privacy.

### 6. League Whiteboard
An interactive drafting and itemization planning tool for League of Legends designed to help players analyze build costs, simulate stats, and sketch map strategies.

- **Purpose:** Serve as a client-side whiteboard for LoL theorycrafting, item builds, runes, and strategic plays without server-side overhead.
- **Key Features:**
    - **Interactive Scoreboard:** Draft teams, assign champions, select item builds, and automatically calculate total build costs.
    - **Build Comparator:** Compare multiple item sets side-by-side to analyze stat improvements, gold efficiency, and scaling.
    - **Stats & Damage Simulator:** Calculate effective damage after armor/magic resistance reductions, model tenacity effects on crowd control duration, and convert Ability Haste to Cooldown Reduction (CDR).
    - **Runes Planner:** Interactive runes selector supporting saved pages, local persistence (localStorage), and a clean reading/viewing mode.
    - **Strategic Map:** Drag, zoom, and place strategic pings, wards, or champion tokens on a high-fidelity Summoner's Rift map canvas.
    - **Local Persistence & Portability:** Import and export your drafted boards as JSON files, and save rune presets to your browser.
    - **Aesthetics & Internationalization:** Vibrant responsive UI with full light/dark theme toggling, custom tooltip overlays, and English/Portuguese translations.

---

## ⏳ Pending Ideas

---

## 🛠️ Environment Info
This project is actively maintained and developed within a **Termux** environment on Android. You can find detailed technical specs of the development environment in [environment.md](./environment.md).

## 🌐 Live Access
The hub is automatically deployed via GitHub Pages. Access the live experiments here:
**[https://mastrien.github.io/lab/](https://mastrien.github.io/lab/)**

---
*Created with ❤️ in a mobile terminal.*
