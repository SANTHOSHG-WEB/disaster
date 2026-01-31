"use client";

import React, { useState } from "react";
import {
    MessageSquare,
    X,
    Send,
    Bot,
    User,
    Info,
    ShieldCheck,
    HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello! I am your Safety Assistant. How can I help you learn about disaster management today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        // Simple response logic for Fix 14
        setTimeout(() => {
            let response = "That's a great question! You can find more details in the Learning Furnace.";
            if (input.toLowerCase().includes("flood")) {
                response = "Floods happen when water overflows onto dry land. To stay safe, move to higher ground immediately and never walk through moving water!";
            } else if (input.toLowerCase().includes("certificate")) {
                response = "You'll earn your certificate once you complete all 10 learning modules! Keep going, you're doing great.";
            } else if (input.toLowerCase().includes("map")) {
                response = "Our Safety Map shows verified shelters in your area. check it out in the navigation menu!";
            }

            setMessages([...newMessages, { role: "bot", text: response }]);
        }, 1000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    zIndex: 1000,
                    cursor: "pointer",
                    border: "none",
                    transition: "transform 0.2s"
                }}
                className="chatbot-toggle"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="glass-card"
                        style={{
                            position: "fixed",
                            bottom: "6rem",
                            right: "2rem",
                            width: "350px",
                            height: "500px",
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 1000,
                            padding: 0,
                            overflow: "hidden"
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: "1.5rem",
                            backgroundColor: "var(--primary)",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem"
                        }}>
                            <div style={{ padding: "0.5rem", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }}>
                                <Bot size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>Safety Assistant</h4>
                                <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.8 }}>Online to help you learn</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, padding: "1.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {messages.map((m, i) => (
                                <div key={i} style={{
                                    alignSelf: m.role === "bot" ? "flex-start" : "flex-end",
                                    maxWidth: "80%",
                                    padding: "0.75rem 1rem",
                                    borderRadius: "1rem",
                                    borderBottomLeftRadius: m.role === "bot" ? 0 : "1rem",
                                    borderBottomRightRadius: m.role === "user" ? 0 : "1rem",
                                    backgroundColor: m.role === "bot" ? "var(--accent)" : "var(--primary)",
                                    color: m.role === "bot" ? "var(--foreground)" : "white",
                                    fontSize: "0.875rem",
                                    lineHeight: 1.4
                                }}>
                                    {m.text}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.5rem" }}>
                            <input
                                type="text"
                                placeholder="Ask me about safety..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                style={{
                                    flex: 1,
                                    padding: "0.6rem 1rem",
                                    borderRadius: "2rem",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--background)",
                                    color: "var(--foreground)",
                                    fontSize: "0.875rem",
                                    outline: "none"
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    padding: "0.6rem",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--primary)",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .chatbot-toggle:hover { transform: scale(1.05); }
      `}</style>
        </>
    );
}
