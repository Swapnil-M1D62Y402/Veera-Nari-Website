
'use client';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });

type Position = [number, number];
type LiveMapProps = {
  position: Position;
};

export default function LiveMap({ position }: LiveMapProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically import leaflet and set the default icon
      (async () => {
        const L = await import('leaflet');
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
    <div className="h-[500px] w-full rounded-lg border">
      {position ? (
        <MapContainer
          center={position}
          zoom={16}
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
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