"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, ArrowRight, BrainCircuit, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface AIAdvisorProps {
    modules: any[];
    progress: any;
}

export default function AIAdvisor({ modules, progress }: AIAdvisorProps) {
    const router = useRouter();
    const [advice, setAdvice] = useState<string>("");
    const [isTyping, setIsTyping] = useState(true);
    const [recommendation, setRecommendation] = useState<any>(null);
    const [stats, setStats] = useState<{ avgScore: number; completionRate: number; hasProgress: boolean }>({
        avgScore: 0,
        completionRate: 0,
        hasProgress: false
    });

    useEffect(() => {
        // Simulate AI "Thinking"
        const timer = setTimeout(() => {
            analyzeProgress();
            setIsTyping(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [progress, modules]);

    const analyzeProgress = () => {
        // Enhanced AI Logic with Engagement Analytics
        const completedModules = Object.values(progress.modules).filter((m: any) => m.completedAt);
        const allModules = Object.values(progress.modules);

        // Calculate engagement metrics
        let totalScore = 0;
        let scoredModules = 0;
        const weakModules: any[] = [];
        const incompleteActivities: any[] = [];

        allModules.forEach((mod: any) => {
            // Track quiz scores
            if (mod.quizCompleted && mod.score !== undefined) {
                totalScore += mod.score;
                scoredModules++;

                // Identify weak areas (score < 70%)
                if (mod.score < 70) {
                    const moduleData = modules.find(m => m.id === mod.moduleId);
                    weakModules.push({
                        id: mod.moduleId,
                        title: moduleData?.title || `Module ${mod.moduleId}`,
                        score: mod.score
                    });
                }
            }

            // Detect incomplete activities
            const hasActivity = mod.videoWatched || mod.gameCompleted || mod.quizCompleted;
            const isComplete = mod.videoWatched && mod.gameCompleted && mod.quizCompleted;
            if (hasActivity && !isComplete) {
                const moduleData = modules.find(m => m.id === mod.moduleId);
                incompleteActivities.push({
                    id: mod.moduleId,
                    title: moduleData?.title || `Module ${mod.moduleId}`,
                    missing: [
                        !mod.videoWatched && 'Video',
                        !mod.gameCompleted && 'Game',
                        !mod.quizCompleted && 'Quiz'
                    ].filter(Boolean)
                });
            }
        });

        const avgScore = scoredModules > 0 ? Math.round(totalScore / scoredModules) : 0;
        const completionRate = modules.length > 0 ? Math.round((completedModules.length / modules.length) * 100) : 0;

        // Update stats for UI display
        setStats({
            avgScore,
            completionRate,
            hasProgress: scoredModules > 0 || completedModules.length > 0
        });

        // Generate intelligent recommendations
        let adviceText = "";
        let nextModule = modules.find(m => {
            const modProgress = progress.modules[m.id];
            return !modProgress?.completedAt;
        });

        // Priority 1: Incomplete activities in current modules
        if (incompleteActivities.length > 0) {
            const incomplete = incompleteActivities[0];
            adviceText = `I notice you've started "${incomplete.title}" but haven't completed all activities. Finishing ${incomplete.missing.join(' and ')} will help reinforce your learning and unlock the next module!`;
            setRecommendation(modules.find(m => m.id === incomplete.id));
        }
        // Priority 2: Weak areas that need review
        else if (weakModules.length > 0) {
            const weakest = weakModules.sort((a, b) => a.score - b.score)[0];
            adviceText = `Your quiz score for "${weakest.title}" was ${weakest.score}%. I recommend reviewing this module to strengthen your understanding. Disaster preparedness requires solid fundamentals!`;
            setRecommendation(modules.find(m => m.id === weakest.id));
        }
        // Priority 3: High performer - encourage progression
        else if (avgScore >= 80 && completedModules.length > 0) {
            if (nextModule) {
                adviceText = `Excellent work! You're maintaining an impressive ${avgScore}% average. Your strong foundation makes you ready for "${nextModule.title}". Keep up this outstanding performance!`;
                setRecommendation(nextModule);
            } else {
                adviceText = `Outstanding achievement! You've completed all modules with a ${avgScore}% average. You're now a certified disaster preparedness expert. Consider reviewing key modules to maintain your expertise.`;
                setRecommendation(modules[0]); // Suggest reviewing first module
            }
        }
        // Priority 4: Standard progression
        else if (nextModule) {
            if (completedModules.length > 0) {
                adviceText = `You're making steady progress with a ${avgScore}% average. Ready for the next challenge? "${nextModule.title}" builds on what you've learned and introduces critical new skills.`;
            } else {
                adviceText = `Welcome to your learning journey! Start with "${nextModule.title}" to build a strong foundation in disaster preparedness. Each module includes engaging videos, interactive games, and knowledge checks.`;
            }
            setRecommendation(nextModule);
        }
        // Priority 5: All complete
        else {
            adviceText = `Congratulations! You've completed all ${modules.length} modules with a ${avgScore}% average. You're now equipped to handle emergency situations confidently. Keep your skills sharp by reviewing key topics!`;
            setRecommendation(weakModules.length > 0 ? modules.find(m => m.id === weakModules[0].id) : modules[0]);
        }

        setAdvice(adviceText);
    };

    return (
        <Card className="glass border-primary/20 bg-primary/5 mb-8 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">

                    {/* AVATAR SECTION */}
                    <div className="shrink-0 flex flex-col items-center gap-2">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 ring-2 ring-background">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
                            </div>
                        </div>
                        <span className="text-xs font-bold text-primary tracking-wide">AI ADVISOR</span>
                    </div>

                    {/* CONTENT SECTION */}
                    <div className="flex-1 space-y-3 w-full">
                        <div className="flex items-center gap-2 mb-1">
                            <BrainCircuit className="w-4 h-4 text-primary" />
                            <h3 className="font-bold text-lg">Personalized Recommendation</h3>
                        </div>

                        <div className="bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-border/50 shadow-inner min-h-[80px]">
                            {isTyping ? (
                                <div className="flex items-center gap-1 h-full">
                                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></span>
                                    <span className="ml-2 text-sm text-muted-foreground">Analyzing your learning patterns...</span>
                                </div>
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-glass-foreground leading-relaxed"
                                >
                                    {advice}
                                </motion.p>
                            )}
                        </div>

                        {/* Engagement Stats */}
                        {stats.hasProgress && !isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-3 border border-primary/20">
                                    <div className="text-xs text-muted-foreground mb-1">Avg Quiz Score</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-2xl font-bold ${stats.avgScore >= 80 ? 'text-emerald-500' :
                                                stats.avgScore >= 70 ? 'text-amber-500' :
                                                    'text-red-500'
                                            }`}>
                                            {stats.avgScore}%
                                        </span>
                                        <span className="text-xs font-medium">
                                            {stats.avgScore >= 80 ? '🌟 Excellent' :
                                                stats.avgScore >= 70 ? '👍 Good' :
                                                    '📚 Needs Review'}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-3 border border-accent/20">
                                    <div className="text-xs text-muted-foreground mb-1">Course Progress</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-accent">{stats.completionRate}%</span>
                                        <span className="text-xs font-medium text-muted-foreground">Complete</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {recommendation && !isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap gap-3 pt-2"
                            >
                                <Button
                                    onClick={() => router.push(`/learning/${recommendation.id}`)}
                                    className="bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 group transition-all"
                                >
                                    Start {recommendation.title}
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Button variant="outline" className="border-primary/20 hover:bg-primary/5 hover:text-primary">
                                    <Lightbulb className="mr-2 w-4 h-4" />
                                    Why this module?
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
