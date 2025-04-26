'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LiveMap from './live_map';
import { locationService } from '@/app/api/api';
import { toast } from 'sonner'

export default function LocationTracker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState('');
  const[isLoading, setIsLoading] = useState(true);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setPosition(newPos);
        
        try {
          await locationService.saveLocation(newPos[0], newPos[1]);
        } catch (err) {
          console.error('Save failed:', err);
        }
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  };

  // // Load last saved location on mount - UPDATED GET REQUEST
  // useEffect(() => {
  //   const loadLocation = async () => {
  //     try {
  //       const data = await locationService.getLastLocation();
  //       if (data) setPosition([data.latitude, data.longitude]);
  //     } catch (err) {
  //       console.error('Load failed:', err);
  //     }
  //   };

  //   loadLocation();
  // }, []);

  // if (!position) {
  //   return <div>Loading map...</div>;
  // }

  const getCurrentAndSaveLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000
        });
      });

      const newPos: [number, number] = [
        position.coords.latitude,
        position.coords.longitude
      ];
      
      setPosition(newPos);
      await locationService.saveLocation(newPos[0], newPos[1]);
    } catch (err) {
      console.error('Location error:', err);
      toast.error('Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Get location immediately when component mounts
    getCurrentAndSaveLocation();
  }, []);

  if (isLoading) {
    return <div className="text-white">Getting your location...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      {/* Controls section - Separate from map */}
      <div className="flex items-center gap-4 p-2 bg-[#191919] rounded-lg">
        <Button onClick={getLocation}>Get My Location</Button>
        {position && (
          <span className="text-sm text-white">
            {position[0].toFixed(4)}, {position[1].toFixed(4)}
          </span>
        )}
      </div>

      {/* Map section */}
      <div className="flex-1 relative rounded-lg overflow-hidden">
        {position ? (
          <LiveMap position={position} />
        ) : (
          <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
            {error || 'No location data available'}
          </div>
        )}
      </div>
    </div>
  );
}