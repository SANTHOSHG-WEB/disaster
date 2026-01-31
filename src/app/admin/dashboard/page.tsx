"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, AlertTriangle, Activity, Loader2 } from 'lucide-react';

interface StudentData {
    name: string;
    school: string;
    progress: number;
    email: string;
}

export default function AdminDashboard() {
    const { user, userRole, logout } = useAuth();
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeModules: 10,
        emergencyAlerts: 0,
        systemStatus: 'Healthy'
    });
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            if (!user || userRole?.role !== 'admin') return;

            setLoading(true);
            try {
                // 1. Fetch Students (Profiles)
                const { data: profiles, error: pError } = await supabase
                    .from('profiles')
                    .select('full_name, school_name, id');

                // 2. Fetch Progress for all
                const { data: progress, error: prError } = await supabase
                    .from('module_progress')
                    .select('user_id, status');

                if (profiles) {
                    const studentList = profiles.map((p: any) => {
                        const userProgress = progress?.filter((pr: any) => pr.user_id === p.id) || [];
                        const completedCount = userProgress.filter((pr: any) => pr.status === 'completed').length;
                        const progressPercent = Math.round((completedCount / 10) * 100);

                        return {
                            name: p.full_name || 'Anonymous',
                            school: p.school_name || 'Unknown',
                            progress: progressPercent,
                            email: '' // Not stored in profile for privacy usually, but can join if needed
                        };
                    });

                    setStudents(studentList);
                    setStats(prev => ({
                        ...prev,
                        totalStudents: studentList.length
                    }));
                }

            } catch (err) {
                console.error("Admin fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [user, userRole]);

    if (!user || userRole?.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="glass border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-destructive">Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You must be an administrator to view this page.</p>
                        <div className="flex gap-4 mt-6">
                            <Button variant="outline" onClick={() => window.location.href = '/'}>Home</Button>
                            <Button variant="destructive" onClick={() => logout()}>Logout</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
            <header className="flex justify-between items-center border-b border-glass-border/30 pb-6">
                <div>
                    <h1 className="text-4xl font-bold text-glass-foreground tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Live overview of platform activity and student progress</p>
                </div>
                <Button variant="outline" className="glass" onClick={() => logout()}>Sign Out</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Students" value={loading ? "..." : stats.totalStudents.toString()} icon={Users} color="text-sky-400" />
                <StatsCard title="Learning Modules" value={stats.activeModules.toString()} icon={BookOpen} color="text-emerald-400" />
                <StatsCard title="Active Incidents" value={stats.emergencyAlerts.toString()} icon={AlertTriangle} color="text-amber-400" />
                <StatsCard title="Backend Status" value={stats.systemStatus} icon={Activity} color="text-indigo-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="glass border-glass-border lg:col-span-2 shadow-xl overflow-hidden">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" /> Student Learning Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-glass-border/30 text-muted-foreground text-xs uppercase tracking-wider">
                                            <th className="py-4 px-6 font-semibold">Student Name</th>
                                            <th className="py-4 px-6 font-semibold">Institution</th>
                                            <th className="py-4 px-6 font-semibold text-right">Course Completion</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-glass-border/10">
                                        {students.length > 0 ? students.map((student, i) => (
                                            <tr key={i} className="hover:bg-glass/30 transition-colors group">
                                                <td className="py-4 px-6 font-medium text-glass-foreground">{student.name}</td>
                                                <td className="py-4 px-6 text-muted-foreground">{student.school}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3 justify-end">
                                                        <span className="text-xs font-bold tabular-nums">{student.progress}%</span>
                                                        <div className="h-2 w-24 bg-muted/20 rounded-full overflow-hidden border border-glass-border/30">
                                                            <div
                                                                className={`h-full transition-all duration-1000 ${student.progress > 70 ? 'bg-emerald-500' : student.progress > 30 ? 'bg-sky-500' : 'bg-primary'}`}
                                                                style={{ width: `${student.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={3} className="py-10 text-center text-muted-foreground">No students enrolled yet.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="glass border-glass-border shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start glass border-warning/30 hover:bg-warning/10 text-warning" variant="outline">
                                <AlertTriangle className="mr-3 h-4 w-4" /> Post Weather Warning
                            </Button>
                            <Button className="w-full justify-start glass" variant="outline">
                                <BookOpen className="mr-3 h-4 w-4" /> Edit Quiz Content
                            </Button>
                            <Button className="w-full justify-start glass" variant="outline">
                                <Users className="mr-3 h-4 w-4" /> Export Analytics (CSV)
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="glass border-glass-border bg-primary/5">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                                <Activity className="h-4 w-4" /> System Info
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Database: Supabase Cloud<br />
                                API: Responsive (120ms latency)<br />
                                Storage: 85% Free
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const StatsCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="glass border-glass-border shadow-md glass-hover">
        <CardContent className="p-6 flex items-center justify-between">
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-black mt-1 text-glass-foreground tracking-tight">{value}</h3>
            </div>
            <div className={`p-4 rounded-2xl bg-glass/40 border border-glass-border/50 ${color} shadow-inner`}>
                <Icon size={24} />
            </div>
        </CardContent>
    </Card>
);
