import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useTravelStore } from '../store/travelStore';
import { Map } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

export function MapView() {
  const { currentPlan } = useTravelStore();

  // Note: You'll need to provide a Google Maps API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
  });

  if (loadError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Map View</h2>
        </div>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Error loading Google Maps
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Map View</h2>
        </div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-[400px]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Map View</h2>
      </div>
      <div className="rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={defaultCenter}
        >
          {/* Add markers for origin and destination when coordinates are available */}
        </GoogleMap>
      </div>
    </div>
  );
}