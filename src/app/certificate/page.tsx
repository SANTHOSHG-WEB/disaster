"use client";

import React, { useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function CertificatePage() {
    const { user, profile } = useAuth();
    const { progress } = useProgress();
    const { toast } = useToast();
    const certRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!certRef.current) return;
        try {
            toast({ title: "Generating Certificate..." });

            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            const canvas = await html2canvas(certRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
            pdf.save(`certificate-${profile?.full_name || 'student'}.pdf`);
            toast({ title: "Certificate Downloaded!" });
        } catch (e) {
            console.error('Certificate error:', e);
            toast({ title: "Failed to generate certificate", variant: "destructive" });
        }
    };

    if (!progress.certificateEarned) {
        return (
            <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
                <Award className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-20" />
                <h2 className="text-3xl font-bold mb-4">Certificate Locked</h2>
                <p className="text-muted-foreground mb-8 text-lg">You must complete all 10 learning modules to earn your official Disaster Preparedness Certificate.</p>
                <Button onClick={() => window.location.href = '/learning'}>Go to Learning Path</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-5xl px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Your Achievement</h1>
                <Button onClick={handleDownload} size="lg" className="bg-primary shadow-xl hover:scale-105 transition-transform">
                    <Download className="mr-2 h-5 w-5" /> Download PDF Certificate
                </Button>
            </div>

            <div className="flex justify-center">
                <div ref={certRef} className="bg-white p-16 rounded-sm shadow-2xl w-full max-w-[1000px] border-[12px] border-double border-primary/20 text-slate-800" style={{ aspectRatio: '1.414/1' }}>
                    <div className="border-4 border-primary/10 h-full p-8 flex flex-col justify-between text-center">
                        <div className="space-y-4">
                            <GraduationCap className="h-16 w-16 text-primary mx-auto" />
                            <h2 className="text-4xl font-serif font-bold text-primary uppercase tracking-widest">Certificate of Completion</h2>
                            <div className="w-24 h-1 bg-primary/20 mx-auto" />
                        </div>

                        <div className="space-y-6">
                            <p className="text-xl italic font-serif">This acknowledges that</p>
                            <h3 className="text-6xl font-bold border-b-2 border-slate-200 inline-block pb-2 px-12 min-w-[300px]">
                                {profile?.full_name || user?.email?.split('@')[0]}
                            </h3>
                            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
                                has successfully completed the comprehensive educational track on
                                <span className="block font-bold text-primary mt-2">Disaster Management & Emergency Preparedness</span>
                            </p>
                        </div>

                        <div className="flex justify-between items-end px-12 border-t border-slate-100 pt-8">
                            <div className="text-left">
                                <div className="font-bold border-b border-slate-300 mb-1">{format(new Date(), 'dd MMMM yyyy')}</div>
                                <div className="text-xs uppercase opacity-50">Date Issued</div>
                            </div>
                            <div className="text-center">
                                <div className="text-primary font-bold">Verified Achievement</div>
                                <div className="text-[10px] opacity-40">DM-REF-{user?.id?.slice(0, 8).toUpperCase()}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-serif italic text-2xl mb-1 opacity-60">Director</div>
                                <div className="text-xs uppercase opacity-50">Authorized Signature</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
