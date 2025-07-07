import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Post, PaginatedResponse, ApiResponse } from "@/types";

interface PostsFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  userId?: string;
}

export const usePosts = (filters: PostsFilters = {}) => {
  return useQuery<PaginatedResponse<Post>>({
    queryKey: ["posts", filters],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaginatedResponse<Post>>>(
        "/posts",
        {
          params: filters,
        }
      );

      // Handle different possible response structures
      if (response.data.data) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        return {
          data: response.data,
          pagination: {
            currentPage: filters.page || 1,
            totalPages: 1,
            totalItems: response.data.length,
            itemsPerPage: filters.limit || 10,
          },
        };
      } else {
        return {
          data: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 10,
          },
        };
      }
    },
    keepPreviousData: true,
  });
};

export const usePost = (postId: string) => {
  return useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Post>>(`/posts/${postId}`);
      return response.data.data || response.data;
    },
    enabled: !!postId,
  });
};

export const useSoftDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await api.delete(`/posts/${postId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
