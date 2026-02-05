"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScenarioOption {
    id: string;
    text: string;
    correct: boolean;
    feedback: string;
}

interface Scenario {
    id: number;
    phase: string;
    description: string;
    options: ScenarioOption[];
}

interface EarthquakeSimulationGameProps {
    data: {
        instruction: string;
        scenarios: Scenario[];
    };
    onComplete: (score: number) => void;
    isActive: boolean;
}

const EarthquakeSimulationGame: React.FC<EarthquakeSimulationGameProps> = ({ data, onComplete, isActive }) => {
    const { toast } = useToast();
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [timeLeft, setTimeLeft] = useState(100);
    const [gameStatus, setGameStatus] = useState<'intro' | 'active' | 'feedback' | 'finished'>('intro');
    const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

    const currentScenario = data.scenarios[currentScenarioIndex];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStatus === 'active' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        handleTimeOut();
                        return 0;
                    }
                    return prev - 2; // Decrease over ~5 seconds
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [gameStatus, timeLeft]);

    const handleTimeOut = () => {
        setGameStatus('feedback');
        setFeedback({ message: "Time's up! Panic caused hesitation.", isCorrect: false });
        setIsShaking(false);
    };

    const startGame = () => {
        setGameStatus('active');
        setCurrentScenarioIndex(0);
        startScenario();
    };

    const startScenario = () => {
        setTimeLeft(100);
        setIsShaking(true);
        setGameStatus('active');
        setFeedback(null);
    };

    const handleOptionClick = (option: ScenarioOption) => {
        setIsShaking(false);
        setGameStatus('feedback');
        setFeedback({ message: option.feedback, isCorrect: option.correct });

        if (!option.correct) {
            toast({
                title: "Incorrect Choice",
                description: option.feedback,
                variant: "destructive"
            });
        } else {
            toast({
                title: "Excellent!",
                description: "Right move!",
                className: "bg-success text-white border-none"
            });
        }
    };

    const handleNext = () => {
        if (feedback?.isCorrect) {
            if (currentScenarioIndex < data.scenarios.length - 1) {
                setCurrentScenarioIndex(prev => prev + 1);
                startScenario();
            } else {
                setGameStatus('finished');
                onComplete(100);
            }
        } else {
            // Restart current scenario
            startScenario();
        }
    };

    if (!isActive) return null;

    if (gameStatus === 'finished') {
        return (
            <div className="text-center p-8">
                <ShieldCheck className="w-24 h-24 mx-auto text-success mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold mb-2 text-success">Simulation Survived!</h2>
                <p>You made the right safety choices.</p>
            </div>
        );
    }

    if (gameStatus === 'intro') {
        return (
            <div className="text-center p-8 space-y-6">
                <AlertTriangle className="w-20 h-20 mx-auto text-accent mb-4" />
                <h2 className="text-2xl font-bold">{data.instruction}</h2>
                <p className="max-w-md mx-auto text-muted-foreground">
                    You will experience a simulated earthquake. You have limited time to make the correct safety decision for each phase.
                </p>
                <Button size="lg" onClick={startGame} className="animate-pulse">Start Simulation</Button>
            </div>
        );
    }

    return (
        <div className={`space-y-6 transition-transform duration-100 ${isShaking ? 'animate-shake' : ''}`}>
            {/* CSS Shake Keyframes defined globally or we can use inline style for quick hack, 
                but tailwind animate-shake usually isn't default. Let's rely on a custom class or inline style if needed.
                actually, let's inject style for shake */}
            <style jsx>{`
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
                .animate-shake {
                    animation: shake 0.5s;
                    animation-iteration-count: infinite;
                }
            `}</style>

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Activity className={`w-6 h-6 ${isShaking ? 'text-destructive animate-pulse' : 'text-primary'}`} />
                    {currentScenario.phase}
                </h3>
                {gameStatus === 'active' && (
                    <div className="w-24 text-right font-mono font-bold text-destructive">
                        {Math.ceil(timeLeft / 20)}s
                    </div>
                )}
            </div>

            {gameStatus === 'active' && (
                <Progress value={timeLeft} className="h-2 mb-6 transition-all duration-100 ease-linear" />
            )}

            <Card className={`glass border-glass-border p-8 min-h-[300px] flex flex-col justify-center items-center text-center transition-colors duration-500 ${isShaking ? 'bg-destructive/10 border-destructive' : ''}`}>

                {gameStatus === 'active' ? (
                    <>
                        <h2 className="text-2xl font-black mb-8">{currentScenario.description}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            {currentScenario.options.map(option => (
                                <Button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    variant="outline"
                                    className="h-auto py-6 text-lg hover:bg-primary hover:text-white transition-all transform hover:scale-105"
                                >
                                    {option.text}
                                </Button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className={`text-6xl ${feedback?.isCorrect ? 'text-success' : 'text-destructive'}`}>
                            {feedback?.isCorrect ? '✓' : '✗'}
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold mb-2 ${feedback?.isCorrect ? 'text-success' : 'text-destructive'}`}>
                                {feedback?.isCorrect ? 'Correct!' : 'Incorrect'}
                            </h3>
                            <p className="text-lg">{feedback?.message}</p>
                        </div>
                        <Button onClick={handleNext} size="lg" variant={feedback?.isCorrect ? "default" : "secondary"}>
                            {feedback?.isCorrect ? "Next Phase" : "Try Again"}
                        </Button>
                    </div>
                )}

            </Card>
        </div>
    );
};

export default EarthquakeSimulationGame;
