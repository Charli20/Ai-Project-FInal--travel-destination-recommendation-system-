import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapTest = () => {
  const mapRef = useRef();

  const testMarkers = [
    { title: "Colombo", lat: 6.9271, lon: 79.8612 },
    { title: "Kandy", lat: 7.2906, lon: 80.6337 },
    { title: "Galle", lat: 6.0323, lon: 80.2160 },
  ];

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-black">Map Test</h1>
      <div className="w-full h-[500px] rounded-xl overflow-hidden">
        <MapContainer
          center={[6.9271, 79.8612]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {testMarkers.map((m, i) => (
            <Marker key={i} position={[m.lat, m.lon]}>
              <Popup>{m.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapTest;
