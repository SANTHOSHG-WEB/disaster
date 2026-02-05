"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Navigation,
    ShieldCheck,
    Info,
    Loader2,
    Map as MapIcon
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet (No SSR)
const MapComponent = dynamic(
    () => import("@/components/features/MapComponent"),
    {
        ssr: false,
        loading: () => (
            <div className="h-full w-full bg-muted/20 flex flex-col items-center justify-center rounded-xl gap-4 min-h-[500px]">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="font-semibold text-muted-foreground">Preparing your safety map...</p>
            </div>
        )
    }
);

export default function SafetyMap() {
    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col gap-6">

                {/* Header Section - Hidden on mobile to save space, visible on tablet+ */}
                <section className="hidden md:block shrink-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-extrabold mb-2">
                            Your <span className="text-primary">Safety Guide</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Knowing where to go during an emergency is the first step to staying safe.
                            Use this map to find verified shelters and relief centers near you.
                        </p>
                    </motion.div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 flex-1 h-full min-h-0">
                    {/* Map Area */}
                    <div className="relative h-full flex flex-col gap-4 min-h-[500px] lg:min-h-auto order-2 lg:order-1">
                        <div className="glass-card rounded-xl overflow-hidden shadow-lg border border-border/50 h-full w-full relative">
                            <MapComponent />

                            {/* Mobile Title Overlay */}
                            <div className="absolute top-4 left-4 right-14 z-[400] md:hidden">
                                <div className="bg-background/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-border/50">
                                    <h1 className="font-bold text-lg flex items-center gap-2">
                                        <MapIcon className="text-primary w-5 h-5" />
                                        Safety Map
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Info Card */}
                        <div className="glass-card p-6 gap-6 hidden lg:flex items-start">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                                <Info size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Why use this map?</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    In times of floods or cyclones, designated shelters provide food, medicine, and safety.
                                    Identifying your nearest shelter <strong className="text-foreground">before</strong> a disaster is a key part of preparedness.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Legend */}
                    <aside className="flex flex-col gap-4 overflow-y-auto pr-1 order-1 lg:order-2 h-auto lg:h-full">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-lg font-bold">Map Legend</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                    <span className="text-sm font-medium">Safe Shelter</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                                    <span className="text-sm font-medium">Emergency Hub</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                                    <span className="text-sm font-medium">Your Location</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold mb-3">Safety Tip</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                "Always follow the path recommended by local authorities. Avoid walking through stagnant water."
                            </p>
                            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide">
                                <ShieldCheck size={16} /> Verified by Disaster Management
                            </div>
                        </div>

                        <div className="mt-auto">
                            <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98]">
                                <Navigation size={20} /> Get Directions
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
