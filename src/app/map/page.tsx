"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Navigation,
    MapPin,
    ShieldCheck,
    Heart,
    Info,
    Loader2
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet (No SSR)
const MapComponent = dynamic(
    () => import("@/components/features/MapComponent"),
    {
        ssr: false,
        loading: () => (
            <div style={{
                height: "500px",
                width: "100%",
                backgroundColor: "var(--accent)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--radius)",
                gap: "1rem"
            }}>
                <Loader2 className="animate-spin" size={40} color="var(--primary)" />
                <p style={{ fontWeight: 600, color: "var(--muted-foreground)" }}>Preparing your safety map...</p>
            </div>
        )
    }
);

export default function SafetyMap() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>

            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
                {/* Header Section */}
                <section style={{ marginBottom: "3rem" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
                            Your <span style={{ color: "var(--primary)" }}>Safety Guide</span>
                        </h1>
                        <p style={{ color: "var(--muted-foreground)", fontSize: "1.125rem", maxWidth: "600px" }}>
                            Knowing where to go during an emergency is the first step to staying safe.
                            Use this map to find verified shelters and relief centers near you.
                        </p>
                    </motion.div>
                </section>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 340px",
                    gap: "2rem",
                    alignItems: "start"
                }}>
                    {/* Map Area */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div className="glass-card" style={{ height: "500px", position: "relative" }}>
                            <MapComponent />
                        </div>

                        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", gap: "1.5rem" }}>
                            <div style={{ padding: "0.75rem", borderRadius: "0.75rem", backgroundColor: "var(--accent)", color: "var(--primary)" }}>
                                <Info size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Why use this map?</h4>
                                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>
                                    In times of floods or cyclones, designated shelters provide food, medicine, and safety.
                                    Identifying your nearest shelter **before** a disaster is a key part of preparedness.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Legend */}
                    <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div className="glass-card" style={{ padding: "1.5rem" }}>
                            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.5rem" }}>Map Legend</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#10b981" }}></div>
                                    <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Safe Shelter</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ef4444" }}></div>
                                    <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Emergency Hub</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#3b82f6" }}></div>
                                    <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Your Location</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: "1.5rem" }}>
                            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem" }}>Safety Tip</h3>
                            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "1rem" }}>
                                "Always follow the path recommended by local authorities. Avoid walking through stagnant water."
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: 700, fontSize: "0.75rem" }}>
                                <ShieldCheck size={16} /> VERIFIED BY DISASTER MANAGEMENT
                            </div>
                        </div>

                        <button style={{
                            padding: "1rem",
                            borderRadius: "0.75rem",
                            backgroundColor: "var(--primary)",
                            color: "white",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.75rem",
                            width: "100%"
                        }}>
                            <Navigation size={20} /> Get Directions
                        </button>
                    </aside>
                </div>
            </main>

            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @media (max-width: 900px) {
                    main > div {
                        grid-template-columns: 1fr !important;
                    }
                    aside {
                        order: 2;
                    }
                }
            `}</style>
        </div>
    );
}
