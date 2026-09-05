import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useBoardStore, Post } from '@/store/useBoardStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ChevronLeft, Trash2, Edit3, Calendar, User, Hash, CheckCircle2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

const BoardDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { posts, deletePost, fetchPosts } = useBoardStore();
  const { user } = useAuthStore();
  const [post, setPost] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
    const foundPost = posts.find((p) => p.id === id);
    if (foundPost) setPost(foundPost);
  }, [id, posts, fetchPosts]);

  const handleDelete = async () => {
    if (!id || typeof id !== 'string' || isDeleting) return;
    if (confirm('Are you sure you want to delete this administrative record?')) {
      try {
        setIsDeleting(true);
        await deletePost(id);
        router.push('/board');
      } catch (error) {
        console.error('Failed to delete post:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!post) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  const isAuthor = user?.id === post.user_id;
  const initial = (post.author_name?.slice(0, 1) || 'A').toUpperCase();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb & Actions Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Link href="/board">
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Tasks</span>
            </Button>
          </Link>
          
          {isAuthor && (
            <div className="flex items-center gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                className="h-8 gap-1.5 text-xs" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className={cn("h-3.5 w-3.5", isDeleting && "animate-spin")} />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          )}
        </div>

        {/* 2-Column Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column (2/3) */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="space-y-3 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[11px] py-0.5">
                    TSK-{post.id.slice(0, 4).toUpperCase()}
                  </Badge>
                  <Badge variant="success" className="gap-1 text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active Record
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div 
                  className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-foreground font-normal min-h-[220px]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Metadata Sidebar (1/3) */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="text-sm font-semibold">Record Metadata</CardTitle>
                <CardDescription className="text-xs">Database entity details</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <User className="h-3.5 w-3.5" /> Author
                  </span>
                  <div className="flex items-center gap-2 font-medium">
                    <Avatar size="sm" className="h-5 w-5">
                      <AvatarFallback className="text-[10px]">{initial}</AvatarFallback>
                    </Avatar>
                    <span>{post.author_name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" /> Created At
                  </span>
                  <span className="font-medium text-foreground">
                    {new Date(post.created_at).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5" /> UUID
                  </span>
                  <span className="font-mono text-muted-foreground">{post.id.slice(0, 8)}...</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> RLS Security
                  </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">Enforced</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default BoardDetailPage;
