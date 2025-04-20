'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import MapContainer and other Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

import 'leaflet/dist/leaflet.css';

export default function LocationTracker() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`, {
          credentials: 'include',
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
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} />
    </MapContainer>
  );
}