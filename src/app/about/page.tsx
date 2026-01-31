"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, BookOpen, Target, Globe, Award, CheckCircle } from 'lucide-react';

export default function AboutPage() {
    const features = [
        {
            icon: <BookOpen className="h-8 w-8 text-primary" />,
            title: "Interactive Learning",
            description: "10-module course with videos, quizzes, and games for effective preparedness."
        },
        {
            icon: <Shield className="h-8 w-8 text-destructive" />,
            title: "Emergency Response",
            description: "Fast access to emergency contacts and real-time disaster alerts."
        },
        {
            icon: <Users className="h-8 w-8 text-accent" />,
            title: "Community Focused",
            description: "Designed for schools and colleges to build a culture of safety."
        },
        {
            icon: <Globe className="h-8 w-8 text-success" />,
            title: "Global Standards",
            description: "Follows UNDRR and NDMA guidelines for disaster risk reduction."
        }
    ];

    return (
        <div className="container mx-auto max-w-6xl px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 text-glass-foreground">Empowering Safe Communities</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Our platform provides the tools and knowledge necessary to prepare for and respond to disasters,
                    ensuring that every student and teacher in India is equipped with life-saving skills.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card className="glass border-glass-border shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-6 w-6 text-primary" /> The Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            India is highly vulnerable to natural disasters. We aim to bridge the gap in awareness
                            by providing a standardized, engaging, and accessible curriculum for schools nationwide.
                        </p>
                        <div className="p-4 bg-primary/10 rounded-xl space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-primary" /> <span>Recognized by NDMA Guidelines</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-primary" /> <span>Inclusive & Accessible Design</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass border-glass-border shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-6 w-6 text-destructive" /> Real-time Support
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Beyond education, we provide immediate utility during crisis. Our emergency dashboard
                            is accessible offline and provides critical location-based safety information.
                        </p>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li>• Instant Emergency Dialing</li>
                            <li>• Weather Hazard Notifications</li>
                            <li>• Offline-first PWA architecture</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                    <div key={i} className="p-6 glass border-glass-border rounded-2xl hover:scale-105 transition-transform text-center shadow-lg">
                        <div className="flex justify-center mb-4">{f.icon}</div>
                        <h4 className="font-bold mb-2">{f.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
