import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  author_name: string;
  created_at: string;
}

interface BoardState {
  posts: Post[];
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  addPost: (title: string, content: string, user_id: string, author_name: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updatePost: (id: string, title: string, content: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  posts: [],
  isLoading: false,
  fetchPosts: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) set({ posts: data as Post[] });
    set({ isLoading: false });
  },
  addPost: async (title, content, user_id, author_name) => {
    const { error } = await supabase.from('posts').insert([
      { title, content, user_id, author_name }
    ]);
    if (!error) await get().fetchPosts();
  },
  deletePost: async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) await get().fetchPosts();
  },
  updatePost: async (id, title, content) => {
    const { error } = await supabase.from('posts').update({ title, content }).eq('id', id);
    if (!error) await get().fetchPosts();
  },
}));
