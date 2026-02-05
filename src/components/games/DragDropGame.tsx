"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { MousePointer2, Info, CheckCircle2 } from 'lucide-react';

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
    const [selectedItem, setSelectedItem] = useState<DragDropItem | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    // Warm, earthy color palette for "Human Touch"
    // Theme colors using CSS variables for consistency
    const themeColors = {
        neutral: "var(--muted)",
        trust: "var(--primary)",
        success: "var(--secondary)",
        focus: "var(--accent)",
        base: "var(--background)",
        text: "var(--foreground)"
    };

    const handleDragStart = (e: React.DragEvent, item: DragDropItem) => {
        e.dataTransfer.setData('text', JSON.stringify(item));
        setSelectedItem(item);
    };

    const processPlacement = (item: DragDropItem, categoryId: string) => {
        if (item.category !== categoryId) {
            toast({
                title: "Not quite!",
                description: `"${item.text}" belongs in a different category. Try again!`,
                variant: "destructive"
            });
            setSelectedItem(null);
            return;
        }

        setCategorizedItems(prev => ({
            ...prev,
            [categoryId]: [...(prev[categoryId] || []), item]
        }));
        setAvailableItems(prev => prev.filter(i => i.id !== item.id));
        setSelectedItem(null);

        if (availableItems.length === 1) {
            setIsCompleted(true);
            setTimeout(() => onComplete(100), 1000);
        }
    };

    const handleDrop = (e: React.DragEvent, categoryId: string) => {
        e.preventDefault();
        const itemData = e.dataTransfer.getData('text');
        if (!itemData) return;
        const item = JSON.parse(itemData) as DragDropItem;
        processPlacement(item, categoryId);
    };

    const handleItemClick = (item: DragDropItem) => {
        if (selectedItem?.id === item.id) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    const handleCategoryClick = (categoryId: string) => {
        if (selectedItem) {
            processPlacement(selectedItem, categoryId);
        }
    };

    if (!isActive) return null;

    const categories = data.categories || [
        { id: 'natural', label: 'Natural Disasters' },
        { id: 'human-made', label: 'Human-Made Disasters' }
    ];

    return (
        <div className="space-y-8 p-2">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent/10 border border-accent/20 p-4 rounded-2xl flex items-start gap-3"
            >
                <Info className="text-accent mt-0.5" size={18} />
                <p className="text-sm font-medium leading-relaxed">
                    {data.instruction}. <br />
                    <span className="opacity-70 text-xs font-normal italic">Tip: Drag items or click an item then its category.</span>
                </p>
            </motion.div>

            {/* Available Items Pool */}
            <div
                className="p-6 rounded-3xl shadow-inner min-h-[100px] flex flex-wrap gap-3 items-center justify-center border-2 border-dashed border-muted/20"
                style={{ backgroundColor: "hsl(var(--muted) / 0.2)" }}
            >
                <AnimatePresence>
                    {availableItems.map(item => (
                        <motion.button
                            layout
                            key={item.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                boxShadow: selectedItem?.id === item.id ? "0 0 0 3px hsl(var(--primary))" : "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            draggable
                            onDragStart={(e: any) => handleDragStart(e, item)}
                            onClick={() => handleItemClick(item)}
                            className="px-5 py-3 rounded-2xl font-bold text-sm transition-colors border shadow-sm flex items-center gap-2 group"
                            style={{
                                backgroundColor: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                borderColor: selectedItem?.id === item.id ? "hsl(var(--primary))" : "hsl(var(--border))"
                            }}
                        >
                            {item.text}
                            <MousePointer2 size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                        </motion.button>
                    ))}
                </AnimatePresence>
                {availableItems.length === 0 && !isCompleted && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground italic">
                        Perfect sorting!
                    </motion.p>
                )}
            </div>

            {/* Target Categories */}
            <div className="grid md:grid-cols-2 gap-6">
                {categories.map(cat => (
                    <motion.div
                        key={cat.id}
                        onDrop={e => handleDrop(e, cat.id)}
                        onDragOver={e => e.preventDefault()}
                        onClick={() => handleCategoryClick(cat.id)}
                        whileHover={{ scale: 1.01 }}
                        className={`relative p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer min-h-[220px] ${selectedItem ? 'border-dashed animate-pulse ring-2 ring-primary/20' : 'border-solid'
                            }`}
                        style={{
                            backgroundColor: cat.id === 'natural' ? "hsl(var(--secondary) / 0.05)" : "hsl(var(--primary) / 0.05)",
                            borderColor: cat.id === 'natural' ? "hsl(var(--secondary) / 0.2)" : "hsl(var(--primary) / 0.2)"
                        }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-black text-sm uppercase tracking-widest opacity-60"
                                style={{ color: cat.id === 'natural' ? "hsl(var(--secondary))" : "hsl(var(--primary))" }}>
                                {cat.label}
                            </h4>
                            <div className="p-2 rounded-full" style={{ backgroundColor: cat.id === 'natural' ? "hsl(var(--secondary) / 0.1)" : "hsl(var(--primary) / 0.1)" }}>
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.id === 'natural' ? "hsl(var(--secondary))" : "hsl(var(--primary))" }} />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                                {(categorizedItems[cat.id] || []).map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2"
                                        style={{
                                            backgroundColor: "hsl(var(--background))",
                                            color: cat.id === 'natural' ? "hsl(var(--secondary))" : "hsl(var(--primary))",
                                            borderColor: "hsl(var(--border) / 0.5)"
                                        }}
                                    >
                                        <CheckCircle2 size={12} />
                                        {item.text}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {selectedItem && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-[2.5rem] pointer-events-none">
                                <span className="text-xs font-bold bg-white/90 px-3 py-1 rounded-full shadow-sm border border-primary/20 animate-bounce">
                                    Place here
                                </span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {isCompleted && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center p-8 bg-success/10 border border-success/20 rounded-3xl"
                >
                    <h2 className="text-2xl font-black text-success mb-2">Excellent Work!</h2>
                    <p className="text-muted-foreground font-medium">You've mastered the disaster categories.</p>
                </motion.div>
            )}
        </div>
    );
};

export default DragDropGame;
