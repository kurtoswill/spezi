"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ data: any; error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ data: any; error: AuthError | null }>;
    signOut: () => Promise<{ error: AuthError | null }>;
    session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔧 AuthContext: Initializing...')

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('🔧 AuthContext: Initial session check:', !!session)
            console.log('🔧 AuthContext: Initial user:', session?.user?.email)

            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('🔧 AuthContext: Auth state changed:', event)
                console.log('🔧 AuthContext: New session:', !!session)
                console.log('🔧 AuthContext: New user:', session?.user?.email)

                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);

                // Optional: Handle different auth events
                if (event === 'SIGNED_IN') {
                    console.log('✅ AuthContext: User signed in:', session?.user?.email);
                } else if (event === 'SIGNED_OUT') {
                    console.log('👋 AuthContext: User signed out');
                }
            }
        );

        return () => {
            console.log('🔧 AuthContext: Cleaning up subscription')
            subscription?.unsubscribe()
        };
    }, []);

    const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });
        
        if (data?.user && !error) {
            // Update the users table with first_name and last_name
            const { error: updateError } = await supabase
                .from('users')
                .update({ first_name: firstName, last_name: lastName })
                .eq('id', data.user.id);
                
            if (updateError) {
                console.error('Error updating user metadata:', updateError);
            }
        }
        
        return { data, error };
    };

    const signIn = async (email: string, password: string) => {
        console.log('🔐 AuthContext: Starting signIn for:', email)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log('🔐 AuthContext: SignIn result:', {
            success: !!data?.session,
            error: !!error,
            userEmail: data?.user?.email
        })

        return { data, error };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    };

    const value: AuthContextType = {
        user,
        loading,
        signUp,
        signIn,
        signOut,
        session,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}