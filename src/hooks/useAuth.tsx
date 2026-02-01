"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
    id: string;
    user_id: string;
    full_name: string;
    age?: number;
    birthday?: string;
    school_name?: string;
    class_name?: string;
    created_at: string;
    updated_at: string;
}

interface UserRole {
    role: 'admin' | 'moderator' | 'student';
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    userRole: UserRole | null;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    loginWithGoogle: () => Promise<{ error?: string }>;
    signup: (email: string, password: string, profileData: {
        full_name: string;
        age?: number;
        birthday?: string;
        school_name?: string;
        class_name?: string;
        college_name?: string;
        role?: string;
    }) => Promise<{ error?: string }>;
    logout: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<{ error?: string }>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if using placeholder credentials
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const isMockMode = url?.includes('your-project');

        console.log("Auth Initializing", { url, isMockMode });

        if (isMockMode) {
            const storedSession = localStorage.getItem('dme_mock_session');
            if (storedSession) {
                try {
                    const { user, session, profile, role } = JSON.parse(storedSession);
                    setUser(user);
                    setSession(session);
                    setProfile(profile);
                    setUserRole(role);
                } catch (e) {
                    console.error("Failed to restore mock session", e);
                }
            }
            setIsLoading(false);
            return;
        }

        // Check for existing session
        supabase.auth.getSession().then(async ({ data: { session } }: any) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                // Await these to ensure the role/profile is available before isLoading becomes false
                await Promise.all([
                    fetchUserProfile(session.user.id),
                    fetchUserRole(session.user.id)
                ]);
            }
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event: any, session: any) => {
                console.log("Auth State Change:", event, session?.user?.email);
                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    // Await these so that components depending on userRole see it correctly 
                    // before isLoading flips to false (if it was true)
                    await Promise.all([
                        fetchUserProfile(session.user.id),
                        fetchUserRole(session.user.id)
                    ]);
                } else {
                    setProfile(null);
                    setUserRole(null);
                }

                setIsLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (data && !error) {
            setProfile(data);
        }
    };

    const fetchUserRole = async (userId: string) => {
        const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', userId)
            .single();

        if (data && !error) {
            setUserRole({ role: data.role as 'admin' | 'moderator' | 'student' });
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Check if using placeholder credentials
            const isMockMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project');

            if (isMockMode) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Create mock session
                // Use deterministic ID based on email to persist mock progress across logins
                const mockUserId = `mock-user-${btoa(email).replace(/=/g, '').substring(0, 12)}`;

                const mockUser: User = {
                    id: mockUserId,
                    email: email,
                    app_metadata: {},
                    user_metadata: {},
                    aud: 'authenticated',
                    created_at: new Date().toISOString()
                };

                const mockSession: Session = {
                    access_token: 'mock-token',
                    refresh_token: 'mock-refresh',
                    expires_in: 3600,
                    token_type: 'bearer',
                    user: mockUser
                };

                const mockProfile: UserProfile = {
                    id: 'mock-profile-id',
                    user_id: mockUser.id,
                    full_name: 'Test Student',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    school_name: 'Demo School',
                    class_name: '10th Grade'
                };

                setSession(mockSession);
                setUser(mockUser);
                setProfile(mockProfile);

                const role = email === 'admin@dme.com' ? 'admin' : 'student';
                setUserRole({ role: role as 'admin' | 'student' });

                localStorage.setItem('dme_mock_session', JSON.stringify({
                    user: mockUser,
                    session: mockSession,
                    profile: mockProfile,
                    role: { role: 'student' }
                }));

                return {};
            }

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { error: error.message };
            }

            return {};
        } catch (error) {
            return { error: 'Login failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        return { error: 'Google auth disabled' };
    };

    const signup = async (email: string, password: string, profileData: any) => {
        setIsLoading(true);
        console.log("Signup Request", { email, profileData });
        try {
            // Check if using placeholder credentials
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const isMockMode = url?.includes('your-project');

            console.log("Signup Mode check", { url, isMockMode });

            if (isMockMode) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Create mock session & profile
                // Use deterministic ID even for signup to match login logic
                const mockUserId = `mock-user-${btoa(email).replace(/=/g, '').substring(0, 12)}`;

                const mockUser: User = {
                    id: mockUserId,
                    email: email,
                    app_metadata: {},
                    user_metadata: {},
                    aud: 'authenticated',
                    created_at: new Date().toISOString()
                };

                const mockSession: Session = {
                    access_token: 'mock-token',
                    refresh_token: 'mock-refresh',
                    expires_in: 3600,
                    token_type: 'bearer',
                    user: mockUser
                };

                const mockProfile: UserProfile = {
                    ...profileData,
                    id: 'mock-profile-id',
                    user_id: mockUser.id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };

                setSession(mockSession);
                setUser(mockUser);
                setProfile(mockProfile);
                setUserRole({ role: 'student' });

                localStorage.setItem('dme_mock_session', JSON.stringify({
                    user: mockUser,
                    session: mockSession,
                    profile: mockProfile,
                    role: { role: 'student' }
                }));

                return {};
            }

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: profileData
                }
            });

            if (error) {
                return { error: error.message };
            }

            return {};
        } catch (error) {
            return { error: 'Signup failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (data: Partial<UserProfile>) => {
        if (!user) return { error: 'Not authenticated' };

        try {
            const { error } = await supabase
                .from('profiles')
                .update(data)
                .eq('user_id', user.id);

            if (error) return { error: error.message };

            await fetchUserProfile(user.id);
            return {};
        } catch (error) {
            return { error: 'Update failed' };
        }
    };

    const logout = async () => {
        const isMockMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project');
        if (isMockMode) {
            localStorage.removeItem('dme_mock_session');
            setUser(null);
            setSession(null);
            setProfile(null);
            setUserRole(null);
            return;
        }
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{
            user,
            session,
            profile,
            userRole,
            login,
            loginWithGoogle,
            signup,
            logout,
            updateProfile,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
