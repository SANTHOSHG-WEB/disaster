"use client";

import { Menu, X, LogOut, Cloud, CloudOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';

const Header = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false); // Removed state
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const { syncStatus, forceRefresh } = useProgress();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    const navItems = [
        { path: '/', label: t('dashboard', 'Dashboard') },
        { path: '/learning', label: t('learning', 'Learning') },
        { path: '/map', label: t('map', 'Map') },
        { path: '/emergency', label: t('emergency', 'Emergency') },
        { path: '/weather', label: t('weather', 'Weather') },
        { path: '/about', label: t('about', 'About') },
    ];

    const handleSOSClick = () => {
        window.location.href = 'tel:100';
    };

    return (
        <header className="glass fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md border-b border-glass-border/30">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-glass-foreground leading-tight">
                        Disaster Management Education Platform
                    </h1>

                    <div className="flex items-center gap-2">
                        {user && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-glass/20 border border-glass-border/30">
                                {syncStatus === 'syncing' ? (
                                    <RefreshCw className="h-3.5 w-3.5 text-primary animate-spin" />
                                ) : syncStatus === 'error' ? (
                                    <CloudOff className="h-3.5 w-3.5 text-destructive" />
                                ) : (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                                )}
                                <span className="text-[10px] font-medium text-glass-foreground uppercase tracking-wider hidden sm:inline">
                                    {syncStatus === 'syncing' ? 'Syncing' : syncStatus === 'error' ? 'Sync Error' : 'Cloud Synced'}
                                </span>
                                <button
                                    onClick={() => forceRefresh()}
                                    className="p-1 hover:bg-glass/30 rounded-full transition-colors"
                                    title="Force Sync"
                                >
                                    <RefreshCw className={`h-3 w-3 ${syncStatus === 'syncing' ? 'opacity-50' : ''}`} />
                                </button>
                            </div>
                        )}
                        <button
                            onClick={handleSOSClick}
                            className="blink bg-emergency text-white 
                            px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm
                            transition-all duration-300 hover:scale-105"
                        >
                            🚨 SOS
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-glass-border/30">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">
                        <nav className="hidden md:flex items-center space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`text-sm font-medium transition-colors hover:text-accent glass-hover px-3 py-2 rounded-lg ${pathname === item.path
                                        ? 'text-accent bg-glass/50'
                                        : 'text-glass-foreground'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-white hover:bg-destructive/90 px-3 py-2 rounded-lg transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    {t('logout', 'Logout')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
