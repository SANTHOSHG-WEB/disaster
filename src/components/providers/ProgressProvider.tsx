"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';

interface ModuleProgress {
    moduleId: string;
    videoWatched: boolean;
    gameCompleted: boolean;
    quizCompleted: boolean;
    score: number;
    completedAt?: string;
}

interface UserProgress {
    modules: Record<string, ModuleProgress>;
    points: number;
    badges: string[];
    certificateEarned: boolean;
}

interface ProgressContextType {
    progress: UserProgress;
    updateModuleProgress: (moduleId: string, updates: Partial<ModuleProgress>) => void;
    getModuleProgress: (moduleId: string) => ModuleProgress | null;
    canAccessModule: (moduleId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [progress, setProgress] = useState<UserProgress>({
        modules: {},
        points: 0,
        badges: [],
        certificateEarned: false
    });

    // Load from LocalStorage on Mount/User Change
    useEffect(() => {
        if (user) {
            const savedProgress = localStorage.getItem(`dme_progress_${user.id}`);
            if (savedProgress) {
                try {
                    setProgress(JSON.parse(savedProgress));
                } catch (e) {
                    console.error("Failed to parse progress", e);
                }
            }
        }
    }, [user]);

    // DB Sync (Skipped in Mock Mode)
    useEffect(() => {
        const loadFromDb = async () => {
            if (!user) {
                console.log("Progress Sync: No user, skipping DB load.");
                return;
            }

            // internal check for mock mode
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const isMockMode = url?.includes('your-project');

            console.log("Progress Sync: Starting load...", { isMockMode, userId: user.id });

            if (isMockMode) {
                console.log("Progress Sync: In mock mode, using LocalStorage only.");
                return;
            }

            const { data, error } = await supabase
                .from('module_progress')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                console.error("Progress Sync: Error loading from Supabase:", error);
                return;
            }

            console.log("Progress Sync: Data received from Supabase:", data);

            if (data && data.length > 0) {
                setProgress(prev => {
                    const modulesFromDb: Record<string, ModuleProgress> = { ...prev.modules };

                    data.forEach((row: any) => {
                        const isDone = row.quiz_completed && row.video_watched && row.game_completed;
                        modulesFromDb[row.module_id] = {
                            moduleId: row.module_id,
                            videoWatched: row.video_watched || false,
                            gameCompleted: row.game_completed || false,
                            quizCompleted: row.quiz_completed || false,
                            score: row.quiz_score || 0,
                            completedAt: isDone ? row.updated_at : undefined
                        };
                    });

                    // Recalculate points/stats
                    let totalPoints = 0;
                    let completedModules = 0;
                    const earnedBadges: string[] = [];
                    Object.values(modulesFromDb).forEach(m => {
                        if (m.quizCompleted) {
                            completedModules++;
                            totalPoints += 100 + m.score;
                            earnedBadges.push(`badge-module-${m.moduleId}`);
                        }
                    });

                    if (completedModules >= 10) {
                        earnedBadges.push('badge-master-disaster-manager');
                    }

                    console.log("Progress Sync: State updated from DB", {
                        modulesCount: Object.keys(modulesFromDb).length,
                        totalPoints,
                        completedModules,
                        badgesCount: earnedBadges.length
                    });

                    return {
                        ...prev,
                        modules: modulesFromDb,
                        points: totalPoints,
                        badges: earnedBadges,
                        certificateEarned: completedModules >= 10,
                    };
                });
            } else {
                console.log("Progress Sync: No records found in Supabase for this user.");
            }
        };

        loadFromDb();
    }, [user]);

    // Save to LocalStorage on Change
    useEffect(() => {
        if (user) {
            localStorage.setItem(`dme_progress_${user.id}`, JSON.stringify(progress));
        }
    }, [progress, user]);

    const updateModuleProgress = (moduleId: string, updates: Partial<ModuleProgress>) => {
        // internal check for mock mode
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const isMockMode = url?.includes('your-project');

        setProgress(prev => {
            const moduleProgress = prev.modules[moduleId] || {
                moduleId,
                videoWatched: false,
                gameCompleted: false,
                quizCompleted: false,
                score: 0
            };

            const updatedModule = { ...moduleProgress, ...updates };

            const isDone = updatedModule.videoWatched &&
                updatedModule.gameCompleted &&
                updatedModule.quizCompleted;

            if (isDone && !moduleProgress.completedAt) {
                updatedModule.completedAt = new Date().toISOString();
            }

            // Create new modules object
            const newModules = {
                ...prev.modules,
                [moduleId]: updatedModule
            };

            // Recalculate derived state
            let totalPoints = 0;
            let completedModules = 0;
            const earnedBadges: string[] = [];

            Object.values(newModules).forEach(m => {
                if (m.quizCompleted) {
                    completedModules++;
                    totalPoints += 100 + m.score;
                    earnedBadges.push(`badge-module-${m.moduleId}`);
                }
            });

            if (completedModules >= 10) {
                earnedBadges.push('badge-master-disaster-manager');
            }

            // Async DB Sync (performed as a side effect outside of functional update)
            setTimeout(() => {
                if (!isMockMode && user) {
                    console.log("Progress Sync: Saving to Supabase...", { moduleId, updates });
                    supabase
                        .from('module_progress')
                        .upsert({
                            user_id: user.id,
                            module_id: moduleId,
                            video_watched: updatedModule.videoWatched,
                            game_completed: updatedModule.gameCompleted,
                            quiz_completed: updatedModule.quizCompleted,
                            quiz_score: updatedModule.score,
                            status: isDone ? 'completed' : 'in-progress',
                            updated_at: new Date().toISOString()
                        })
                        .then(({ error }: { error: any }) => {
                            if (error) console.error("Progress Sync: Error saving to DB:", error);
                            else console.log("Progress Sync: Successfully saved to DB.");
                        });
                }
            }, 0);

            return {
                ...prev,
                modules: newModules,
                points: totalPoints,
                badges: earnedBadges,
                certificateEarned: completedModules >= 10,
            };
        });
    };

    const getModuleProgress = (moduleId: string) => progress.modules[moduleId] || null;

    const canAccessModule = (moduleId: string) => {
        if (moduleId === '1') return true;

        // Debug hack for testing (optional): allow access if prev module ID is lower
        // But logic: need prev ID completed
        const prevId = (parseInt(moduleId) - 1).toString();
        const prevProgress = getModuleProgress(prevId);

        return !!prevProgress?.completedAt;
    };

    return (
        <ProgressContext.Provider value={{
            progress,
            updateModuleProgress,
            getModuleProgress,
            canAccessModule
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgressContext = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgressContext must be used within a ProgressProvider');
    }
    return context;
};
