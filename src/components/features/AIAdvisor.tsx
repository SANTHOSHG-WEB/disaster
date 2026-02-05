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

    useEffect(() => {
        // Simulate AI "Thinking"
        const timer = setTimeout(() => {
            analyzeProgress();
            setIsTyping(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [progress, modules]);

    const analyzeProgress = () => {
        // Simple Rule-Based AI Logic
        const completedModules = Object.values(progress.modules).filter((m: any) => m.completedAt).length;

        let nextModule = modules.find(m => {
            const modProgress = progress.modules[m.id];
            return !modProgress?.completedAt;
        });

        if (nextModule) {
            setRecommendation(nextModule);
            setAdvice(`Based on your progress, I recommend diving into "${nextModule.title}". It's the next logical step to build your disaster resilience.`);
        } else if (completedModules === modules.length) {
            setAdvice("Impressive! You've completed all available modules. You're now a certified disaster preparedness expert. Consider reviewing 'First Aid Basics' to keep your skills sharp.");
        } else {
            setAdvice("Welcome to your learning journey! Start with Module 1 to build a strong foundation in safety protocols.");
            setRecommendation(modules[0]);
        }
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
