import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useBoardStore } from '@/store/useBoardStore';
import Link from 'next/link';
import { Plus, MessageSquare } from 'lucide-react';

const BoardListPage = () => {
  const { posts, fetchPosts, isLoading } = useBoardStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Layout>
      <div className="space-y-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-linear-text-primary tracking-tight">Issues</h1>
            <p className="text-sm text-linear-text-tertiary">Manage and track your posts</p>
          </div>
          <Link href="/board/write">
            <Button size="sm" className="gap-2">
              <Plus size={16} />
              New Post
            </Button>
          </Link>
        </div>

        <div className="rounded-lg border border-linear-border/50 bg-white/1 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-linear-text-tertiary">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center text-linear-text-tertiary">
              No posts found. Start by creating one!
            </div>
          ) : (
            <div className="divide-y divide-linear-border/30">
              {posts.map((post) => (
                <Link key={post.id} href={`/board/${post.id}`}>
                  <div className="flex items-center justify-between p-4 hover:bg-white/3 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="text-linear-violet opacity-60 group-hover:opacity-100 transition-opacity">
                        <MessageSquare size={18} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-linear-text-primary">{post.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-linear-text-tertiary">
                          <span>{post.author_name}</span>
                          <span>•</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BoardListPage;
