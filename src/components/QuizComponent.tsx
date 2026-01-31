"use client";

import React, { useState } from 'react';
import { QuizQuestion } from '@/data/modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface QuizComponentProps {
    questions: QuizQuestion[];
    onComplete: (score: number) => void;
}

const QuizComponent = ({ questions, onComplete }: QuizComponentProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showExplanation, setShowExplanation] = useState(false);
    const [answers, setAnswers] = useState<{ question: string; selected: string; correct: string; isCorrect: boolean }[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleSubmitAnswer = () => {
        if (!selectedAnswer) return;
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        setAnswers(prev => [...prev, {
            question: currentQuestion.question,
            selected: selectedAnswer,
            correct: currentQuestion.correctAnswer,
            isCorrect
        }]);
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            const correctCount = answers.filter(a => a.isCorrect).length;
            const score = Math.floor((correctCount / questions.length) * 100);
            setIsCompleted(true);
            setTimeout(() => onComplete(score), 1500);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer('');
            setShowExplanation(false);
        }
    };

    if (isCompleted) {
        return (
            <Card className="glass border-glass-border text-center p-8">
                <div className="text-6xl mb-4">🏆</div>
                <CardTitle className="text-2xl mb-2">Quiz Complete!</CardTitle>
                <p className="text-muted-foreground">Well done on completing the assessment.</p>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Badge variant="outline" className="glass">Q {currentQuestionIndex + 1} of {questions.length}</Badge>
            </div>

            <Card className="glass border-glass-border">
                <CardHeader>
                    <CardTitle>{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        {(currentQuestion.options || ['true', 'false']).map((option, i) => (
                            <Button
                                key={i}
                                variant={selectedAnswer === option ? 'default' : 'outline'}
                                onClick={() => !showExplanation && setSelectedAnswer(option)}
                                className={`justify-start h-auto py-3 px-4 ${showExplanation && option === currentQuestion.correctAnswer ? 'border-success text-success' : ''
                                    } ${showExplanation && selectedAnswer === option && option !== currentQuestion.correctAnswer ? 'border-destructive text-destructive' : ''
                                    }`}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>

                    {showExplanation && (
                        <div className="p-4 bg-primary/10 rounded-lg text-sm italic">
                            {currentQuestion.explanation}
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        {!showExplanation ? (
                            <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>Submit</Button>
                        ) : (
                            <Button onClick={handleNextQuestion}>
                                {isLastQuestion ? 'Finish' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuizComponent;
