'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import LiveMap from './live_map';

export default function LocationTracker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState('');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setPosition(newPos);
        
        // Save to backend - UPDATED POST REQUEST
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              latitude: newPos[0],
              longitude: newPos[1]
            }),
            credentials: 'include'
          });
        } catch (err) {
          console.error('Save failed:', err);
        }
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  };

  // Load last saved location on mount - UPDATED GET REQUEST
  useEffect(() => {
    const loadLocation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, { 
          credentials: 'include' 
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API Error: ${text}`);
        }
        const data = await res.json();
        if (data) setPosition([data.latitude, data.longitude]);
      } catch (err) {
        console.error('Load failed:', err);
      }
    };

    loadLocation();
  }, []);

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="h-[500] w-[800] space-y-4">
      <div className="flex items-center gap-4">
        <Button onClick={getLocation}>Get My Location</Button>
        {position && (
          <span className="text-sm">
            {position[0].toFixed(4)}, {position[1].toFixed(4)}
          </span>
        )}
      </div>
      
      {position ? (
        <LiveMap position={position}/>
      ) : (
        <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
          {error || 'No location data available'}
        </div>
      )}
    </div>
  );
}