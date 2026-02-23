import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a travel planning assistant. When given a destination, number of days, group size, and budget, generate a detailed travel plan in JSON format. Include a hotels array with hotelName, hotelAddress, price, hotelImageURL, geoCoordinates, rating, and description. Include an itinerary array with each day containing a plan array with time, placeName, placeDetails, placeImageURL, geoCoordinates, ticketPricing, and timeToTravel. Show all costs in INR.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});
