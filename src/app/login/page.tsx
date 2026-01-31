"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
    const router = useRouter();
    const { login, signup, isLoading } = useAuth();
    const { toast } = useToast();
    const { t } = useTranslation();

    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        full_name: '',
        age: '',
        birthday: undefined as Date | undefined,
        school_name: '',
        class_name: ''
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await login(loginForm.email, loginForm.password);
        if (!error) {
            toast({ title: "Login Successful" });
            if (loginForm.email === 'admin@dme.com') {
                router.push('/admin/dashboard');
            } else {
                router.push('/learning');
            }
        } else {
            toast({ title: "Login Failed", description: error, variant: "destructive" });
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signupForm.full_name || !signupForm.school_name) {
            toast({ title: "Required Fields Missing", variant: "destructive" });
            return;
        }

        const { error } = await signup(signupForm.email, signupForm.password, {
            full_name: signupForm.full_name,
            age: parseInt(signupForm.age) || undefined,
            birthday: signupForm.birthday ? format(signupForm.birthday, 'yyyy-MM-dd') : undefined,
            school_name: signupForm.school_name,
            class_name: signupForm.class_name
        });

        if (!error) {
            toast({ title: "Account Created" });
            router.push('/learning');
        } else {
            toast({ title: "Signup Failed", description: error, variant: "destructive" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <Card className="glass border-glass-border w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-glass-foreground">Welcome</CardTitle>
                    <CardDescription>Join our disaster preparedness platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 glass overflow-hidden">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="space-y-4">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        className="glass"
                                        value={loginForm.email}
                                        onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className="glass"
                                        value={loginForm.password}
                                        onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Login
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup" className="space-y-4">
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="s-name">Full Name *</Label>
                                    <Input
                                        id="s-name"
                                        required
                                        className="glass"
                                        value={signupForm.full_name}
                                        onChange={e => setSignupForm(p => ({ ...p, full_name: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="s-email">Email *</Label>
                                    <Input
                                        id="s-email"
                                        type="email"
                                        required
                                        className="glass"
                                        value={signupForm.email}
                                        onChange={e => setSignupForm(p => ({ ...p, email: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="s-pass">Password *</Label>
                                    <Input
                                        id="s-pass"
                                        type="password"
                                        required
                                        className="glass"
                                        value={signupForm.password}
                                        onChange={e => setSignupForm(p => ({ ...p, password: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="s-school">School/College *</Label>
                                    <Input
                                        id="s-school"
                                        required
                                        className="glass"
                                        value={signupForm.school_name}
                                        onChange={e => setSignupForm(p => ({ ...p, school_name: e.target.value }))}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Account
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
