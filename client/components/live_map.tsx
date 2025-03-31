// components/live_map.tsx
'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import * as L from 'leaflet';
import { useEffect } from 'react';

// Fix marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function LiveMap({ center }: { center: [number, number] }) {
  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} />
    </MapContainer>
  );
}