"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your Disaster Education Assistant. I can help you with disaster safety questions, emergency procedures, and course-related queries. How can I assist you today?",
            isBot: true
        }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: inputText,
            isBot: false
        };

        setMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: generateResponse(inputText),
                isBot: true
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);

        setInputText('');
    };

    const generateResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('earthquake')) return "During an earthquake: 1) Drop 2) Cover 3) Hold on. For more, check Module 1.";
        if (lowerQuery.includes('fire')) return "Fire safety: 1) Stay low 2) Feel doors 3) Use stairs. For more, check Module 3.";
        if (lowerQuery.includes('flood')) return "Flood safety: 1) High ground 2) Avoid walking in water. For more, check Module 2.";
        return "I am here to help you prepared for disasters. Ask me about Earthquakes, Floods, or Fire safety!";
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 p-4 rounded-full transition-all duration-300 shadow-lg ${isOpen ? 'bg-emergency' : 'bg-primary'
                    }`}
            >
                {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-36 right-4 md:bottom-24 md:right-6 w-80 max-w-[calc(100vw-2rem)] z-50 glass rounded-2xl shadow-2xl animate-fade-in">
                    <div className="p-4 border-b border-glass-border">
                        <h3 className="font-semibold text-glass-foreground">Disaster Help Assistant</h3>
                    </div>
                    <div className="h-80 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${message.isBot ? 'bg-glass/50 text-glass-foreground' : 'bg-primary text-white'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-glass-border">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask something..."
                                className="flex-1 bg-input border border-glass-border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            />
                            <button onClick={handleSendMessage} disabled={!inputText.trim()} className="p-2 bg-primary text-white rounded-lg">
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChat;
