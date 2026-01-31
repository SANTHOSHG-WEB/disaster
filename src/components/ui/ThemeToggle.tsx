"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ width: "40px", height: "40px" }} />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{
                padding: "8px",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            {theme === "dark" ? (
                <Sun size={20} className="sun-icon" />
            ) : (
                <Moon size={20} className="moon-icon" />
            )}
        </button>
    );
}
