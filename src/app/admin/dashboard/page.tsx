"use client";

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, AlertTriangle, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const { user, userRole, logout } = useAuth();

    if (!user || userRole?.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="glass border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-destructive">Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You must be an administrator to view this page.</p>
                        <Button variant="outline" className="mt-4" onClick={() => logout()}>
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-glass-foreground">Admin Portal</h1>
                    <p className="text-muted-foreground">Manage users, content, and alerts</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Students" value="1,234" icon={Users} color="text-blue-400" />
                <StatsCard title="Active Modules" value="10" icon={BookOpen} color="text-green-400" />
                <StatsCard title="Emergency Alerts" value="3" icon={AlertTriangle} color="text-red-400" />
                <StatsCard title="System Status" value="Healthy" icon={Activity} color="text-purple-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-glass-border md:col-span-2">
                    <CardHeader>
                        <CardTitle>Student Activity & Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-glass-border/30 text-muted-foreground text-sm">
                                        <th className="pb-3 pl-2">Student Name</th>
                                        <th className="pb-3">School</th>
                                        <th className="pb-3">Login Status</th>
                                        <th className="pb-3 text-right pr-2">Module Completion</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { name: "Rahul S.", school: "St. Xavier's", active: true, progress: 80 },
                                        { name: "Priya M.", school: "City Public", active: false, progress: 45 },
                                        { name: "Amit K.", school: "KV No. 1", active: true, progress: 90 },
                                        { name: "Sara L.", school: "Delhi Public", active: false, progress: 20 },
                                        { name: "John D.", school: "International High", active: true, progress: 10 },
                                    ].map((student, i) => (
                                        <tr key={i} className="border-b border-glass-border/10 hover:bg-glass/30 transition-colors">
                                            <td className="py-3 pl-2 font-medium">{student.name}</td>
                                            <td className="py-3 text-muted-foreground">{student.school}</td>
                                            <td className="py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`h-2 w-2 rounded-full ${student.active ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                                                    {student.active ? 'Online' : 'Offline'}
                                                </div>
                                            </td>
                                            <td className="py-3 pr-2">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <span className="text-xs font-mono">{student.progress}%</span>
                                                    <div className="h-2 w-16 bg-muted/30 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-accent transition-all duration-500"
                                                            style={{ width: `${student.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass border-glass-border">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full justify-start" variant="outline">
                            <AlertTriangle className="mr-2 h-4 w-4" /> Broadcast Emergency Alert
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <BookOpen className="mr-2 h-4 w-4" /> Manage Learning Modules
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <Users className="mr-2 h-4 w-4" /> User Management
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const StatsCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="glass border-glass-border">
        <CardContent className="p-6 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <h3 className="text-2xl font-bold mt-1 text-glass-foreground">{value}</h3>
            </div>
            <div className={`p-3 rounded-full bg-glass/50 ${color}`}>
                <Icon size={24} />
            </div>
        </CardContent>
    </Card>
);
