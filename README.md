# 🏴‍☠️ Pirate Chat PWA

> "The seas be quiet today... Cast a line to wake the Captain!"

A real-time Progressive Web App (PWA) where you chat with a salty pirate captain. Built with a modern React stack, this app features a unique "old world" aesthetic, real-time message syncing, and AI-powered pirate translations.

![Pirate Chat Interface](public/icon.svg)

## ⚓ Features

*   **Real-time Chat:** Messages sync instantly between devices.
*   **AI Pirate Translator:** Your messages are translated into authentic pirate speak by Google Gemini AI.
*   **Immersive UI:**
    *   Dark wood and parchment aesthetic.
    *   Torn paper message bubbles with random organic rotations.
    *   Animated "scribbling" typing indicator.
    *   Floating dust and vignette atmospheric effects.
*   **PWA Ready:** Installable on mobile devices with a custom icon and manifest.
*   **Responsive:** Works beautifully on desktop (The Captain's Table) and mobile (The Captain's Log).

## 🗺️ Tech Stack

*   **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (animations)
*   **Backend & DB:** [Convex](https://www.convex.dev/) (Real-time database & serverless functions)
*   **AI:** [Google Gemini API](https://ai.google.dev/) (via Convex Actions)
*   **PWA:** [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/)

## 🧭 Getting Started

### Prerequisites

*   Node.js (v18+)
*   A Google Cloud Project with Gemini API enabled (API Key required)
*   A Convex account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/danielcimring/piratechat.git
    cd piratechat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Initialize Convex:**
    ```bash
    npx convex dev
    ```
    This will prompt you to log in and configure your Convex project.

4.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    # Automatically set by npx convex dev
    VITE_CONVEX_URL=your_convex_url_here

    # Your Google Gemini API Key
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

5.  **Set the API Key in Convex:**
    ```bash
    npx convex env set GEMINI_API_KEY your_gemini_api_key_here
    ```

6.  **Hoist the Sails (Run the App):**
    ```bash
    npm run dev
    ```

## 📜 License

MIT