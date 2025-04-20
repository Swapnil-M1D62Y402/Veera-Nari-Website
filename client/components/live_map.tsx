'use client';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

const L = dynamic(() => import('leaflet') as any, { ssr: false });
const leafletPromise = import('leaflet');

// Fix missing marker icons in production

type Position = [number, number];
type LiveMapProps = {
  position: Position;
};

export default function LiveMap({ position }:LiveMapProps ) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically import leaflet and set the default icon
      (async () => {
        const L = await leafletPromise;
        const DefaultIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
        L.Marker.prototype.options.icon = DefaultIcon;
      })();
    }
  }, []);

  return (
    <div className="h-[400px] w-full rounded-lg border">
      {position ? (
        <MapContainer 
          center={position} 
          zoom={13} 
          className="h-full w-full"
          key={position.toString()} // Force re-render on position change
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} />
        </MapContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
}