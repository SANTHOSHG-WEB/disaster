"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, School, GraduationCap, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

const schools = [
    "KV Chennai",
    "PSBB Millenium",
    "Delhi Public School, Bangalore",
    "Loyola School, Trivandrum",
    "HPS Hyderabad",
    "Modern School, Delhi",
];

const grades = ["8th", "9th", "10th", "11th", "12th"];

export default function Signup() {
    const { t } = useTranslation("common");
    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        dob: "",
        email: "",
        password: "",
        school: "",
        grade: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        // Logic for Supabase auth will go here
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>

            <main style={{ maxWidth: "500px", margin: "4rem auto", padding: "0 2rem" }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card"
                    style={{ padding: "3rem" }}
                >
                    <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                            Join the Mission
                        </h1>
                        <p style={{ color: "var(--muted-foreground)" }}>
                            Start your journey to becoming a disaster management expert.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div className="input-field">
                            <label style={labelStyle}><User size={16} /> Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                style={inputStyle}
                                placeholder="Ex. Rahul Kumar"
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div className="input-field">
                                <label style={labelStyle}><Calendar size={16} /> Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    required
                                    style={inputStyle}
                                    placeholder="Ex. 15"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <label style={labelStyle}><Calendar size={16} /> Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    style={inputStyle}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-field">
                            <label style={labelStyle}><Mail size={16} /> Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                style={inputStyle}
                                placeholder="you@school.edu"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field">
                            <label style={labelStyle}><Lock size={16} /> Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                style={inputStyle}
                                placeholder="Min. 8 characters"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field">
                            <label style={labelStyle}><School size={16} /> School Name</label>
                            <select name="school" required style={inputStyle} onChange={handleChange}>
                                <option value="">Select your school</option>
                                {schools.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-field">
                            <label style={labelStyle}><GraduationCap size={16} /> Class / Grade</label>
                            <select name="grade" required style={inputStyle} onChange={handleChange}>
                                <option value="">Select grade</option>
                                {grades.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="primary-button"
                            style={{
                                marginTop: "1rem",
                                padding: "1rem",
                                borderRadius: "var(--radius)",
                                backgroundColor: "var(--primary)",
                                color: "var(--primary-foreground)",
                                fontWeight: 700,
                                fontSize: "1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                boxShadow: "var(--shadow-lg)",
                                transition: "opacity 0.2s ease"
                            }}
                        >
                            Verify Email & Create Account <ArrowRight size={18} />
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                        Already have an account? <Link href="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Sign In</Link>
                    </p>
                </motion.div>
            </main>
        </div>
    );
}

const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--foreground)",
    marginBottom: "0.5rem",
};

const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s ease",
};
