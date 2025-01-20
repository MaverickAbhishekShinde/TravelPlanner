import React from 'react';
import { useTravelStore } from '../store/travelStore';
import { Calendar, MapPin, Users, Plane } from 'lucide-react';

export function TravelDetails() {
  const { currentPlan } = useTravelStore();

  if (!currentPlan) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Travel Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Dates</p>
            <p className="font-medium">
              {new Date(currentPlan.startDate).toLocaleDateString()} - {new Date(currentPlan.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Route</p>
            <p className="font-medium">
              {currentPlan.origin} → {currentPlan.destination}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Plane className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Transport Mode</p>
            <p className="font-medium capitalize">{currentPlan.transportMode}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Travelers</p>
            <p className="font-medium">{currentPlan.travelers} person(s)</p>
          </div>
        </div>
      </div>

      {currentPlan.activities.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Planned Activities</h3>
          <div className="space-y-3">
            {currentPlan.activities.map((activity) => (
              <div key={activity.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{activity.name}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-gray-500">{activity.location}</span>
                  <span className="text-indigo-600">${activity.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}