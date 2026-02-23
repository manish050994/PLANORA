import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options.jsx";
import { SelectTravelersList } from "@/constants/options.jsx";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/service/AIMODEL";
import { toast } from "sonner";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState(null);

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && Number(value) > 7) {
      toast.error("Please enter a trip duration of 7 days or less.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceSelect = (value) => {
    handleInputChange("location", value?.properties?.formatted);
  };

  const OnGenerateTrip = async () => {
    // Validate all required fields
    if (!formData?.location) {
      toast.error("Please select a destination.");
      return;
    }
    if (!formData?.noOfDays || Number(formData.noOfDays) < 1) {
      toast.error("Please enter the number of days (1-7).");
      return;
    }
    if (Number(formData.noOfDays) > 7) {
      toast.error("Trip duration cannot exceed 7 days.");
      return;
    }
    if (!formData?.budget) {
      toast.error("Please select a budget.");
      return;
    }
    if (!formData?.people) {
      toast.error("Please select the number of travelers.");
      return;
    }

    setLoading(true);
    setTripData(null);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location)
      .replace("{noOfDays}", formData.noOfDays)
      .replace("{people}", formData.people)
      .replace("{budget}", formData.budget)
      .replace("{noOfDays}", formData.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      const parsedData = JSON.parse(responseText);
      setTripData(parsedData);
      toast.success("Trip generated successfully!");
    } catch (error) {
      console.error("Error generating trip:", error);
      const msg = error?.message || "";
      if (msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED")) {
        toast.error("API rate limit exceeded. Please wait a minute and try again.");
      } else if (msg.includes("404") || msg.includes("not found")) {
        toast.error("AI model not found. Please check the model configuration.");
      } else {
        toast.error("Failed to generate trip. Please check your API key and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ml-20">
      <h2 className="font-bold text-3xl"> Tell Us Your Travel Preference </h2>
      <p className="mt-4 text-gray-400 text-xl">
        Just provide us with details of your budget and days and then wait for
        us to curate the best travel itinerary for you.
      </p>

      <div>
        <div className="mt-10 flex flex-col">
          <h2 className="text-xl my-3 font-medium">
            What is your destination 🌎
          </h2>
          <div className="">
            <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter address here"
                placeSelect={(value) => handlePlaceSelect(value)}
              />
            </GeoapifyContext>
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 mt-5 font-medium">
            How many days trip are you planning? 🏕️
          </h2>
          <Input
            placeholder=" e.g. 3 days"
            type="number"
            min="1"
            max="7"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 mt-7 font-medium">
            Choose your specific budget for the trip
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-7">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer
                rounded-lg hover:shadow-md
                ${formData?.budget === item.title && "shadow-lg border-black"}
                `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600 mt-4">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 mt-7 font-medium">
            Choose the total number of persons going on the trip
          </h2>
          <div className="grid grid-cols-4 gap-7 mt-7">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("people", item.people)}
                className={`p-4 border cursor-pointer
                  rounded-lg hover:shadow-md
                  ${
                    formData?.people === item.people && "shadow-lg border-black"
                  }
                  `}
              >
                <h2 className="text-4xl text-center ">{item.icon}</h2>
                <h2 className="font-bold text-lg text-center">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-600 mt-4">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? "Generating Trip..." : "Generate Trip"}
        </Button>
      </div>

      {/* Display generated trip results */}
      {tripData && (
        <div className="mb-20">
          <h2 className="font-bold text-2xl mb-6">Your Trip Plan</h2>

          {/* Hotels Section */}
          {tripData.hotels && tripData.hotels.length > 0 && (
            <div className="mb-10">
              <h3 className="font-bold text-xl mb-4">Hotel Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {tripData.hotels.map((hotel, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md">
                    <h4 className="font-bold text-lg">{hotel.hotelName}</h4>
                    <p className="text-gray-600 text-sm mt-1">{hotel.hotelAddress}</p>
                    <p className="text-green-600 font-medium mt-2">{hotel.price}</p>
                    <p className="text-yellow-600 text-sm">{hotel.rating}</p>
                    <p className="text-gray-500 text-sm mt-2">{hotel.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary Section */}
          {tripData.itinerary && tripData.itinerary.length > 0 && (
            <div>
              <h3 className="font-bold text-xl mb-4">Day-by-Day Itinerary</h3>
              {tripData.itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-8">
                  <h4 className="font-bold text-lg mb-3 text-[#f56551]">
                    Day {day.day}
                  </h4>
                  <div className="space-y-4">
                    {day.plan.map((activity, actIndex) => (
                      <div key={actIndex} className="border rounded-lg p-4 hover:shadow-sm">
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold">{activity.placeName}</h5>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{activity.placeDetails}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-green-600">Ticket: {activity.ticketPricing}</span>
                          <span className="text-blue-600">Travel: {activity.timeToTravel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateTrip;
