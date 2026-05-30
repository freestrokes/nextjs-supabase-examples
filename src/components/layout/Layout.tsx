import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  Search,
  Clock
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, setSession, signOut } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

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

  if (!mounted) return null;

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Issues', href: '/board', icon: MessageSquare },
    { name: 'Recent', href: '#', icon: Clock },
  ];

  const isAuthPage = router.pathname.startsWith('/auth');

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-linear-black font-inter antialiased text-linear-text-primary">
        <Head>
          <title>Linear Board</title>
        </Head>
        <main className="flex min-h-screen items-center justify-center">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-linear-black font-inter antialiased text-linear-text-primary">
      <Head>
        <title>Linear Board</title>
      </Head>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-white/[0.05] bg-linear-panel transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        <div className="flex h-full flex-col justify-between p-3">
          <div className="space-y-6">
            {/* User Profile / Logo */}
            <div className={cn("flex items-center gap-3 px-2 py-2", isCollapsed && "justify-center")}>
              <div className="h-6 w-6 rounded bg-linear-indigo flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg">L</div>
              {!isCollapsed && (
                <span className="text-sm font-semibold truncate tracking-tight">
                  {user?.email?.split('@')[0] || 'Guest'}
                </span>
              )}
            </div>

            {/* Nav Items */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors hover:bg-white/[0.05]",
                    router.pathname === item.href ? "bg-white/[0.08] text-white" : "text-linear-text-tertiary",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon size={18} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>

            {/* Quick Actions */}
            {!isCollapsed && (
              <div className="px-2 space-y-4 pt-4">
                <p className="text-[11px] font-bold text-linear-text-tertiary/40 uppercase tracking-widest">Workspace</p>
                <div className="space-y-1">
                  <button className="flex w-full items-center gap-3 px-1 py-1 text-[12px] text-linear-text-tertiary hover:text-linear-text-primary">
                    <PlusCircle size={14} /> New Project
                  </button>
                  <button className="flex w-full items-center gap-3 px-1 py-1 text-[12px] text-linear-text-tertiary hover:text-linear-text-primary">
                    <Search size={14} /> Search
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-1 border-t border-white/[0.05] pt-3">
            <button 
              onClick={signOut}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-[13px] font-medium text-linear-text-tertiary hover:bg-white/[0.05] hover:text-red-400/80 transition-colors",
                isCollapsed && "justify-center"
              )}
            >
              <LogOut size={18} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex w-full items-center justify-center py-2 text-linear-text-tertiary/30 hover:text-linear-text-tertiary transition-colors"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          isCollapsed ? "ml-[60px]" : "ml-[240px]"
        )}
      >
        <div className="mx-auto max-w-5xl px-8 py-12">
          {children}
        </div>
      </main>
    </div>
  );
};
