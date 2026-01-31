"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MemoryCard {
    id: string;
    content: string;
    type: 'term' | 'action';
    pairId: number;
    isFlipped: boolean;
    isMatched: boolean;
}

interface MemoryMatchGameProps {
    data: {
        instruction: string;
        pairs: Array<{ id: number; term: string; action: string }>;
    };
    onComplete: (score: number) => void;
    isActive: boolean;
}

const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({ data, onComplete, isActive }) => {
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [flipped, setFlipped] = useState<MemoryCard[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const gameCards: MemoryCard[] = [];
        data.pairs.forEach(p => {
            gameCards.push({ id: `t-${p.id}`, content: p.term, type: 'term', pairId: p.id, isFlipped: false, isMatched: false });
            gameCards.push({ id: `a-${p.id}`, content: p.action, type: 'action', pairId: p.id, isFlipped: false, isMatched: false });
        });
        setCards(gameCards.sort(() => Math.random() - 0.5));
    }, [data.pairs]);

    const handleFlip = (card: MemoryCard) => {
        if (card.isFlipped || card.isMatched || flipped.length === 2 || isCompleted) return;

        const newCards = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
        setCards(newCards);

        const nextFlipped = [...flipped, { ...card, isFlipped: true }];
        setFlipped(nextFlipped);

        if (nextFlipped.length === 2) {
            const [first, second] = nextFlipped;
            if (first.pairId === second.pairId && first.type !== second.type) {
                // Match found
                setTimeout(() => {
                    const matchedCards = newCards.map(c =>
                        (c.id === first.id || c.id === second.id) ? { ...c, isMatched: true, isFlipped: true } : c
                    );
                    setCards(matchedCards);
                    setFlipped([]);

                    // Check completion
                    if (matchedCards.every(c => c.isMatched)) {
                        setIsCompleted(true);
                        setTimeout(() => onComplete(100), 500);
                    }
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        (c.id === first.id || c.id === second.id) ? { ...c, isFlipped: false } : c
                    ));
                    setFlipped([]);
                }, 1000);
            }
        }
    };

    if (!isActive) return null;

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-center">{data.instruction}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {cards.map(card => (
                    <div
                        key={card.id}
                        onClick={() => handleFlip(card)}
                        className={`h-24 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center p-2 text-center text-xs font-semibold ${card.isMatched ? 'bg-success/20 border-success' :
                            card.isFlipped ? 'bg-primary/20 border-primary' :
                                'glass border-glass-border hover:bg-glass/50'
                            }`}
                    >
                        {card.isFlipped || card.isMatched ? card.content : '?'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemoryMatchGame;
