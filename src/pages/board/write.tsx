import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useBoardStore } from '@/store/useBoardStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BoardWritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addPost } = useBoardStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in first');
      return;
    }
    if (!title || !content) return;

    await addPost(title, content, user.id, user.email || 'Anonymous');
    router.push('/board');
  };

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-linear-text-primary tracking-tight">Create Post</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>Cancel</Button>
            <Button size="sm" onClick={handleSubmit}>Publish</Button>
          </div>
        </div>

        <Card className="space-y-4 border-linear-border/30 bg-white/2">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-xl font-medium text-linear-text-primary outline-none placeholder:text-linear-text-tertiary/50"
            />
          </div>
          
          <div className="min-h-[400px]">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              className="h-[350px]"
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default BoardWritePage;
