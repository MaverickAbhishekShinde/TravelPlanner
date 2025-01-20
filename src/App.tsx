import React from 'react';
import { PlannerForm } from './components/PlannerForm';
import { ChatInterface } from './components/ChatInterface';
import { TravelDetails } from './components/TravelDetails';
import { ExpenseTracker } from './components/ExpenseTracker';
import { MapView } from './components/MapView';
import { WeatherWidget } from './components/WeatherWidget';
import { NewsWidget } from './components/NewsWidget';
import { Plane, Navigation } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex items-center space-x-2">
          <Plane className="w-8 h-8" />
          <h1 className="text-2xl font-bold">AI Travel Planner</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PlannerForm />
            <ChatInterface />
          </div>
          
          <div className="space-y-6">
            <TravelDetails />
            <ExpenseTracker />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <MapView />
          <div className="space-y-6">
            <WeatherWidget />
            <NewsWidget />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;