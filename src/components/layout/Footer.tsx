"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="glass border-t border-glass-border mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-glass-foreground mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/" className="block text-muted-foreground hover:text-accent transition-colors">
                                Home
                            </Link>
                            <Link href="/learning" className="block text-muted-foreground hover:text-accent transition-colors">
                                Learning
                            </Link>
                            <Link href="/emergency" className="block text-muted-foreground hover:text-accent transition-colors">
                                Emergency Contacts
                            </Link>
                            <Link href="/weather" className="block text-muted-foreground hover:text-accent transition-colors">
                                Weather
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-glass-foreground mb-4">Emergency</h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p>Police: <a href="tel:100" className="text-accent hover:underline">100</a></p>
                            <p>Fire: <a href="tel:101" className="text-accent hover:underline">101</a></p>
                            <p>Ambulance: <a href="tel:102" className="text-accent hover:underline">102</a></p>
                            <p>Disaster Helpline: <a href="tel:108" className="text-accent hover:underline">108</a></p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-glass-foreground mb-4">Platform</h3>
                        <div className="space-y-2">
                            <Link href="/about" className="block text-muted-foreground hover:text-accent transition-colors">
                                About
                            </Link>
                            <p className="text-muted-foreground text-sm">
                                Disaster Management Education Platform
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-glass-border mt-8 pt-8 text-center text-muted-foreground">
                    <p>&copy; 2024 Disaster Management Education Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
