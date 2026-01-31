"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface DragDropItem {
    id: number;
    text: string;
    category: string;
}

interface DragDropCategory {
    id: string;
    label: string;
}

interface DragDropGameProps {
    data: {
        instruction: string;
        items: DragDropItem[];
        categories?: DragDropCategory[];
    };
    onComplete: (score: number) => void;
    isActive: boolean;
}

const DragDropGame: React.FC<DragDropGameProps> = ({ data, onComplete, isActive }) => {
    const { toast } = useToast();
    const [availableItems, setAvailableItems] = useState<DragDropItem[]>(data.items);
    const [categorizedItems, setCategorizedItems] = useState<Record<string, DragDropItem[]>>({});
    const [isCompleted, setIsCompleted] = useState(false);

    const handleDragStart = (e: React.DragEvent, item: DragDropItem) => {
        e.dataTransfer.setData('text', JSON.stringify(item));
    };

    const handleDrop = (e: React.DragEvent, categoryId: string) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData('text')) as DragDropItem;

        // Validation Logic
        if (item.category !== categoryId) {
            toast({
                title: "Incorrect Category",
                description: "Try again! That item doesn't belong there.",
                variant: "destructive"
            });
            return;
        }

        setCategorizedItems(prev => ({
            ...prev,
            [categoryId]: [...(prev[categoryId] || []), item]
        }));
        setAvailableItems(prev => prev.filter(i => i.id !== item.id));

        if (availableItems.length === 1) {
            setIsCompleted(true);
            setTimeout(() => onComplete(100), 1000);
        }
    };

    if (!isActive) return null;

    return (
        <div className="space-y-6">
            <div className="text-center mb-4">
                <h3 className="font-bold text-lg">{data.instruction}</h3>
            </div>

            <div className="flex flex-wrap gap-2 p-4 glass border-glass-border rounded-xl">
                {availableItems.map(item => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={e => handleDragStart(e, item)}
                        className="px-4 py-2 bg-primary/20 border border-primary rounded-lg cursor-move hover:bg-primary/30"
                    >
                        {item.text}
                    </div>
                ))}
                {availableItems.length === 0 && <p className="text-muted-foreground italic">All items sorted!</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {(data.categories || [
                    { id: 'natural', label: 'Natural Disasters' },
                    { id: 'human-made', label: 'Human-Made Disasters' }
                ]).map(cat => (
                    <div
                        key={cat.id}
                        onDrop={e => handleDrop(e, cat.id)}
                        onDragOver={e => e.preventDefault()}
                        className="p-4 glass border-glass-border border-dashed border-2 rounded-xl min-h-[150px]"
                    >
                        <h4 className="font-bold mb-3 opacity-60 uppercase text-xs">{cat.label}</h4>
                        <div className="space-y-2">
                            {(categorizedItems[cat.id] || []).map((item, i) => (
                                <div key={i} className="p-2 bg-success/20 border border-success rounded-lg text-sm">
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragDropGame;
