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
  Clock,
  Menu,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { useConfigStore } from '@/store/useConfigStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, setSession, signOut } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useConfigStore();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setIsMobileMenuOpen(false);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession, router.pathname]);

  if (!mounted) return null;

  const navItems = [
    { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('issues'), href: '/board', icon: MessageSquare },
    { name: t('recent'), href: '#', icon: Clock },
  ];

  const isAuthPage = router.pathname.startsWith('/auth');

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-linear-black font-inter antialiased text-linear-text-primary">
        <Head>
          <title>Linear Board</title>
        </Head>
        <main className="flex min-h-screen items-center justify-center p-4">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-linear-black font-inter antialiased text-linear-light-text dark:text-linear-text-primary transition-colors">
      <Head>
        <title>Linear Board</title>
      </Head>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-linear-light-border dark:border-white/[0.05] bg-linear-light-panel/80 dark:bg-linear-black/80 px-4 backdrop-blur-md lg:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-linear-light-text-muted dark:text-linear-text-tertiary hover:text-black dark:hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-linear-indigo flex items-center justify-center text-[8px] font-bold text-white shadow-lg">L</div>
          <span className="text-sm font-medium tracking-tight">Linear Board</span>
        </div>
        <div className="w-9" />
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-screen border-r border-linear-light-border dark:border-white/[0.05] bg-linear-light-panel dark:bg-linear-panel transition-all duration-300 ease-in-out lg:translate-x-0",
          isCollapsed ? "w-[60px]" : "w-[240px]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col justify-between p-3">
          <div className="space-y-6">
            {/* User Profile / Logo */}
            <div className={cn("flex items-center justify-between px-2 py-2", isCollapsed && "justify-center")}>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-6 w-6 rounded bg-linear-indigo flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg">L</div>
                {!isCollapsed && (
                  <span className="text-sm font-semibold truncate tracking-tight">
                    {user?.email?.split('@')[0] || 'Guest'}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="lg:hidden text-linear-light-text-muted dark:text-linear-text-tertiary hover:text-black dark:hover:text-white"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
            </div>

            {/* Nav Items */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.05]",
                    router.pathname === item.href 
                      ? "bg-black/[0.05] dark:bg-white/[0.08] text-black dark:text-white" 
                      : "text-linear-light-text-muted dark:text-linear-text-tertiary",
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
                <p className="text-[11px] font-bold text-linear-light-text-muted dark:text-linear-text-tertiary/40 uppercase tracking-widest">{t('workspace')}</p>
                <div className="space-y-1">
                  <button className="flex w-full items-center gap-3 px-1 py-1 text-[12px] text-linear-light-text-muted dark:text-linear-text-tertiary hover:text-black dark:hover:text-linear-text-primary transition-colors">
                    <PlusCircle size={14} /> {t('newProject')}
                  </button>
                  <button className="flex w-full items-center gap-3 px-1 py-1 text-[12px] text-linear-light-text-muted dark:text-linear-text-tertiary hover:text-black dark:hover:text-linear-text-primary transition-colors">
                    <Search size={14} /> {t('search')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-1 border-t border-linear-light-border dark:border-white/[0.05] pt-3">
            {/* Theme & Language Toggles */}
            {!isCollapsed && (
              <div className="flex items-center justify-between px-2 mb-2">
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-1.5 rounded-md hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-linear-light-text-muted dark:text-linear-text-tertiary transition-colors"
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button 
                  onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-[11px] font-bold text-linear-light-text-muted dark:text-linear-text-tertiary uppercase transition-colors"
                >
                  <Globe size={14} /> {language}
                </button>
              </div>
            )}

            <button 
              onClick={signOut}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-[13px] font-medium text-linear-light-text-muted dark:text-linear-text-tertiary hover:bg-black/[0.03] dark:hover:bg-white/[0.05] hover:text-red-500 dark:hover:text-red-400/80 transition-colors",
                isCollapsed && "justify-center"
              )}
            >
              <LogOut size={18} />
              {!isCollapsed && <span>{t('signOut')}</span>}
            </button>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex w-full items-center justify-center py-2 text-linear-light-text-muted dark:text-linear-text-tertiary/30 hover:text-black dark:hover:text-linear-text-tertiary transition-colors"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300 min-w-0",
          isCollapsed ? "lg:ml-[60px]" : "lg:ml-[240px]",
          "mt-14 lg:mt-0"
        )}
      >
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
};
