"use client";

import { useProgressContext } from '@/components/providers/ProgressProvider';

// Re-export the context hook as the default hook to maintain compatibility
export const useProgress = () => {
    return useProgressContext();
};
