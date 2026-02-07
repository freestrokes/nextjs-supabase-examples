import { QueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { JsonPlaceholderService } from '@/services/JsonPlaceholderService';

export const jsonPlaceholderQueryKeys = {
  all: ['jsonPlaceholder'] as const,
  posts: () => [...jsonPlaceholderQueryKeys.all, 'posts'] as const,
  post: (id: number) => [...jsonPlaceholderQueryKeys.posts(), id] as const,
};

export const useFetchJsonPlaceholderPosts = () => {
  return useQuery({
    queryKey: jsonPlaceholderQueryKeys.posts(),
    queryFn: JsonPlaceholderService.getPosts,
  });
};

export const useFetchJsonPlaceholderPost = (id: number) => {
  return useQuery({
    queryKey: jsonPlaceholderQueryKeys.post(id),
    queryFn: () => JsonPlaceholderService.getPost(id),
    enabled: !!id, // Only run if id is provided
  });
};

export const useCreateJsonPlaceholderPost = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: JsonPlaceholderService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jsonPlaceholderQueryKeys.posts() });
    },
  });
};

export const useUpdateJsonPlaceholderPost = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: { title?: string; body?: string; userId?: number } }) =>
      JsonPlaceholderService.updatePost(id, post),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: jsonPlaceholderQueryKeys.posts() });
      queryClient.invalidateQueries({ queryKey: jsonPlaceholderQueryKeys.post(variables.id) });
    },
  });
};

export const useDeleteJsonPlaceholderPost = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: JsonPlaceholderService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jsonPlaceholderQueryKeys.posts() });
    },
  });
};
