"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icons in Leaflet with Next.js/Webpack
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const shelterIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const emergencyIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface Location {
    id: number;
    lat: number;
    lng: number;
    name: string;
    type: "shelter" | "emergency";
    description: string;
}

const locations: Location[] = [
    { id: 1, lat: 13.0827, lng: 80.2707, name: "Central Shelter A", type: "shelter", description: "Food, water and medical supplies available." },
    { id: 2, lat: 13.0473, lng: 80.2101, name: "City Relief Center", type: "shelter", description: "Safe zone for 500+ people." },
    { id: 3, lat: 13.0067, lng: 80.2206, name: "Emergency Response Hub", type: "emergency", description: "Ambulance and rescue boats stationed here." },
];

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function MapComponent() {
    return (
        <div style={{ height: "100%", width: "100%", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <MapContainer
                center={[13.0827, 80.2707]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc) => (
                    <Marker
                        key={loc.id}
                        position={[loc.lat, loc.lng]}
                        icon={loc.type === "shelter" ? shelterIcon : emergencyIcon}
                    >
                        <Popup>
                            <div style={{ padding: "0.5rem" }}>
                                <h4 style={{ fontWeight: 700, margin: 0 }}>{loc.name}</h4>
                                <p style={{ margin: "0.5rem 0", fontSize: "0.875rem" }}>{loc.description}</p>
                                <span style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    color: loc.type === "shelter" ? "#10b981" : "#ef4444",
                                    textTransform: "uppercase"
                                }}>
                                    {loc.type}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
