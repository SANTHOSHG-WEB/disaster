"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const { toast } = useToast();


  const handleEnrollClick = () => {
    router.push('/login');
  };


  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "10 comprehensive modules with videos, puzzles, and quizzes"
    },
    {
      icon: Shield,
      title: "Emergency Ready",
      description: "Real-time SOS, emergency contacts, and weather alerts"
    },
    {
      icon: Users,
      title: "School-Focused",
      description: "Designed specifically for Indian schools and colleges"
    },
    {
      icon: Award,
      title: "Gamified Experience",
      description: "Earn points, badges, and certificates as you learn"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <Badge variant="outline" className="glass border-glass-border text-accent mb-4">
              Disaster Management Education
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-glass-foreground leading-tight">
              Learn. Prepare.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stay Safe.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive disaster preparedness education platform designed for schools and colleges across India.
              Master essential safety skills through interactive learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                onClick={handleEnrollClick}
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg font-semibold 
                            rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={() => router.push('/about')}
                variant="outline"
                size="lg"
                className="glass border-glass-border hover:bg-glass/80 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>

            <div className="pt-4">
              <button
                onClick={() => router.push('/admin/login')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mx-auto"
              >
                <Shield size={14} /> School Admin Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass border-glass-border">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-glass-foreground">
                Disaster Preparedness Basics
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Master essential disaster management skills through our comprehensive course
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-glass-foreground">What you'll learn:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center">
                        <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                        Earthquake safety and response procedures
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                        Flood preparedness and evacuation
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                        Fire safety and emergency protocols
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                        Natural disaster response strategies
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="glass">10 Modules</Badge>
                    <Badge variant="secondary" className="glass">Video Lessons</Badge>
                    <Badge variant="secondary" className="glass">Interactive Games</Badge>
                    <Badge variant="secondary" className="glass">Quizzes</Badge>
                    <Badge variant="secondary" className="glass">Certificate</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="neumorphic p-6 rounded-2xl">
                    <h4 className="font-semibold text-glass-foreground mb-2">Course Format</h4>
                    <p className="text-muted-foreground text-sm">
                      Each module includes a video lesson, interactive puzzle game, and knowledge quiz.
                    </p>
                  </div>

                  <div className="neumorphic p-6 rounded-2xl">
                    <h4 className="font-semibold text-glass-foreground mb-2">Progress</h4>
                    <p className="text-muted-foreground text-sm">
                      Complete all modules to earn your certification. Progress saved automatically.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-glass-foreground mb-4">
              Platform Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass border-glass-border glass-hover">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-glass-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
