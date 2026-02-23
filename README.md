# PLANORA - AI Travel Planner

PLANORA is an AI-powered travel planning application that generates personalized travel itineraries based on your destination, budget, trip duration, and group size. It uses **Google Gemini AI** to create detailed day-by-day plans with hotel recommendations, attractions, and cost estimates.

## Tech Stack

| Layer       | Technology                                                  |
|-------------|-------------------------------------------------------------|
| Framework   | React 18 + Vite 5                                           |
| Styling     | Tailwind CSS 3 + shadcn/ui + Radix UI                      |
| Routing     | React Router DOM v6                                         |
| AI          | Google Generative AI (Gemini 1.5 Flash)                     |
| Location    | Geoapify Geocoder Autocomplete                              |
| Icons       | Lucide React                                                |
| Toasts      | Sonner                                                      |

## Project Structure

```
PLANORA/
├── public/                         # Static assets (logo, favicon)
├── src/
│   ├── assets/                     # App assets
│   ├── components/
│   │   └── ui/
│   │       ├── custom/
│   │       │   ├── Header.jsx      # App header with logo and sign-in button
│   │       │   └── Hero.jsx        # Landing page hero section
│   │       ├── button.jsx          # shadcn button component
│   │       ├── input.jsx           # shadcn input component
│   │       └── sonner.jsx          # Toast notifications
│   ├── constants/
│   │   └── options.jsx             # Budget options, traveler options, AI prompt template
│   ├── create-trip/
│   │   └── index.jsx               # Trip creation form (destination, days, budget, travelers)
│   ├── lib/
│   │   └── utils.js                # Utility functions (cn helper)
│   ├── service/
│   │   └── AIMODEL.jsx             # Google Gemini AI configuration and chat session
│   ├── App.jsx                     # Root component (renders Hero)
│   ├── App.css                     # App-level styles
│   ├── index.css                   # Global styles + Tailwind directives + CSS variables
│   └── main.jsx                    # Entry point with React Router setup
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── components.json                 # shadcn/ui configuration
├── package.json                    # Dependencies and scripts
└── .env.local                      # Environment variables (not committed to git)
```

## Features

- **Destination Search** - Autocomplete-powered location search via Geoapify
- **Trip Duration** - Configurable trip length (1-7 days)
- **Budget Selection** - Choose between Cheap, Moderate, or Luxury budgets
- **Group Size** - Solo, Couple, Family, or Friends travel options
- **AI Itinerary Generation** - Gemini AI generates detailed day-by-day plans with hotels, attractions, pricing (INR), and geo-coordinates in JSON format

## Prerequisites

- **Node.js** >= 18 (developed with v22.9.0)
- **npm** >= 9 (developed with v10.8.3)
- **React** 18.3.1 (installed via npm)
- **Vite** 5.4.x (installed via npm)
- A **Google Gemini AI** API key ([Get one here](https://aistudio.google.com/apikey))
- A **Geoapify** API key ([Get one here](https://myprojects.geoapify.com/register))

## Setup & Installation

1. **Install Node.js**

   Download and install Node.js (v18 or higher) from [https://nodejs.org/](https://nodejs.org/).
   Verify the installation:
   ```bash
   node -v    # should show v18.x.x or higher
   npm -v     # should show 9.x.x or higher
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/manish050994/PLANORA.git
   cd PLANORA
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**

   Create a `.env.local` file in the project root:
   ```env
   VITE_GOOGLE_GEMINI_AI_API_KEY=your_google_gemini_api_key_here
   VITE_GEOAPIFY_API_KEY=your_geoapify_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**

   Visit [http://localhost:5173](http://localhost:5173)

## API Keys Required

| Service              | Environment Variable                | Where to Get It                                              |
|----------------------|-------------------------------------|--------------------------------------------------------------|
| Google Gemini AI     | `VITE_GOOGLE_GEMINI_AI_API_KEY`     | [Google AI Studio](https://aistudio.google.com/apikey)       |
| Geoapify Geocoder    | `VITE_GEOAPIFY_API_KEY`             | [Geoapify Dashboard](https://myprojects.geoapify.com/)      |

## Available Scripts

| Command             | Description                         |
|---------------------|-------------------------------------|
| `npm run dev`       | Start Vite development server       |
| `npm run build`     | Build for production                |
| `npm run preview`   | Preview the production build        |
| `npm run lint`      | Run ESLint                          |

## How It Works

1. User enters a **destination** (autocompleted via Geoapify)
2. User selects **number of days**, **budget**, and **group size**
3. On clicking "Generate Trip", the app constructs an AI prompt with the user's preferences
4. **Google Gemini 1.5 Flash** generates a complete travel plan in JSON format including:
   - Hotel recommendations with names, addresses, prices, ratings
   - Day-by-day itinerary with places, timings, ticket prices
   - Geo-coordinates for all locations
   - All costs displayed in INR

## Deployment

The app can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

## License

This project is open source.
