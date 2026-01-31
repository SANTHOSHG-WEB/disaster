"use client";

import React, { useState } from 'react';
import { Module } from '@/data/modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DragDropGame from './games/DragDropGame';
import MazeGame from './games/MazeGame';
import SpotHazardGame from './games/SpotHazardGame';
import MemoryMatchGame from './games/MemoryMatchGame';
import SimulationGame from './games/SimulationGame';

interface GameComponentProps {
    module: Module;
    onComplete: (score: number) => void;
}

const GameComponent: React.FC<GameComponentProps> = ({ module, onComplete }) => {
    const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
    const [score, setScore] = useState(0);

    const handleGameComplete = (gameScore: number) => {
        setScore(gameScore);
        setGameState('completed');
    };

    if (gameState === 'ready') {
        return (
            <Card className="glass border-glass-border text-center p-8">
                <Badge className="mb-4">Interactive Challenge</Badge>
                <CardTitle className="mb-2 text-2xl">{module.title} Game</CardTitle>
                <CardDescription className="mb-6">{module.gameData.instruction || "Test your skills in this interactive activity"}</CardDescription>
                <Button onClick={() => setGameState('playing')} size="lg" className="px-8 transform hover:scale-105 transition-transform">Start Game</Button>
            </Card>
        );
    }

    if (gameState === 'completed') {
        return (
            <Card className="glass border-glass-border text-center p-12">
                <div className="text-6xl mb-4">🎉</div>
                <CardTitle className="text-3xl mb-2">Challenge Completed!</CardTitle>
                <div className="text-5xl font-bold text-primary my-4">{score} Points</div>
                <p className="text-muted-foreground mb-8">You've successfully completed this module's interactive challenge.</p>
                <Badge variant="outline" className="text-lg py-2 px-4 glass border-success text-success mb-6">Assessments Unlocked</Badge>
                <div>
                    <Button onClick={() => onComplete(score)} size="lg" className="w-full sm:w-auto">
                        Continue to Quiz
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {module.gameType === 'drag-drop' && <DragDropGame data={module.gameData} onComplete={handleGameComplete} isActive={true} />}
            {module.gameType === 'maze' && <MazeGame data={module.gameData} onComplete={handleGameComplete} isActive={true} />}
            {module.gameType === 'spot-hazard' && <SpotHazardGame data={module.gameData} onComplete={handleGameComplete} isActive={true} />}
            {module.gameType === 'memory-match' && <MemoryMatchGame data={module.gameData} onComplete={handleGameComplete} isActive={true} />}
            {module.gameType === 'simulation' && <SimulationGame data={module.gameData} onComplete={handleGameComplete} isActive={true} />}
        </div>
    );
};

export default GameComponent;
