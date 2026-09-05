import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useBoardStore } from '@/store/useBoardStore';
import { useConfigStore } from '@/store/useConfigStore';
import Link from 'next/link';
import { 
  FileText, 
  Users, 
  Activity, 
  CheckCircle2, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ExternalLink,
  Plus
} from 'lucide-react';

const DashboardPage = () => {
  const { posts, fetchPosts, isLoading } = useBoardStore();
  const { t } = useConfigStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Supabase 실시간 게시글 데이터 기반 통계 계산
  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const uniqueAuthors = new Set(posts.map(p => p.user_id)).size;
    const today = new Date().toISOString().split('T')[0];
    const postsToday = posts.filter(p => p.created_at?.startsWith(today)).length;
    const recentPosts = posts.slice(0, 5);

    return { totalPosts, uniqueAuthors, postsToday, recentPosts };
  }, [posts]);

  // shadcn 대시보드 차트용 월별 데이터 모의 집계 (실제 데이터 반영)
  const monthlyData = [
    { month: 'Jan', total: Math.max(12, Math.floor(stats.totalPosts * 0.4)) },
    { month: 'Feb', total: Math.max(18, Math.floor(stats.totalPosts * 0.5)) },
    { month: 'Mar', total: Math.max(15, Math.floor(stats.totalPosts * 0.6)) },
    { month: 'Apr', total: Math.max(25, Math.floor(stats.totalPosts * 0.7)) },
    { month: 'May', total: Math.max(32, Math.floor(stats.totalPosts * 0.85)) },
    { month: 'Jun', total: Math.max(28, stats.totalPosts || 35) },
    { month: 'Jul', total: Math.max(38, stats.totalPosts + 4) },
    { month: 'Aug', total: Math.max(45, stats.totalPosts + 8) },
    { month: 'Sep', total: Math.max(52, stats.totalPosts + 12) },
    { month: 'Oct', total: 48 },
    { month: 'Nov', total: 55 },
    { month: 'Dec', total: 62 },
  ];

  const maxMonthValue = Math.max(...monthlyData.map(d => d.total), 1);

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* 1. Header Section: Title + Actions (Date Picker & Download) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Overview of your backoffice operations, data throughput, and team activity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Jan 20, 2026 - Dec 31, 2026</span>
            </Button>
            <Button size="sm" className="h-9 gap-2 text-xs">
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </Button>
          </div>
        </div>

        {/* 2. Tabs Section (shadcn style) */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between border-b border-border pb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <Link href="/board/write">
              <Button size="sm" variant="secondary" className="h-8 gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" />
                <span>New Record</span>
              </Button>
            </Link>
          </div>

          {/* Tab 1: Overview */}
          <TabsContent value="overview" className="space-y-6 pt-2">
            
            {/* 4 KPI Metric Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              
              {/* Card 1: Total Posts */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPosts}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="text-emerald-500 font-medium">+20.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: Active Authors */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Authors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.uniqueAuthors}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="text-emerald-500 font-medium">+180.1%</span> total contributors
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Today's Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today&apos;s Volume</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{stats.postsToday}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="text-emerald-500 font-medium">+12%</span> since last hour
                  </p>
                </CardContent>
              </Card>

              {/* Card 4: Service Health */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Service Health</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Supabase API Connected
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main 2-Column Grid (Chart + Recent Activity) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              
              {/* Left Column (Col 4): Overview Bar Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    Monthly record throughput and activity for the current year.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* Clean SVG/CSS Bar Chart (shadcn dashboard style) */}
                  <div className="h-[280px] w-full flex items-end gap-2 sm:gap-4 pt-6 px-4">
                    {monthlyData.map((item) => {
                      const heightPercent = Math.round((item.total / maxMonthValue) * 100);
                      return (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                          <div className="relative w-full flex items-end justify-center">
                            {/* Hover Tooltip */}
                            <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border text-foreground text-[10px] font-bold py-0.5 px-1.5 rounded shadow-sm pointer-events-none whitespace-nowrap z-10">
                              {item.total} records
                            </div>
                            {/* Bar */}
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className="w-full max-w-[32px] rounded-t-sm bg-primary transition-all duration-300 group-hover:bg-primary/80"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Right Column (Col 3): Recent Activity */}
              <Card className="col-span-3">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      You have {stats.totalPosts} total recorded entries.
                    </CardDescription>
                  </div>
                  <Link href="/board">
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                      <span>View all</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      Array(4).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 animate-pulse">
                          <div className="h-9 w-9 rounded-full bg-muted" />
                          <div className="space-y-1 flex-1">
                            <div className="h-3.5 w-24 bg-muted rounded" />
                            <div className="h-3 w-40 bg-muted rounded" />
                          </div>
                          <div className="h-4 w-12 bg-muted rounded" />
                        </div>
                      ))
                    ) : stats.recentPosts.length === 0 ? (
                      <div className="py-12 text-center text-sm text-muted-foreground">
                        No activity yet. Create your first record!
                      </div>
                    ) : (
                      stats.recentPosts.map((post) => {
                        const initial = (post.author_name?.slice(0, 1) || 'U').toUpperCase();
                        const formattedDate = new Date(post.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        });

                        return (
                          <Link 
                            key={post.id} 
                            href={`/board/${post.id}`}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Avatar size="sm" className="h-9 w-9 bg-secondary">
                                <AvatarFallback className="text-xs font-bold text-foreground">
                                  {initial}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-0.5 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                  {post.title}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {post.author_name}
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                              <Badge variant="outline" className="text-[10px] font-medium border-border">
                                {formattedDate}
                              </Badge>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>

          </TabsContent>

          {/* Tab 2: Analytics */}
          <TabsContent value="analytics" className="space-y-4 pt-2">
            <Card>
              <CardHeader>
                <CardTitle>System Performance & Analytics</CardTitle>
                <CardDescription>
                  Deep dive metrics into database queries, response times, and storage usage.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border border-border bg-muted/20">
                    <p className="text-xs text-muted-foreground">Database Latency</p>
                    <p className="text-xl font-bold mt-1">24 ms</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-muted/20">
                    <p className="text-xs text-muted-foreground">Cache Hit Rate</p>
                    <p className="text-xl font-bold mt-1">94.8%</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-muted/20">
                    <p className="text-xs text-muted-foreground">Active Webhooks</p>
                    <p className="text-xl font-bold mt-1">4 Enabled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Reports */}
          <TabsContent value="reports" className="space-y-4 pt-2">
            <Card>
              <CardHeader>
                <CardTitle>Audit & Compliance Reports</CardTitle>
                <CardDescription>
                  Exportable logs and monthly snapshot archives.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Scheduled audit reports are generated on the 1st of every month.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Notifications */}
          <TabsContent value="notifications" className="space-y-4 pt-2">
            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
                <CardDescription>
                  Recent security alerts and system events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 rounded-md bg-muted/30 border border-border text-xs flex items-center justify-between">
                    <span>Database backup completed successfully.</span>
                    <span className="text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="p-3 rounded-md bg-muted/30 border border-border text-xs flex items-center justify-between">
                    <span>New administrator session registered from Seoul, KR.</span>
                    <span className="text-muted-foreground">5 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

      </div>
    </Layout>
  );
};

export default DashboardPage;
