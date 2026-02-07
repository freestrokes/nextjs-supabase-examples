import React, { useState } from 'react';
import Head from 'next/head';
import { useQueryClient } from '@tanstack/react-query';
import {
  useFetchJsonPlaceholderPosts,
  useCreateJsonPlaceholderPost,
  useUpdateJsonPlaceholderPost,
  useDeleteJsonPlaceholderPost
} from '@/queries/JsonPlaceholderQueries';

const DashboardPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: posts, isLoading, isError, error } = useFetchJsonPlaceholderPosts();
  const createMutation = useCreateJsonPlaceholderPost(queryClient);
  const updateMutation = useUpdateJsonPlaceholderPost(queryClient);
  const deleteMutation = useDeleteJsonPlaceholderPost(queryClient);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');

  const handleCreatePost = () => {
    createMutation.mutate({ title: newPostTitle, body: newPostBody, userId: 1 });
    setNewPostTitle('');
    setNewPostBody('');
  };

  const handleUpdatePost = (id: number) => {
    updateMutation.mutate({ id, post: { title: editPostTitle, body: editPostBody } });
    setEditPostId(null);
    setEditPostTitle('');
    setEditPostBody('');
  };

  const handleDeletePost = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

        {/* Create Post Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Post</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 rounded-md"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <textarea
              placeholder="Body"
              className="border p-2 rounded-md h-24"
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
            ></textarea>
            <button
              onClick={handleCreatePost}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </section>

        {/* Posts List */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post: any) => (
              <div key={post.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                {editPostId === post.id ? (
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      className="border p-1 rounded-md"
                      value={editPostTitle}
                      onChange={(e) => setEditPostTitle(e.target.value)}
                    />
                    <textarea
                      className="border p-1 rounded-md"
                      value={editPostBody}
                      onChange={(e) => setEditPostBody(e.target.value)}
                    ></textarea>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleUpdatePost(post.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                        disabled={updateMutation.isPending}
                      >
                        {updateMutation.isPending ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditPostId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                    <p className="text-gray-600 mt-2">{post.body}</p>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => {
                          setEditPostId(post.id);
                          setEditPostTitle(post.title);
                          setEditPostBody(post.body);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
