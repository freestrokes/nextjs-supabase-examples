import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useBoardStore, Post } from '@/store/useBoardStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ChevronLeft, Trash2, Edit3, Calendar, User, Hash } from 'lucide-react';
import Link from 'next/link';

const BoardDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { posts, deletePost, fetchPosts } = useBoardStore();
  const { user } = useAuthStore();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
    const foundPost = posts.find((p) => p.id === id);
    if (foundPost) setPost(foundPost);
  }, [id, posts, fetchPosts]);

  const handleDelete = async () => {
    if (!id || typeof id !== 'string') return;
    if (confirm('Are you sure you want to delete this issue?')) {
      await deletePost(id);
      router.push('/board');
    }
  };

  if (!post) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-linear-indigo border-t-transparent" />
        </div>
      </Layout>
    );
  }

  const isAuthor = user?.id === post.user_id;

  return (
    <Layout>
      <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Breadcrumbs & Actions */}
        <div className="flex items-center justify-between">
          <Link href="/board" className="group flex items-center gap-2 text-[13px] text-linear-text-tertiary hover:text-linear-text-primary transition-colors">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Issues
          </Link>
          
          {isAuthor && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-[12px] border-white/[0.03]">
                <Edit3 size={14} />
                Edit
              </Button>
              <Button variant="subtle" size="sm" className="h-8 gap-1.5 text-[12px] text-red-400/80 hover:text-red-400 border-white/[0.03]" onClick={handleDelete}>
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono font-medium text-linear-indigo px-2 py-0.5 rounded bg-linear-indigo/10 border border-linear-indigo/20">
                  LIN-{post.id.slice(0, 3).toUpperCase()}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/[0.2]" />
                <span className="text-[12px] text-linear-text-tertiary font-medium uppercase tracking-wider">Feature Request</span>
              </div>
              <h1 className="text-[32px] font-medium text-linear-text-primary tracking-display leading-tight">
                {post.title}
              </h1>
            </div>

            <Card className="p-8 border-white/[0.05] bg-white/[0.01] min-h-[300px]">
              <div 
                className="prose prose-invert max-w-none text-[15px] leading-relaxed text-linear-text-secondary font-normal"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Card>
          </div>

          {/* Sidebar Metadata */}
          <div className="space-y-6 lg:border-l lg:border-white/[0.05] lg:pl-8">
            <div className="space-y-1">
              <p className="text-[11px] font-medium text-linear-text-tertiary uppercase tracking-widest">Properties</p>
              <div className="py-2 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-linear-text-tertiary flex items-center gap-2">
                    <User size={14} /> Author
                  </span>
                  <span className="text-[13px] text-linear-text-primary font-medium">{post.author_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-linear-text-tertiary flex items-center gap-2">
                    <Calendar size={14} /> Created
                  </span>
                  <span className="text-[13px] text-linear-text-primary font-medium">
                    {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-linear-text-tertiary flex items-center gap-2">
                    <Hash size={14} /> ID
                  </span>
                  <span className="text-[13px] font-mono text-linear-text-tertiary">{post.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/[0.05]" />

            <div className="space-y-3">
              <p className="text-[11px] font-medium text-linear-text-tertiary uppercase tracking-widest">Labels</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded-full bg-linear-indigo/10 text-linear-indigo text-[11px] font-medium border border-linear-indigo/20">Frontend</span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-linear-text-tertiary text-[11px] font-medium border border-white/[0.05]">High Priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BoardDetailPage;
