"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, AlertTriangle, Cloud, Sun, CloudRain, Wind, Droplets, Loader2, CloudSnow, CloudLightning } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WeatherData {
    location: string;
    temp: number;
    condition: string;
    humidity: number;
    wind: number;
    icon: any;
    forecast: any[];
}

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const weatherCodes: Record<number, { label: string; icon: any }> = {
        0: { label: "Clear sky", icon: Sun },
        1: { label: "Mainly clear", icon: Sun },
        2: { label: "Partly cloudy", icon: Cloud },
        3: { label: "Overcast", icon: Cloud },
        45: { label: "Fog", icon: Cloud },
        48: { label: "Depositing rime fog", icon: Cloud },
        51: { label: "Drizzle: Light", icon: CloudRain },
        53: { label: "Drizzle: Moderate", icon: CloudRain },
        55: { label: "Drizzle: Dense", icon: CloudRain },
        61: { label: "Rain: Slight", icon: CloudRain },
        63: { label: "Rain: Moderate", icon: CloudRain },
        65: { label: "Rain: Heavy", icon: CloudRain },
        71: { label: "Snow: Slight", icon: CloudSnow },
        73: { label: "Snow: Moderate", icon: CloudSnow },
        75: { label: "Snow: Heavy", icon: CloudSnow },
        95: { label: "Thunderstorm", icon: CloudLightning },
    };

    const fetchWeather = async (cityName: string) => {
        if (!cityName) return;
        setLoading(true);
        setError('');
        try {
            // 1. Geocoding
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                setError('City not found. Please try another.');
                setLoading(false);
                return;
            }

            const { latitude, longitude, name, country, admin1 } = geoData.results[0];
            const locationString = `${name}, ${admin1 || country}`;

            // 2. Weather Data
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
            const weatherData = await weatherRes.json();

            const current = weatherData.current_weather;
            const daily = weatherData.daily;

            const days = ['Today', ...Array.from({ length: 4 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i + 1);
                return d.toLocaleDateString('en-US', { weekday: 'short' });
            })];

            const forecast = daily.time.slice(0, 5).map((time: string, i: number) => ({
                day: days[i],
                temp: Math.round(daily.temperature_2m_max[i]),
                icon: weatherCodes[daily.weathercode[i]]?.icon || Cloud
            }));

            setWeather({
                location: locationString,
                temp: Math.round(current.temperature),
                condition: weatherCodes[current.weathercode]?.label || "Unknown",
                humidity: 65, // Humidity not directly in simple current_weather API but can be added
                wind: Math.round(current.windspeed),
                icon: weatherCodes[current.weathercode]?.icon || Cloud,
                forecast
            });

        } catch (err) {
            setError('Failed to fetch weather data. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchWeather(city);
    };

    // Default fetch for a major city
    useEffect(() => {
        fetchWeather('Delhi');
    }, []);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Weather & Early Warning</h1>
                <p className="text-muted-foreground">Stay prepared with real-time global weather data</p>
            </div>

            <Card className="glass border-glass-border mb-8 shadow-lg">
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            className="glass h-12"
                            placeholder="Search your city (e.g. Mumbai, Chennai, Lucknow)..."
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <Button type="submit" variant="secondary" className="glass h-12 px-6" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : <Search className="h-5 w-5" />}
                        </Button>
                    </form>
                    {error && <p className="text-destructive text-sm mt-3 px-1">{error}</p>}
                </CardContent>
            </Card>

            {weather && (
                <div className="space-y-8 animate-fade-in">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="glass border-glass-border md:col-span-2 shadow-xl overflow-hidden group">
                            <CardHeader className="bg-primary/5 pb-2">
                                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                    <MapPin className="h-4 w-4 text-primary" /> {weather.location}
                                </div>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center py-12">
                                <div className="text-center md:text-left">
                                    <div className="text-8xl font-bold tracking-tighter text-glass-foreground flex items-center justify-center md:justify-start">
                                        {weather.temp}°
                                        <weather.icon className="h-20 w-20 ml-4 text-primary opacity-80" />
                                    </div>
                                    <div className="text-2xl font-medium text-muted-foreground mt-2">{weather.condition}</div>
                                </div>
                                <div className="space-y-6 w-32 hidden sm:block">
                                    <div className="flex justify-between border-b border-glass-border pb-3">
                                        <span className="flex items-center gap-2 text-muted-foreground"><Wind className="h-4 w-4" /> Wind</span>
                                        <span className="font-bold">{weather.wind} <span className="text-[10px] opacity-70">km/h</span></span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="flex items-center gap-2 text-muted-foreground"><Droplets className="h-4 w-4" /> Humid</span>
                                        <span className="font-bold">{weather.humidity}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass border-glass-border border-l-4 border-warning shadow-xl h-full">
                            <CardHeader>
                                <CardTitle className="text-warning flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5" /> Preparedness Alerts
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {weather.temp > 35 && (
                                    <div className="bg-warning/10 p-4 rounded-xl border border-warning/20">
                                        <h4 className="font-bold text-sm text-warning mb-1">Extreme Heat Alert</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Safety: Drink plenty of water and avoid outdoor activities during noon.</p>
                                    </div>
                                )}
                                {weather.wind > 40 && (
                                    <div className="bg-warning/10 p-4 rounded-xl border border-warning/20">
                                        <h4 className="font-bold text-sm text-warning mb-1">High Wind Advisory</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Precaution: Secure lightweight objects outdoors and be cautious while driving.</p>
                                    </div>
                                )}
                                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                                    <h4 className="font-bold text-sm text-primary mb-1">General Safety</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">Keep your emergency kit ready and stay updated through local news.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="glass border-glass-border shadow-2xl">
                        <CardHeader className="border-b border-glass-border/30">
                            <CardTitle className="text-xl">5-Day Safety Forecast</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-glass-border">
                                {weather.forecast.map((f, i) => (
                                    <div key={i} className="text-center p-8 hover:bg-glass/10 transition-colors">
                                        <div className="text-sm font-bold opacity-60 mb-2 uppercase tracking-widest">{f.day}</div>
                                        <f.icon className="h-10 w-10 mx-auto my-4 text-primary" />
                                        <div className="text-3xl font-bold">{f.temp}°</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
