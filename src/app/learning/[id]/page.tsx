"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { useEnrollment } from '@/hooks/useEnrollment';
import { modules } from '@/data/modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, CheckCircle, Lock } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import GameComponent from '@/components/GameComponent';
import QuizComponent from '@/components/QuizComponent';
import { useToast } from '@/hooks/use-toast';

export default function ModulePage() {
    const params = useParams();
    const moduleId = params.id as string;
    const router = useRouter();
    const { user } = useAuth();
    const { canAccessModule, getModuleProgress, updateModuleProgress } = useProgress();
    const { toast } = useToast();
    const { isEnrolledIn, enrollInModule, completeModule } = useEnrollment();

    const [currentStage, setCurrentStage] = useState<'video' | 'game' | 'quiz'>('video');
    const [videoProgress, setVideoProgress] = useState(0);
    const videoHandledRef = React.useRef(false);

    const module = modules.find(m => m.id === moduleId);
    const modProgress = getModuleProgress(moduleId || '');
    const canAccess = canAccessModule(moduleId || '');

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (module && !canAccess) {
            toast({ title: "Module Locked", variant: "destructive" });
            router.push('/learning');
        }
    }, [user, canAccess, module, router, toast]);

    useEffect(() => {
        if (user && moduleId && !isEnrolledIn(moduleId)) {
            enrollInModule(moduleId);
        }
    }, [user, moduleId, isEnrolledIn, enrollInModule]);

    if (!module) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold">Module Not Found</h1>
                <p>The module with ID {moduleId} could not be found.</p>
                <Button onClick={() => router.push('/learning')} className="mt-4">Back to Learning</Button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!canAccess) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold text-destructive">Module Locked</h1>
                <p>Please complete the previous modules to unlock this one.</p>
                <Button onClick={() => router.push('/learning')} className="mt-4">Back to Learning</Button>
            </div>
        );
    }

    const handleVideoProgress = (percentage: number) => {
        setVideoProgress(percentage);
        if (percentage >= 95 && !modProgress?.videoWatched && !videoHandledRef.current) {
            videoHandledRef.current = true;
            updateModuleProgress(moduleId, { videoWatched: true });
            toast({ title: "Video Complete!", description: "Activity unlocked!" });
            setCurrentStage('game');
        }
    };

    const handleGameComplete = (score: number) => {
        updateModuleProgress(moduleId, { gameCompleted: true });
        toast({ title: "Game Complete!", description: "Final assessment unlocked!" });
        setCurrentStage('quiz');
    };

    const handleQuizComplete = async (score: number) => {
        updateModuleProgress(moduleId, { quizCompleted: true, score });
        await completeModule(moduleId);
        toast({ title: "Module Mastered!", description: `Scored ${score} points! You've earned a new badge!` });
    };

    const nextModuleId = (parseInt(moduleId) + 1).toString();
    const hasNextModule = modules.some(m => m.id === nextModuleId);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <Button variant="ghost" onClick={() => router.push('/learning')} className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modules
            </Button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Module {module.id}: {module.title}</h1>
                <p className="text-muted-foreground">{module.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-8">
                {['video', 'game', 'quiz'].map((stage: any) => {
                    const isDone = stage === 'video' ? modProgress?.videoWatched :
                        stage === 'game' ? modProgress?.gameCompleted :
                            modProgress?.quizCompleted;
                    const isActive = currentStage === stage;
                    const locked = stage === 'game' ? !modProgress?.videoWatched :
                        stage === 'quiz' ? !modProgress?.gameCompleted : false;

                    return (
                        <button
                            key={stage}
                            disabled={locked}
                            onClick={() => setCurrentStage(stage)}
                            className={`p-4 rounded-xl border transition-all ${isActive ? 'bg-primary/20 border-primary text-primary' :
                                isDone ? 'bg-success/10 border-success text-success' :
                                    locked ? 'opacity-40 grayscale cursor-not-allowed border-glass-border' :
                                        'glass border-glass-border hover:bg-glass/50'
                                }`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                {isDone ? <CheckCircle className="h-6 w-6" /> : locked ? <Lock className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                <span className="text-xs font-bold uppercase tracking-wider">{stage}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <Card className="glass border-glass-border overflow-hidden">
                <CardContent className="p-6">
                    {currentStage === 'video' && (
                        <VideoPlayer videoId={module.videoId} onProgress={handleVideoProgress} watchPercentage={videoProgress} />
                    )}
                    {currentStage === 'game' && <GameComponent module={module} onComplete={handleGameComplete} />}
                    {currentStage === 'quiz' && (
                        <div className="space-y-6">
                            <QuizComponent questions={module.quizQuestions} onComplete={handleQuizComplete} />
                            {modProgress?.quizCompleted && hasNextModule && (
                                <div className="flex justify-center pt-4 border-t border-border">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto animate-pulse"
                                        onClick={() => router.push(`/learning/${nextModuleId}`)}
                                    >
                                        Go to Next Module <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                    </Button>
                                </div>
                            )}
                            {modProgress?.quizCompleted && !hasNextModule && (
                                <div className="flex justify-center pt-4 border-t border-border">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto"
                                        onClick={() => router.push(`/certificate`)}
                                    >
                                        Get Certificate <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
