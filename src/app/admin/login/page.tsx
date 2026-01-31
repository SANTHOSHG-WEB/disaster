"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const { toast } = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Specific check to enforce admin email
        if (email !== 'admin@dme.com') {
            toast({
                title: "Access Denied",
                description: "This portal is restricted to administrators only.",
                variant: "destructive"
            });
            return;
        }

        const { error } = await login(email, password);

        if (!error) {
            toast({ title: "Admin Access Granted", description: "Welcome back, Administrator." });
            router.push('/admin/dashboard');
        } else {
            toast({ title: "Authentication Failed", description: error, variant: "destructive" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
            </div>

            <Card className="glass border-glass-border w-full max-w-md shadow-2xl z-10 relative">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/30">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Admin Portal</CardTitle>
                    <CardDescription>Restricted Access Area</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Administrative Email</Label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@dme.com"
                                    required
                                    className="pl-10 glass"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Security Key</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-10 glass"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-all font-semibold" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying Credentials...
                                    </>
                                ) : (
                                    'Access Dashboard'
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        <p>Unauthorized access attempts are monitored.</p>
                        <p className="mt-1">System ID: DME-ADMIN-V1.0</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
