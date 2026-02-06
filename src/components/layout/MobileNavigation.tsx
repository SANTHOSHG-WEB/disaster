"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Home, BookOpen, MapPin, Phone, AlertTriangle, LogOut, Bot } from 'lucide-react';

interface MobileNavigationProps {
    onAIChatToggle?: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ onAIChatToggle }) => {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/learning', icon: BookOpen, label: 'Learning' },
        { path: '/map', icon: MapPin, label: 'Map' },
        { path: '/emergency', icon: Phone, label: 'Contact' },
        { path: '/weather', icon: AlertTriangle, label: 'Alert' },
    ];

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-glass-border/30 z-50">
            <div className="flex items-center justify-around py-2 px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-muted-foreground hover:text-primary'
                                }`}
                        >
                            <item.icon className="h-5 w-5 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                {onAIChatToggle && (
                    <button
                        onClick={onAIChatToggle}
                        className="flex flex-col items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                    >
                        <Bot className="h-5 w-5 mb-1" />
                        <span className="text-xs font-medium">AI</span>
                    </button>
                )}
                {user && (
                    <button
                        onClick={handleLogout}
                        className="flex flex-col items-center justify-center p-2 rounded-lg text-destructive hover:bg-destructive/10"
                    >
                        <LogOut className="h-5 w-5 mb-1" />
                        <span className="text-xs font-medium">Logout</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default MobileNavigation;
