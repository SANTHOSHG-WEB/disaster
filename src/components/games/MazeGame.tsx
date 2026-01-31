"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface MazeGameProps {
    data: {
        instruction: string;
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        obstacles: number[][];
    };
    onComplete: (score: number) => void;
    isActive: boolean;
}

const MazeGame: React.FC<MazeGameProps> = ({ data, onComplete, isActive }) => {
    const [playerX, setPlayerX] = useState(data.startX);
    const [playerY, setPlayerY] = useState(data.startY);
    const [isCompleted, setIsCompleted] = useState(false);
    const gridSize = 10;

    const isObstacle = (x: number, y: number) => data.obstacles.some(([ox, oy]) => ox === x && oy === y);

    const move = (dx: number, dy: number) => {
        if (isCompleted) return;
        const nx = playerX + dx;
        const ny = playerY + dy;
        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && !isObstacle(nx, ny)) {
            setPlayerX(nx);
            setPlayerY(ny);
        }
    };

    useEffect(() => {
        if (playerX === data.endX && playerY === data.endY && !isCompleted) {
            setIsCompleted(true);
            setTimeout(() => onComplete(100), 1000);
        }
    }, [playerX, playerY, data, isCompleted, onComplete]);

    if (!isActive) return null;

    return (
        <div className="space-y-6 flex flex-col items-center">
            <h3 className="font-bold text-lg text-center">{data.instruction}</h3>

            <div className="grid grid-cols-10 gap-1 p-2 glass border-glass-border rounded-xl">
                {Array.from({ length: 100 }).map((_, i) => {
                    const x = i % 10;
                    const y = Math.floor(i / 10);
                    const isP = x === playerX && y === playerY;
                    const isE = x === data.endX && y === data.endY;
                    const isO = isObstacle(x, y);

                    return (
                        <div
                            key={i}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded flex items-center justify-center text-xs ${isP ? 'bg-primary' : isE ? 'bg-success' : isO ? 'bg-destructive/50' : 'bg-glass/20'
                                }`}
                        >
                            {isP ? '🏃' : isE ? '🏁' : isO ? '🚫' : ''}
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div />
                <Button size="icon" variant="outline" onClick={() => move(0, -1)}><ArrowUp /></Button>
                <div />
                <Button size="icon" variant="outline" onClick={() => move(-1, 0)}><ArrowLeft /></Button>
                <Button size="icon" variant="outline" onClick={() => move(0, 1)}><ArrowDown /></Button>
                <Button size="icon" variant="outline" onClick={() => move(1, 0)}><ArrowRight /></Button>
            </div>
        </div>
    );
};

export default MazeGame;
