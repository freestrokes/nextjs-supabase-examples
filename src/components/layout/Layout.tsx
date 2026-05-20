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
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
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
        <header className="sticky top-0 z-50 flex h-13 items-center justify-between border-b border-white/[0.05] bg-linear-black/60 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-5 w-5 rounded-[4px] bg-linear-indigo flex items-center justify-center text-white font-bold text-[10px] shadow-[0_0_15px_rgba(94,106,210,0.3)]">L</div>
              <span className="text-[13px] font-medium text-linear-text-primary tracking-tight group-hover:text-white transition-colors">
                Linear Board
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/board" className="text-[12px] font-medium text-linear-text-tertiary hover:text-linear-text-primary transition-colors">Issues</Link>
              <Link href="#" className="text-[12px] font-medium text-linear-text-tertiary hover:text-linear-text-primary transition-colors">Cycle</Link>
              <Link href="#" className="text-[12px] font-medium text-linear-text-tertiary hover:text-linear-text-primary transition-colors">Roadmap</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {mounted && user ? (
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-linear-text-tertiary font-medium">{user.email?.split('@')[0]}</span>
                <div className="h-6 w-px bg-white/[0.08]" />
                <Button variant="subtle" size="sm" className="h-7 text-[11px] px-2.5" onClick={signOut}>Sign Out</Button>
              </div>
            ) : mounted ? (
              <Link href="/auth/login">
                <Button variant="primary" size="sm" className="h-8 px-4 text-[12px]">Sign In</Button>
              </Link>
            ) : (
              <div className="h-8 w-16" /> // Placeholder while mounting
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
