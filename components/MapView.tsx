import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function ChangeView({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon, map]);

  return null;
}

// Fix d’icône Leaflet (sinon bug dans Next.js)
const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconAnchor: [12, 41],
});

export default function MapView({ lat, lon }: { lat: number; lon: number }) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} icon={icon}>
        <Popup>Lieu choisi</Popup>
      </Marker>
      <ChangeView lat={lat} lon={lon} />
    </MapContainer>
  );
}
