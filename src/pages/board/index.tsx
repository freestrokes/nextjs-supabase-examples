import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/common/Button';
import { useBoardStore } from '@/store/useBoardStore';
import Link from 'next/link';
import { Plus, MessageSquare, CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

const BoardListPage = () => {
  const { posts, fetchPosts, isLoading } = useBoardStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Layout>
      <div className="py-8 space-y-8 animate-in fade-in duration-700">
        {/* Header Section */}
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <h1 className="text-[20px] font-medium text-linear-text-primary tracking-tight">Issues</h1>
            <div className="flex items-center gap-3 text-[13px] text-linear-text-tertiary">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-linear-indigo" /> 24 Done</span>
              <span className="flex items-center gap-1.5"><Circle size={14} /> {posts.length} Open</span>
            </div>
          </div>
          <Link href="/board/write">
            <Button size="sm" className="h-8 gap-1.5 text-[12px] font-medium px-3 shadow-[0_1px_10px_rgba(94,106,210,0.2)]">
              <Plus size={14} />
              New Issue
            </Button>
          </Link>
        </div>

        {/* List Section */}
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] overflow-hidden shadow-2xl">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-linear-indigo border-t-transparent" />
              <p className="text-[13px] text-linear-text-tertiary">Fetching issues...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-white/[0.03] flex items-center justify-center text-linear-text-tertiary">
                <MessageSquare size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[14px] font-medium text-linear-text-primary">No issues found</p>
                <p className="text-[13px] text-linear-text-tertiary max-w-[240px]">Get started by creating your first post in the board.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.03]">
              {posts.map((post) => (
                <Link key={post.id} href={`/board/${post.id}`}>
                  <div className="group flex items-center justify-between py-3 px-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="text-linear-text-tertiary group-hover:text-linear-indigo transition-colors shrink-0">
                        <Circle size={16} />
                      </div>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-[11px] font-mono font-medium text-linear-text-tertiary uppercase tracking-wider shrink-0">LIN-{post.id.slice(0, 3)}</span>
                        <h3 className="text-[13px] font-medium text-linear-text-primary truncate">{post.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 shrink-0 ml-4">
                      <div className="hidden lg:flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-linear-indigo/50" />
                        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-linear-indigo/10 text-linear-indigo/80">Feature</span>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-linear-text-tertiary sm:min-w-[100px] justify-end">
                        <Clock size={12} className="hidden sm:block" />
                        <span className="shrink-0">{new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="hidden sm:flex h-6 w-6 rounded-full bg-white/[0.05] border border-white/[0.05] items-center justify-center text-[10px] font-bold text-linear-text-secondary uppercase">
                        {post.author_name.slice(0, 1)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Hint */}
        <div className="flex justify-center">
          <p className="text-[11px] text-linear-text-tertiary/40 font-medium tracking-wide uppercase">
            Tip: Press <kbd className="bg-white/[0.05] px-1 rounded border border-white/[0.05]">C</kbd> to create a new issue
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BoardListPage;
