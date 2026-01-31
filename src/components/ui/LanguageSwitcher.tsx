"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import "@/lib/i18n"; // Import config to initialize

const languages = [
    { code: "en", name: "English" },
    { code: "ta", name: "Tamil" },
    { code: "hi", name: "Hindi" },
    { code: "ml", name: "Malayalam" },
    { code: "te", name: "Telugu" },
    { code: "pa", name: "Punjabi" },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)"
            }}
        >
            <Languages size={18} style={{ color: "var(--muted-foreground)" }} />
            <select
                onChange={changeLanguage}
                value={i18n.language}
                style={{
                    border: "none",
                    background: "none",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    cursor: "pointer",
                    outline: "none"
                }}
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
