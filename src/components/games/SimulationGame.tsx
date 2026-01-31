"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertTriangle, ShieldCheck, Flame, Info } from 'lucide-react';
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

interface SimulationGameProps {
    data: {
        instruction: string;
        scenarios: Scenario[];
        theme?: 'earthquake' | 'fire' | 'flood' | 'general';
    };
    onComplete: (score: number) => void;
    isActive: boolean;
}

const SimulationGame: React.FC<SimulationGameProps> = ({ data, onComplete, isActive }) => {
    const { toast } = useToast();
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(100);
    const [gameStatus, setGameStatus] = useState<'intro' | 'active' | 'feedback' | 'finished'>('intro');
    const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
    const [effectActive, setEffectActive] = useState(false);

    const currentScenario = data.scenarios[currentScenarioIndex];
    const theme = data.theme || 'general';

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
        setFeedback({ message: "Time's up! hesitation can be dangerous.", isCorrect: false });
        setEffectActive(false);
    };

    const startGame = () => {
        setGameStatus('active');
        setCurrentScenarioIndex(0);
        startScenario();
    };

    const startScenario = () => {
        setTimeLeft(100);
        setEffectActive(true);
        setGameStatus('active');
        setFeedback(null);
    };

    const handleOptionClick = (option: ScenarioOption) => {
        setEffectActive(false);
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
                <h2 className="text-2xl font-bold mb-2 text-success">Simulation Completed!</h2>
                <p>You made the right safety choices.</p>
            </div>
        );
    }

    // Theme specific configs
    const getThemeConfig = () => {
        switch (theme) {
            case 'fire':
                return {
                    icon: <Flame className="w-20 h-20 mx-auto text-orange-600 mb-4 animate-pulse" />,
                    bgClass: effectActive ? 'bg-orange-500/10 border-orange-500 animate-pulse' : '',
                    containerClass: '',
                    titleClass: 'text-orange-600'
                };
            case 'earthquake':
                return {
                    icon: <Activity className="w-20 h-20 mx-auto text-yellow-600 mb-4" />,
                    bgClass: effectActive ? 'bg-yellow-500/10 border-yellow-500' : '',
                    containerClass: effectActive ? 'animate-shake' : '',
                    titleClass: 'text-yellow-600'
                };
            case 'flood':
                return {
                    icon: <Info className="w-20 h-20 mx-auto text-blue-500 mb-4" />,
                    bgClass: effectActive ? 'bg-blue-500/10 border-blue-500' : '',
                    containerClass: '',
                    titleClass: 'text-blue-500'
                };
            default:
                return {
                    icon: <AlertTriangle className="w-20 h-20 mx-auto text-gray-500 mb-4" />,
                    bgClass: '',
                    containerClass: '',
                    titleClass: ''
                };
        }
    };

    const themeConfig = getThemeConfig();

    if (gameStatus === 'intro') {
        return (
            <div className="text-center p-8 space-y-6">
                {themeConfig.icon}
                <h2 className="text-2xl font-bold">{data.instruction}</h2>
                <p className="max-w-md mx-auto text-muted-foreground">
                    You will experience a simulated emergency scenarios. Make the correct safety decision quickly!
                </p>
                <Button size="lg" onClick={startGame} className="animate-pulse">Start Simulation</Button>
            </div>
        );
    }

    return (
        <div className={`space-y-6 transition-all duration-300 ${themeConfig.containerClass}`}>
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
                    animation: shake 0.5s infinite;
                }
            `}</style>

            <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${themeConfig.titleClass}`}>
                    {theme === 'earthquake' ? <Activity className="w-6 h-6" /> :
                        theme === 'fire' ? <Flame className="w-6 h-6" /> :
                            <AlertTriangle className="w-6 h-6" />}
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

            <Card className={`glass border-glass-border p-8 min-h-[300px] flex flex-col justify-center items-center text-center transition-colors duration-500 ${themeConfig.bgClass}`}>

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

export default SimulationGame;
