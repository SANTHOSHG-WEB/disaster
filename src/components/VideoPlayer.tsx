"use client";

import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Card } from '@/components/ui/card';

interface VideoPlayerProps {
    videoId: string;
    onProgress: (percentage: number) => void;
    watchPercentage: number;
}

const VideoPlayer = ({
    videoId,
    onProgress,
    watchPercentage
}: VideoPlayerProps) => {
    const playerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            fs: 1,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 1,
            playsinline: 1,
            enablejsapi: 1,
        },
    };

    const onReady = (event: any) => {
        playerRef.current = event.target;
        setDuration(event.target.getDuration());
    };

    const onPlay = () => {
        setIsPlaying(true);
        progressIntervalRef.current = setInterval(() => {
            if (playerRef.current) {
                const current = playerRef.current.getCurrentTime();
                const total = playerRef.current.getDuration();
                if (total > 0) {
                    setCurrentTime(current);
                    onProgress((current / total) * 100);
                }
            }
        }, 1000);
    };

    const onPause = () => {
        setIsPlaying(false);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    const onEnd = () => {
        onPause();
        onProgress(100);
    };

    const onStateChange = (event: any) => {
        if (event.data === 1) onPlay();
        else if (event.data === 2) onPause();
        else if (event.data === 0) onEnd();
    };

    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden glass border-glass-border">
                <div className="aspect-video w-full">
                    <YouTube
                        videoId={videoId}
                        opts={opts}
                        onReady={onReady}
                        onStateChange={onStateChange}
                        className="w-full h-full"
                        iframeClassName="w-full h-full"
                    />
                </div>
            </Card>

            <div className="glass p-4 rounded-lg">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress: {Math.round(watchPercentage)}%</span>
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                    {watchPercentage >= 95 ? (
                        <span className="text-success">✓ Video completed!</span>
                    ) : (
                        <span>Watch 95% to unlock next stage</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
