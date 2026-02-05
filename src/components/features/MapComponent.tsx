"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Locate } from "lucide-react";

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

function LocateControl() {
    const map = useMap();

    const handleLocate = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <button
                    onClick={handleLocate}
                    className="bg-background hover:bg-muted text-primary p-2 flex items-center justify-center transition-colors w-10 h-10 shadow-lg border-2 border-primary/20"
                    title="Show my location"
                    aria-label="Show my location"
                    style={{ cursor: "pointer" }} // Force pointer for Leaflet control override
                >
                    <Locate size={20} />
                </button>
            </div>
        </div>
    );
}

export default function MapComponent() {
    return (
        <div className="w-full h-full rounded-xl overflow-hidden relative z-0">
            <MapContainer
                center={[13.0827, 80.2707]}
                zoom={12}
                className="w-full h-full z-0"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocateControl />
                {locations.map((loc) => (
                    <Marker
                        key={loc.id}
                        position={[loc.lat, loc.lng]}
                        icon={loc.type === "shelter" ? shelterIcon : emergencyIcon}
                    >
                        <Popup className="leaflet-popup-rounded">
                            <div className="p-1 min-w-[200px]">
                                <h4 className="font-bold text-base m-0 text-foreground">{loc.name}</h4>
                                <p className="my-2 text-sm text-muted-foreground">{loc.description}</p>
                                <span className={`
                                    text-xs font-bold uppercase px-2 py-1 rounded-full
                                    ${loc.type === "shelter"
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}
                                `}>
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
