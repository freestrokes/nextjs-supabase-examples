import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Table2, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Menu,
  Sun,
  Moon,
  Globe,
  SlidersHorizontal,
  Building2,
  ShieldCheck,
  Check,
  ChevronsUpDown,
  Bell
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { useConfigStore } from '@/store/useConfigStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession, router.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!mounted) return null;

  const navItems = [
    { name: t('dashboard') || 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: t('issues') || 'Tasks / Board', href: '/board', icon: Table2 },
  ];

  const isAuthPage = router.pathname.startsWith('/auth');

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background font-sans antialiased text-foreground flex items-center justify-center p-4">
        <Head>
          <title>BackOffice - Authentication</title>
        </Head>
        <main className="w-full max-w-md">
          {children}
        </main>
      </div>
    );
  }

  const userInitial = (user?.email?.slice(0, 1) || 'A').toUpperCase();
  const userDisplayName = user?.email?.split('@')[0] || 'Administrator';

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Head>
        <title>BackOffice - shadcn/ui Dashboard</title>
      </Head>

      {/* 1. Global Top Navigation (shadcn/ui Dashboard Header) */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 md:px-6 justify-between gap-4">
          
          {/* Left: Mobile Toggle & Workspace Switcher */}
          <div className="flex items-center gap-3 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Team / Workspace Dropdown Badge */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-secondary/70 border border-border text-sm font-semibold">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">Acme BackOffice</span>
              <span className="sm:hidden">Acme</span>
              <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
            </div>

            {/* Header Main Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
              <Link
                href="/dashboard"
                className={cn(
                  "transition-colors hover:text-foreground",
                  router.pathname === '/dashboard' ? "text-foreground font-semibold" : "text-muted-foreground"
                )}
              >
                Overview
              </Link>
              <Link
                href="/board"
                className={cn(
                  "transition-colors hover:text-foreground",
                  router.pathname.startsWith('/board') ? "text-foreground font-semibold" : "text-muted-foreground"
                )}
              >
                Management
              </Link>
            </nav>
          </div>

          {/* Right: Search, Utility Toggles & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative hidden lg:block w-52 xl:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search backoffice..."
                className="pl-8 h-8 text-xs bg-muted/40 border-border"
              />
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="h-8 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground uppercase"
              title="Toggle Language"
            >
              <Globe className="h-3.5 w-3.5 mr-1" />
              {language}
            </Button>

            {/* Dark/Light Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </Button>

            {/* User Profile Avatar with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
              >
                <Avatar size="sm" className="h-8 w-8 bg-secondary border border-border">
                  <AvatarFallback className="text-xs font-bold text-foreground">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md z-50 animate-in fade-in-0 zoom-in-95"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-2 py-1.5 text-xs">
                    <p className="font-semibold text-foreground truncate">{userDisplayName}</p>
                    <p className="text-muted-foreground truncate">{user?.email || 'admin@example.com'}</p>
                  </div>
                  <div className="h-px bg-border my-1" />
                  <div className="px-2 py-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Role: Master Admin</span>
                  </div>
                  <div className="h-px bg-border my-1" />
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>{t('signOut') || 'Log out'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Body Container with Sidebar + Content */}
      <div className="flex">
        
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden md:flex flex-col justify-between border-r border-border bg-card/40 transition-all duration-300 min-h-[calc(100vh-3.5rem)] sticky top-14",
            isCollapsed ? "w-16" : "w-60"
          )}
        >
          <div className="p-3 space-y-4">
            {/* Sidebar Navigation */}
            <div className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                  Platform
                </p>
              )}
              {navItems.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-secondary text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      isCollapsed && "justify-center px-2"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>

            {/* Section 2: Management Links */}
            {!isCollapsed && (
              <div className="pt-4 border-t border-border space-y-1">
                <p className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                  System
                </p>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Audit Logs</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Preferences</span>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Footer Collapse Toggle */}
          <div className="p-3 border-t border-border flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-7 w-full flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </aside>

        {/* Mobile Slide-over Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background border-r border-border p-5 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-sm">Acme BackOffice</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      router.pathname === item.href
                        ? "bg-secondary text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs text-destructive hover:bg-destructive/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('signOut') || 'Log out'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Dashboard Workspace Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
};
