import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBoardStore } from '@/store/useBoardStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/router';
import { ChevronLeft, Send, Sparkles, FileEdit } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

const Editor = dynamic(() => import('@/components/board/Editor'), { ssr: false });

const BoardWritePage = () => {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addPost } = useBoardStore();
  const { user } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!user) {
      alert('Please sign in first');
      return;
    }
    if (!title || !content) return;

    try {
      setIsSubmitting(true);
      await addPost(title, content, user.id, user.email || 'Anonymous');
      router.push('/board');
    } catch (error) {
      console.error('Failed to publish post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Breadcrumb & Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Link href="/board">
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Tasks</span>
              </Button>
            </Link>
            <span className="text-muted-foreground">/</span>
            <div className="flex items-center gap-2">
              <FileEdit className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">New Administrative Record</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="h-8 gap-1.5 text-xs font-medium" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Send className={cn("h-3.5 w-3.5", isSubmitting && "animate-pulse")} />
              {isSubmitting ? 'Saving...' : 'Save Task'}
            </Button>
          </div>
        </div>

        {/* Form Content Area */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Task Title
            </label>
            <Input
              type="text"
              placeholder="Enter task title or issue description..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 text-base bg-card font-medium"
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Task Details & Description
            </label>
            <Card className="p-0 border-border overflow-hidden bg-card">
              <div className="min-h-[400px] linear-quill-wrapper">
                {mounted && (
                  <Editor
                    value={content}
                    onChange={setContent}
                    placeholder="Write your task specification or notes..."
                  />
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-xs text-muted-foreground pt-2">
          <span>Rich text supported • Recorded to Supabase audit log</span>
          <Badge variant="outline" className="text-[10px]">Ready to Submit</Badge>
        </div>
      </div>
    </Layout>
  );
};

export default BoardWritePage;
