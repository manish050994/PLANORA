# Project Analysis - PLANORA

## Overview

**PLANORA** is an AI-powered travel planner built with **React 18 + Vite 5**. Users enter a destination, trip duration, budget, and group size, and **Google Gemini 2.5 Flash** generates a complete JSON itinerary with hotels, day-by-day plans, and costs in INR.

## Tech Stack

| Layer       | Technology                                     |
|-------------|------------------------------------------------|
| Framework   | React 18 + Vite 5                              |
| Styling     | Tailwind CSS 3 + shadcn/ui + Radix UI          |
| Routing     | React Router DOM v6                            |
| AI          | Google Generative AI (Gemini 2.5 Flash)        |
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
| src/main.jsx                      | Entry point + React Router setup with Layout component   |
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

## Current Features

- **Destination Search** - Autocomplete-powered location search via Geoapify
- **Trip Duration** - Configurable trip length (1-7 days)
- **Budget Selection** - Choose between Cheap, Moderate, or Luxury budgets
- **Group Size** - Solo, Couple, Family, or Friends travel options
- **AI Itinerary Generation** - Gemini AI generates detailed day-by-day plans with hotels, attractions, pricing (INR), and geo-coordinates in JSON format
- **Trip Result Display** - Hotels and day-by-day itinerary rendered in the UI
- **Form Validation** - Toast error messages for missing/invalid fields
- **Loading State** - Button shows "Generating Trip..." while AI is processing

## How It Works

1. User enters a **destination** (autocompleted via Geoapify)
2. User selects **number of days**, **budget**, and **group size**
3. On clicking "Generate Trip", the app validates all fields and constructs an AI prompt
4. **Google Gemini 2.5 Flash** generates a complete travel plan in JSON format including:
   - Hotel recommendations with names, addresses, prices, ratings
   - Day-by-day itinerary with places, timings, ticket prices
   - Geo-coordinates for all locations
   - All costs displayed in INR
5. The result is parsed and displayed as hotel cards and a day-by-day itinerary

## Fixes Applied

1. **Moved hardcoded Geoapify API key** to environment variable `VITE_GEOAPIFY_API_KEY`
2. **Fixed router basename** — now uses `import.meta.env.BASE_URL` for local + production
3. **Fixed validation logic** — each field validated individually with toast errors
4. **Added loading state** — button disables and shows progress during AI call
5. **Added error handling** — try/catch with specific error messages (rate limit, model not found, etc.)
6. **Display trip results in UI** — hotels and itinerary rendered on the page
7. **Fixed Header outside RouterProvider** — moved into Layout component with Outlet
8. **Enabled Toaster** — toast notifications now work across the app
9. **Upgraded AI model** — from deprecated gemini-1.5-flash to gemini-2.5-flash
10. **Updated SDK** — @google/generative-ai upgraded to v0.24.1

## Available Scripts

| Command           | Description                   |
|-------------------|-------------------------------|
| npm run dev       | Start Vite development server |
| npm run build     | Build for production          |
| npm run preview   | Preview the production build  |
| npm run lint      | Run ESLint                    |

## Deployment

The app can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

---

## Future Plan & Roadmap

### Phase 1 — Core Enhancements (High Priority)

1. **User Authentication (Google OAuth)**
   - Add Google Sign-In using Firebase Auth or Supabase
   - The "Sign In" button in Header currently does nothing — wire it up
   - Gate trip generation behind authentication

2. **Save & View Past Trips**
   - Store generated trips in Firebase Firestore or Supabase
   - Add a "My Trips" page to view previously generated itineraries
   - Allow users to delete or regenerate saved trips

3. **Share Trip via Link**
   - Generate a unique shareable URL for each trip
   - Allow anyone with the link to view the itinerary (read-only)

4. **Print / Export to PDF**
   - Add a "Download PDF" button on the trip result page
   - Use a library like `react-to-print` or `jsPDF` to export the itinerary

### Phase 2 — UI/UX Improvements (Medium Priority)

5. **Dark Mode**
   - The project already has `next-themes` and Tailwind dark mode configured
   - Add a theme toggle button in the Header

6. **Responsive Design**
   - The current layout breaks on mobile (hardcoded `ml-20`, `mx-56`, `grid-cols-4`)
   - Make all pages fully responsive for mobile, tablet, and desktop

7. **Interactive Map View**
   - Display all itinerary locations on an interactive map (Leaflet or Google Maps)
   - Show hotel locations and daily route on the map
   - Geoapify already provides coordinates — use them

8. **Image Integration**
   - The AI returns `placeImageURL` and `hotelImageURL` but they are not displayed
   - Fetch real place photos using Google Places API or Unsplash API
   - Show images in hotel cards and itinerary items

9. **Loading Skeleton / Animation**
   - Replace "Generating Trip..." text with a skeleton loading animation
   - Add smooth transitions when trip results appear

### Phase 3 — Advanced Features (Lower Priority)

10. **Multi-Currency Support**
    - Currently hardcoded to INR — let users pick their currency
    - Use a currency conversion API for real-time rates

11. **Flight & Transport Suggestions**
    - Integrate a flights API (Skyscanner, Amadeus) to suggest flights to the destination
    - Show estimated transport costs between itinerary locations

12. **Weather Integration**
    - Show weather forecast for the destination during the selected travel dates
    - Use OpenWeatherMap or WeatherAPI

13. **Collaborative Trip Planning**
    - Allow multiple users to collaborate on the same trip
    - Real-time editing with WebSocket or Firebase Realtime Database

14. **AI Chat Follow-up**
    - After generating a trip, let users chat with the AI to modify it
    - "Replace day 2 with beach activities" or "Add more budget restaurants"
    - The Gemini chat session already supports follow-up messages

15. **Booking Integration**
    - Add links to book hotels directly (affiliate links to Booking.com, Agoda, etc.)
    - Add links to book attraction tickets

### Phase 4 — Production & DevOps

16. **Backend API Server**
    - Move AI API calls to a backend (Express/Node.js) to protect API keys
    - Currently API keys are exposed in the browser (Vite VITE_ prefix)
    - Add rate limiting and request validation on the server

17. **CI/CD Pipeline**
    - Set up GitHub Actions for automated build, lint, and deploy
    - Auto-deploy to Vercel or Netlify on push to main

18. **Testing**
    - Add unit tests with Vitest for utility functions and components
    - Add E2E tests with Playwright or Cypress for the full trip generation flow

19. **SEO & Performance**
    - Add meta tags, Open Graph tags for social sharing
    - Lazy load components and optimize bundle size
    - Consider SSR with Next.js for better SEO

20. **Analytics**
    - Add Google Analytics or Plausible to track user behavior
    - Monitor which destinations, budgets, and group sizes are most popular
