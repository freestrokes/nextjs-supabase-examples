import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useBoardStore } from '@/store/useBoardStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/router';
import { ChevronLeft, Send, Sparkles } from 'lucide-react';
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
      <div className="py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/board" className="group flex items-center gap-2 text-[13px] text-linear-text-tertiary hover:text-linear-text-primary transition-colors">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Issues
          </Link>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 text-[12px] border-white/[0.03]" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="h-8 gap-1.5 text-[12px] font-medium px-4 shadow-[0_1px_10px_rgba(94,106,210,0.2)]" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Send size={14} className={cn(isSubmitting && "animate-pulse")} />
              {isSubmitting ? 'Publishing...' : 'Publish Issue'}
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="space-y-6">
          <div className="px-2 space-y-4">
            <div className="flex items-center gap-2 text-linear-indigo">
              <Sparkles size={16} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">New Draft</span>
            </div>
            <input
              type="text"
              placeholder="Issue title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-[32px] font-medium text-linear-text-primary outline-none placeholder:text-white/[0.1] tracking-display"
              autoFocus
            />
          </div>
          
          <Card className="p-0 border-white/[0.05] bg-white/[0.01] overflow-hidden">
            <div className="min-h-[450px] linear-quill-wrapper">
              {mounted && (
                <Editor
                  value={content}
                  onChange={setContent}
                  placeholder="Add description..."
                />
              )}
            </div>
          </Card>
        </div>

        {/* Help Footer */}
        <div className="flex justify-between items-center px-2 text-[11px] text-linear-text-tertiary/40 font-medium tracking-wide uppercase">
          <div className="flex gap-4">
            <span>Markdown supported</span>
            <span>Auto-saving enabled</span>
          </div>
          <p>Publicly viewable by the community</p>
        </div>
      </div>
    </Layout>
  );
};

export default BoardWritePage;
