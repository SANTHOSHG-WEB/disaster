"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

interface Enrollment {
    id: string;
    user_id: string;
    module_id: string;
    completed: boolean;
    enrolled_at: string;
    completed_at?: string;
}

export const useEnrollment = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchEnrollments();
        }
    }, [user]);

    const fetchEnrollments = async () => {
        if (!user) return;

        try {
            // Check for mock mode
            const isMockMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project');

            if (isMockMode) {
                // Return mock data or empty array if no local data
                // For now, we rely on local state updates in mock mode
                // In a real app, we might check localStorage here too to persist across reloads
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('enrollments')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                console.error('Error fetching enrollments:', error);
                return;
            }

            setEnrollments(data || []);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const enrollInModule = async (moduleId: string) => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please log in to enroll.",
                variant: "destructive",
            });
            return false;
        }

        try {
            // Check for mock mode
            const isMockMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project');

            if (isMockMode) {
                const newEnrollment: Enrollment = {
                    id: `mock-enrollment-${moduleId}`,
                    user_id: user.id,
                    module_id: moduleId,
                    completed: false,
                    enrolled_at: new Date().toISOString()
                };

                setEnrollments(prev => [...prev, newEnrollment]);

                toast({
                    title: "Enrollment Successful",
                    description: `Enrolled in Module ${moduleId}.`,
                });
                return true;
            }

            const { error } = await supabase
                .from('enrollments')
                .insert([{
                    user_id: user.id,
                    module_id: moduleId,
                    completed: false
                }]);

            if (error) {
                if (error.code === '23505') return true;
                throw error;
            }

            toast({
                title: "Enrollment Successful",
                description: `Enrolled in Module ${moduleId}.`,
            });

            await fetchEnrollments();
            return true;
        } catch (error) {
            console.error('Error enrolling:', error);
            toast({
                title: "Enrollment Failed",
                variant: "destructive",
            });
            return false;
        }
    };

    const completeModule = async (moduleId: string) => {
        if (!user) return false;

        try {
            // Check for mock mode
            const isMockMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project');

            if (isMockMode) {
                setEnrollments(prev => prev.map(e =>
                    e.module_id === moduleId
                        ? { ...e, completed: true, completed_at: new Date().toISOString() }
                        : e
                ));

                toast({
                    title: "Module Completed",
                });
                return true;
            }

            const { error } = await supabase
                .from('enrollments')
                .update({
                    completed: true,
                    completed_at: new Date().toISOString()
                })
                .eq('user_id', user.id)
                .eq('module_id', moduleId);

            if (error) throw error;

            toast({
                title: "Module Completed",
            });

            await fetchEnrollments();
            return true;
        } catch (error) {
            console.error('Error completing:', error);
            return false;
        }
    };

    const isEnrolledIn = (moduleId: string) => enrollments.some(e => e.module_id === moduleId);
    const isModuleCompleted = (moduleId: string) => enrollments.some(e => e.module_id === moduleId && e.completed);

    const getCompletionPercentage = () => {
        const totalModules = 10;
        const completedModules = enrollments.filter(e => e.completed).length;
        return Math.round((completedModules / totalModules) * 100);
    };

    return {
        enrollments,
        isLoading,
        enrollInModule,
        completeModule,
        isEnrolledIn,
        isModuleCompleted,
        getCompletionPercentage,
        fetchEnrollments
    };
};
