"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, Book, FileText, Globe, LifeBuoy } from "lucide-react";

export default function InfoPage() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
            <main style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 2rem" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "2rem" }}>Resource <span style={{ color: "var(--primary)" }}>Hub</span></h1>

                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "2rem" }}>
                        <h2 style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            <Book className="text-primary" /> General Guidelines
                        </h2>
                        <p style={{ color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                            Disaster management is the organization and management of resources and responsibilities for dealing with all humanitarian aspects of emergencies. Here you will find comprehensive guides on various types of disasters.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <div className="glass-card" style={{ padding: "1.5rem" }}>
                            <FileText style={{ marginBottom: "1rem", color: "var(--primary)" }} />
                            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Safety Manuals</h3>
                            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Downloadable PDFs for offline reading.</p>
                        </div>
                        <div className="glass-card" style={{ padding: "1.5rem" }}>
                            <Globe style={{ marginBottom: "1rem", color: "var(--primary)" }} />
                            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Global Standards</h3>
                            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>International disaster protocols (UNDRR).</p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
