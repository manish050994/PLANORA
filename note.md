# Project Analysis - PLANORA

## Overview

**PLANORA** is an AI-powered travel planner built with **React 18 + Vite 5**. Users enter a destination, trip duration, budget, and group size, and **Google Gemini 1.5 Flash** generates a complete JSON itinerary with hotels, day-by-day plans, and costs in INR.

## Tech Stack

| Layer       | Technology                                     |
|-------------|------------------------------------------------|
| Framework   | React 18 + Vite 5                              |
| Styling     | Tailwind CSS 3 + shadcn/ui + Radix UI          |
| Routing     | React Router DOM v6                            |
| AI          | Google Generative AI (Gemini 1.5 Flash)        |
| Location    | Geoapify Geocoder Autocomplete                 |
| Icons       | Lucide React                                   |
| Toasts      | Sonner                                         |

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

## Key Files

| File                              | Purpose                                                  |
|-----------------------------------|----------------------------------------------------------|
| src/main.jsx                      | Entry point + React Router setup                         |
| src/App.jsx                       | Root component, renders Hero                             |
| src/components/ui/custom/Hero.jsx | Landing page hero section                                |
| src/components/ui/custom/Header.jsx | App header with logo                                   |
| src/create-trip/index.jsx         | Trip creation form (destination, days, budget, travelers)|
| src/service/AIMODEL.jsx           | Google Gemini AI config + chat session                   |
| src/constants/options.jsx         | Constants: budget options, traveler options, AI prompt    |

## API Keys Required

| Variable                          | Service              | Where to Get It                                         |
|-----------------------------------|----------------------|---------------------------------------------------------|
| VITE_GOOGLE_GEMINI_AI_API_KEY     | Google Gemini AI     | https://aistudio.google.com/apikey                      |
| VITE_GEOAPIFY_API_KEY             | Geoapify Geocoder    | https://myprojects.geoapify.com/                        |

Both keys must be set in the `.env.local` file in the project root.

## Features

- **Destination Search** - Autocomplete-powered location search via Geoapify
- **Trip Duration** - Configurable trip length (1-7 days)
- **Budget Selection** - Choose between Cheap, Moderate, or Luxury budgets
- **Group Size** - Solo, Couple, Family, or Friends travel options
- **AI Itinerary Generation** - Gemini AI generates detailed day-by-day plans with hotels, attractions, pricing (INR), and geo-coordinates in JSON format

## How It Works

1. User enters a **destination** (autocompleted via Geoapify)
2. User selects **number of days**, **budget**, and **group size**
3. On clicking "Generate Trip", the app constructs an AI prompt with the user's preferences
4. **Google Gemini 1.5 Flash** generates a complete travel plan in JSON format including:
   - Hotel recommendations with names, addresses, prices, ratings
   - Day-by-day itinerary with places, timings, ticket prices
   - Geo-coordinates for all locations
   - All costs displayed in INR

## Fixes Applied

1. **Moved hardcoded Geoapify API key** from `src/create-trip/index.jsx` to environment variable `VITE_GEOAPIFY_API_KEY`
2. **Fixed router basename** in `src/main.jsx` — was hardcoded to `/PLANORA` (for GitHub Pages), now uses `import.meta.env.BASE_URL` so it works both locally and in production
3. **Created `.env.local`** with placeholder API keys
4. **Updated README.md** with full project documentation

## Available Scripts

| Command           | Description                   |
|-------------------|-------------------------------|
| npm run dev       | Start Vite development server |
| npm run build     | Build for production          |
| npm run preview   | Preview the production build  |
| npm run lint      | Run ESLint                    |

## Deployment

The app can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).
