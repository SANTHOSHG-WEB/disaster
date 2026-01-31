"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, AlertTriangle, Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const mockData = {
        location: "Global Awareness",
        temp: 24,
        condition: "Partly Cloudy",
        humidity: 55,
        wind: 18,
        alerts: [
            { id: 1, title: "Heat Awareness", desc: "Stay hydrated and avoid direct sun during peak hours." }
        ],
        forecast: [
            { day: "Today", temp: 24, icon: Sun },
            { day: "Tue", temp: 22, icon: Cloud },
            { day: "Wed", temp: 19, icon: CloudRain },
            { day: "Thu", temp: 25, icon: Sun },
            { day: "Fri", temp: 23, icon: Cloud }
        ]
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Weather & Alert Dashboard</h1>
                <p className="text-muted-foreground">Monitor local conditions and stay informed about potential hazards</p>
            </div>

            <Card className="glass border-glass-border mb-8">
                <CardContent className="p-6">
                    <div className="flex gap-2">
                        <Input
                            className="glass"
                            placeholder="Search city (e.g. New York, London, Delhi)..."
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <Button variant="secondary" className="glass">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="glass border-glass-border md:col-span-2 shadow-xl">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" /> {mockData.location}
                        </div>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center py-8">
                        <div className="text-center">
                            <div className="text-7xl font-bold">{mockData.temp}°</div>
                            <div className="text-xl text-muted-foreground mt-2">{mockData.condition}</div>
                        </div>
                        <div className="space-y-4 w-32">
                            <div className="flex justify-between border-b border-glass-border pb-2">
                                <Wind className="h-4 w-4 opacity-50" /> <span>{mockData.wind} km/h</span>
                            </div>
                            <div className="flex justify-between">
                                <Droplets className="h-4 w-4 opacity-50" /> <span>{mockData.humidity}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass border-glass-border border-l-4 border-warning shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-warning flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" /> Active Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockData.alerts.map(a => (
                            <div key={a.id} className="bg-warning/10 p-4 rounded-xl">
                                <h4 className="font-bold text-sm text-warning mb-1">{a.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="glass border-glass-border shadow-2xl">
                <CardHeader>
                    <CardTitle>5-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {mockData.forecast.map((f, i) => (
                            <div key={i} className="text-center p-4 bg-glass/20 rounded-2xl border border-glass-border">
                                <div className="text-sm font-bold opacity-60 mb-2">{f.day}</div>
                                <f.icon className="h-8 w-8 mx-auto my-3 text-primary" />
                                <div className="text-2xl font-bold">{f.temp}°</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
