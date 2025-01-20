import React, { useState } from 'react';
import { generateTravelPlan } from '../services/aiService';
import { useTravelStore } from '../store/travelStore';
import { Calendar, Users, MapPin, Plane } from 'lucide-react';

export function PlannerForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    origin: '',
    destination: '',
    transportMode: '',
    travelers: 1,
  });

  const { setCurrentPlan, addChatMessage } = useTravelStore();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const prompt = `Create a detailed travel plan for ${formData.travelers} people:
    - From: ${formData.origin}
    - To: ${formData.destination}
    - Travel Mode: ${formData.transportMode}
    - Dates: ${formData.startDate} to ${formData.endDate}

    Please provide the information in the following format:
    1. TRANSPORTATION OPTIONS:
    - Selected mode (${formData.transportMode}) details
    - Alternative transport options with estimated costs and duration

    2. RECOMMENDED PLACES TO VISIT:
    - List major attractions with brief descriptions
    - Historical monuments
    - Popular temples/religious sites
    - Local markets/shopping areas
    - Parks and recreational spots

    3. SUGGESTED ACTIVITIES:
    - Day-wise itinerary
    - Must-try local experiences
    - Food recommendations
    - Cultural activities

    4. ESTIMATED COSTS:
    - Transportation
    - Accommodation
    - Food and beverages
    - Activities and entrance fees
    - Miscellaneous expenses

    5. TRAVEL TIPS:
    - Best time to visit each attraction
    - Local customs and etiquette
    - Safety precautions
    - Required documents/permits`;

    try {
      const response = await generateTravelPlan(prompt);
      
      // Create a new chat message
      addChatMessage({
        id: Date.now().toString(),
        role: 'user',
        content: prompt,
        timestamp: new Date().toISOString(),
      });

      // Add AI response
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      });

      // Create initial travel plan
      setCurrentPlan({
        id: Date.now().toString(),
        ...formData,
        activities: [],
        expenses: [],
        weather: [],
        news: [],
      });
    } catch (error) {
      console.error('Error generating travel plan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Plan Your Trip</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              min={today}
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              min={formData.startDate || today}
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Origin
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.origin}
              onChange={(e) =>
                setFormData({ ...formData, origin: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              placeholder="Enter origin city"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              placeholder="Enter destination city"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mode of Transport
          </label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={formData.transportMode}
              onChange={(e) =>
                setFormData({ ...formData, transportMode: e.target.value })
              }
              className="pl-10 w-full p-2 border rounded-md"
              required
            >
              <option value="">Select transport mode</option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
              <option value="car">Car</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Number of Travelers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              min="1"
              value={formData.travelers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  travelers: parseInt(e.target.value),
                })
              }
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Generate Travel Plan
      </button>
    </form>
  );
}