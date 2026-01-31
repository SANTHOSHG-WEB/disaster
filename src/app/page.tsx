"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEnrollment } from '@/hooks/useEnrollment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, BookOpen, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const router = useRouter();
  const { user, updateProfile, profile } = useAuth();
  const { enrollInModule } = useEnrollment();
  const { toast } = useToast();

  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [enrollForm, setEnrollForm] = useState({
    full_name: '',
    age: '',
    birthday: undefined as Date | undefined,
    school_name: '',
    class_name: ''
  });

  const handleEnrollClick = () => {
    if (user) {
      if (profile?.school_name) {
        enrollInFirstModule();
      } else {
        setShowEnrollDialog(true);
      }
    } else {
      router.push('/login');
    }
  };

  const enrollInFirstModule = async () => {
    const success = await enrollInModule('1');
    if (success) {
      router.push('/learning');
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enrollForm.full_name.trim() || !enrollForm.school_name.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name and school.",
        variant: "destructive",
      });
      return;
    }

    const profileData = {
      full_name: enrollForm.full_name,
      age: enrollForm.age ? parseInt(enrollForm.age) : undefined,
      birthday: enrollForm.birthday ? format(enrollForm.birthday, 'yyyy-MM-dd') : undefined,
      school_name: enrollForm.school_name,
      class_name: enrollForm.class_name || undefined,
    };

    const { error } = await updateProfile(profileData);

    if (!error) {
      setShowEnrollDialog(false);
      await enrollInFirstModule();
    } else {
      toast({
        title: "Profile Update Failed",
        description: error,
        variant: "destructive",
      });
    }
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

      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="glass border-glass-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-glass-foreground">Complete Your Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div>
              <Label htmlFor="enroll-name">Full Name *</Label>
              <Input
                id="enroll-name"
                value={enrollForm.full_name}
                onChange={(e) => setEnrollForm(prev => ({ ...prev, full_name: e.target.value }))}
                required
                className="glass border-glass-border"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="enroll-age">Age</Label>
                <Input
                  id="enroll-age"
                  type="number"
                  value={enrollForm.age}
                  onChange={(e) => setEnrollForm(prev => ({ ...prev, age: e.target.value }))}
                  className="glass border-glass-border"
                  placeholder="Age"
                />
              </div>

              <div>
                <Label>Birthday</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full glass border-glass-border justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {enrollForm.birthday ? format(enrollForm.birthday, 'MMM dd') : 'Pick date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 glass" align="start">
                    <Calendar
                      mode="single"
                      selected={enrollForm.birthday}
                      onSelect={(date) => setEnrollForm(prev => ({ ...prev, birthday: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label htmlFor="enroll-school">School/College Name *</Label>
              <Input
                id="enroll-school"
                value={enrollForm.school_name}
                onChange={(e) => setEnrollForm(prev => ({ ...prev, school_name: e.target.value }))}
                required
                placeholder="Enter your institution name"
                className="glass border-glass-border"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEnrollDialog(false)}
                className="flex-1 glass border-glass-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-white"
              >
                Enroll Now
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
