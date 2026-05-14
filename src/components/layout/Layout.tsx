import React, { useEffect } from 'react';
import Head from 'next/head';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export const Layout = ({ children, showHeader = true }: LayoutProps) => {
  const { user, setSession, signOut } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <div className="min-h-screen bg-linear-black font-inter antialiased">
      <Head>
        <title>Linear Board</title>
      </Head>

      {showHeader && (
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-linear-border/50 bg-linear-black/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Link href="/board" className="text-lg font-medium text-linear-text-primary tracking-tight">
              Linear Board
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-linear-text-secondary">{user.email}</span>
                <Button variant="subtle" size="sm" onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <Link href="/auth/login">
                <Button variant="primary" size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </header>
      )}

      <main className="container mx-auto max-w-5xl p-4">
        {children}
      </main>
    </div>
  );
};
