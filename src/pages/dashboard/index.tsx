import React, { useEffect, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/common/Card';
import { useBoardStore } from '@/store/useBoardStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  TrendingUp, 
  Users, 
  Layers, 
  Activity, 
  ArrowUpRight, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
  const { posts, fetchPosts, isLoading } = useBoardStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const uniqueAuthors = new Set(posts.map(p => p.user_id)).size;
    const today = new Date().toISOString().split('T')[0];
    const postsToday = posts.filter(p => p.created_at.startsWith(today)).length;
    const recentPosts = posts.slice(0, 3);

    return { totalPosts, uniqueAuthors, postsToday, recentPosts };
  }, [posts]);

  return (
    <Layout>
      <div className="space-y-10 animate-in fade-in duration-1000">
        {/* Section 1: Visual Branding & Welcome */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-linear-indigo">
            <Sparkles size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">System Insight</span>
          </div>
          <h1 className="text-[32px] font-medium tracking-display text-linear-text-primary">
            Welcome back, <br />
            <span className="text-linear-text-tertiary">Here's what's happening today.</span>
          </h1>
        </header>

        {/* Section 2: Monitoring Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Issues" 
            value={stats.totalPosts} 
            icon={Layers} 
            trend="+12%" 
          />
          <StatCard 
            title="Active Authors" 
            value={stats.uniqueAuthors} 
            icon={Users} 
          />
          <StatCard 
            title="Today's Activity" 
            value={stats.postsToday} 
            icon={Activity} 
            trend="New" 
            trendColor="text-linear-indigo"
          />
          <StatCard 
            title="System Health" 
            value="98.2%" 
            icon={TrendingUp} 
          />
        </div>

        {/* Section 3: Discovery (Recent Content) */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[14px] font-semibold text-linear-text-secondary uppercase tracking-wider">Recent Discoveries</h2>
            <Link href="/board" className="text-[12px] text-linear-text-tertiary hover:text-linear-indigo flex items-center gap-1 transition-colors">
              View all issues <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 rounded-lg bg-white/[0.02] border border-white/[0.05] animate-pulse" />
              ))
            ) : stats.recentPosts.map((post) => (
              <Link key={post.id} href={`/board/${post.id}`}>
                <Card hoverable className="h-full p-5 flex flex-col justify-between border-white/[0.05] bg-white/[0.01]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-linear-indigo" />
                      <span className="text-[11px] font-mono text-linear-text-tertiary">LIN-{post.id.slice(0, 3).toUpperCase()}</span>
                    </div>
                    <h3 className="text-[14px] font-medium text-linear-text-primary line-clamp-2 leading-snug">{post.title}</h3>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-[12px] text-linear-text-tertiary">{post.author_name}</span>
                    <span className="text-[11px] text-linear-text-tertiary/50 uppercase tracking-tighter">
                      {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Branding Footer Hint */}
        <footer className="pt-10 border-t border-white/[0.03] text-center">
          <p className="text-[11px] text-linear-text-tertiary/30 font-medium tracking-widest uppercase">
            Engineered for Precision • Powered by Supabase Real-time
          </p>
        </footer>
      </div>
    </Layout>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, trendColor = "text-green-400/80" }: any) => (
  <Card className="p-5 space-y-3 border-white/[0.05] bg-white/[0.02]">
    <div className="flex items-center justify-between">
      <div className="h-8 w-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-linear-text-secondary">
        <Icon size={18} />
      </div>
      {trend && <span className={`text-[11px] font-bold ${trendColor}`}>{trend}</span>}
    </div>
    <div className="space-y-1">
      <p className="text-[12px] font-medium text-linear-text-tertiary">{title}</p>
      <p className="text-[20px] font-semibold text-linear-text-primary tracking-tight">{value}</p>
    </div>
  </Card>
);

export default DashboardPage;
