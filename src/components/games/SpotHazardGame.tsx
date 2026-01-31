"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SpotHazardGameProps {
    data: {
        instruction: string;
        hazards: Array<{ x: number; y: number; label: string }>;
    };
    onComplete: (score: number) => void;
    isActive: boolean;
}

const SpotHazardGame: React.FC<SpotHazardGameProps> = ({ data, onComplete, isActive }) => {
    const [found, setFound] = useState<Set<number>>(new Set());
    const [complete, setComplete] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (complete) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;

        data.hazards.forEach((h, i) => {
            if (Math.abs(h.x - px) < 6 && Math.abs(h.y - py) < 6) {
                const next = new Set(found).add(i);
                setFound(next);
                if (next.size === data.hazards.length) {
                    setComplete(true);
                    setTimeout(() => onComplete(100), 1000);
                }
            }
        });
    };

    if (!isActive) return null;

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-center">{data.instruction}</h3>
            <div className="text-center text-sm font-bold text-primary mb-2">FOUND: {found.size} / {data.hazards.length}</div>

            <div
                className="relative w-full aspect-video glass border-glass-border rounded-2xl overflow-hidden cursor-crosshair bg-gradient-to-br from-blue-100 to-green-100"
                onClick={handleClick}
            >
                <div className="absolute inset-0 p-8 flex flex-wrap gap-12 opacity-40 grayscale">
                    <div className="w-24 h-12 bg-brown-600 rounded">Bookshelf</div>
                    <div className="w-16 h-16 bg-gray-400 rounded-full">Fan</div>
                    <div className="w-32 h-20 bg-blue-300 rounded">Window</div>
                </div>

                {Array.from(found).map(idx => (
                    <div
                        key={idx}
                        className="absolute -translate-x-1/2 -translate-y-1/2 bg-success text-white text-[10px] px-2 py-1 rounded-full border-2 border-white shadow-lg animate-in zoom-in"
                        style={{ left: `${data.hazards[idx].x}%`, top: `${data.hazards[idx].y}%` }}
                    >
                        {data.hazards[idx].label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpotHazardGame;
