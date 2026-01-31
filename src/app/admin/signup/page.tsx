"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2,
    User,
    Mail,
    Lock,
    Camera,
    Image as ImageIcon,
    ArrowRight,
    ShieldCheck,
    MapPin
} from "lucide-react";

export default function AdminSignup() {
    const [formData, setFormData] = useState({
        instituteName: "",
        adminName: "",
        email: "",
        password: "",
        address: "",
    });
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const router = useRouter();
    const { signup, isLoading } = useAuth();
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Safety check for user's desired admin email
        if (formData.email !== 'admin@dme.com') {
            toast({
                title: "Invalid Email",
                description: "Only admin@dme.com can register as a system administrator.",
                variant: "destructive"
            });
            return;
        }

        const { error } = await signup(formData.email, formData.password, {
            full_name: formData.adminName,
            school_name: formData.instituteName,
            role: 'admin'
        });

        if (!error) {
            toast({ title: "Admin Registered", description: "Verification email sent. Please check your inbox." });
            router.push('/admin/login');
        } else {
            toast({ title: "Signup Failed", description: error, variant: "destructive" });
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>

            <main style={{ maxWidth: "600px", margin: "4rem auto", padding: "0 2rem" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ padding: "3rem" }}
                >
                    <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                            Register Your <span style={{ color: "var(--primary)" }}>Institute</span>
                        </h1>
                        <p style={{ color: "var(--muted-foreground)" }}>
                            Manage your students and disaster learning modules.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                        {/* Photo Upload Section - Fix 7 */}
                        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                            <div
                                onClick={handleImageClick}
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--accent)",
                                    margin: "0 auto 1.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    border: "2px dashed var(--border)",
                                    overflow: "hidden",
                                    position: "relative",
                                    transition: "border-color 0.2s"
                                }}
                            >
                                {preview ? (
                                    <img src={preview} alt="Admin Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                    <div style={{ textAlign: "center", color: "var(--muted-foreground)" }}>
                                        <Camera size={32} style={{ marginBottom: "0.5rem" }} />
                                        <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>Upload Photo</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: "none" }}
                            />
                            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Official Admin Identification Photo</p>
                        </div>

                        <div className="responsive-grid" style={{ gridTemplateColumns: "1fr" }}>
                            <div className="input-field">
                                <label style={labelStyle}><Building2 size={16} /> Institute/School Name</label>
                                <input
                                    type="text"
                                    name="instituteName"
                                    required
                                    style={inputStyle}
                                    onChange={handleChange}
                                    placeholder="Ex. St. Mary's School"
                                />
                            </div>

                            <div className="input-field">
                                <label style={labelStyle}><User size={16} /> Admin Contact Person</label>
                                <input
                                    type="text"
                                    name="adminName"
                                    required
                                    style={inputStyle}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />
                            </div>

                            <div className="input-field">
                                <label style={labelStyle}><Mail size={16} /> Official Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    style={inputStyle}
                                    onChange={handleChange}
                                    placeholder="admin@school.org"
                                />
                            </div>

                            <div className="input-field">
                                <label style={labelStyle}><Lock size={16} /> Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    style={inputStyle}
                                    onChange={handleChange}
                                    placeholder="Choose a strong password"
                                />
                            </div>

                            <div className="input-field">
                                <label style={labelStyle}><MapPin size={16} /> Institute Address</label>
                                <textarea
                                    name="address"
                                    required
                                    onChange={handleChange}
                                    style={{ ...inputStyle, minHeight: "80px", resize: "none" }}
                                    placeholder="Complete Address"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="primary-button"
                            style={{
                                marginTop: "1rem",
                                padding: "1rem",
                                borderRadius: "var(--radius)",
                                backgroundColor: "var(--primary)",
                                color: "white",
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.75rem",
                                width: "100%",
                                border: "none",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                opacity: isLoading ? 0.7 : 1
                            }}
                        >
                            {isLoading ? "Processing..." : "Register Administrator"} <ArrowRight size={20} />
                        </button>
                    </form>

                    <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                            Already have an account?{" "}
                            <Link href="/admin/login" style={{ color: "var(--primary)", fontWeight: 700 }}>
                                Login here
                            </Link>
                        </p>
                    </div>

                    <div style={{ marginTop: "2rem", padding: "1rem", borderRadius: "0.75rem", backgroundColor: "var(--accent)", display: "flex", gap: "1rem" }}>
                        <ShieldCheck size={20} className="text-primary" />
                        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                            Registration is subject to verification by the Disaster Management Board.
                        </p>
                    </div>
                </motion.div>
            </main>

            <style jsx global>{`
        .input-field { display: flex; flexDirection: column; }
      `}</style>
        </div>
    );
}

const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    marginBottom: "0.5rem"
};

const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    fontSize: "1rem",
    outline: "none"
};
