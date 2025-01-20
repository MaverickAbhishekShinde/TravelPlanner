import React, { useEffect, useState } from 'react';
import { useTravelStore } from '../store/travelStore';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { getWeatherForecast } from '../services/aiService';

export function WeatherWidget() {
  const { currentPlan } = useTravelStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentPlan?.destination) {
      setLoading(true);
      const dates = [currentPlan.startDate, currentPlan.endDate];
      getWeatherForecast(currentPlan.destination, dates)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [currentPlan?.destination]);

  if (!currentPlan) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold">Weather Forecast</h2>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      ) : currentPlan.weather.length > 0 ? (
        <div className="space-y-4">
          {currentPlan.weather.map((weather) => (
            <div
              key={weather.date}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {weather.condition.toLowerCase().includes('rain') ? (
                  <CloudRain className="w-6 h-6 text-blue-500" />
                ) : weather.condition.toLowerCase().includes('cloud') ? (
                  <Cloud className="w-6 h-6 text-gray-500" />
                ) : (
                  <Sun className="w-6 h-6 text-yellow-500" />
                )}
                <div>
                  <p className="font-medium">
                    {new Date(weather.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">{weather.condition}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">{weather.temperature}°C</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          Weather data will appear here once available
        </p>
      )}
    </div>
  );
}