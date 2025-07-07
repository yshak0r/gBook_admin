import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Tag, PaginatedResponse, ApiResponse } from "@/types";

interface TagsFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export const useTags = (filters: TagsFilters = {}) => {
  return useQuery<PaginatedResponse<Tag>>({
    queryKey: ["tags", filters],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<PaginatedResponse<Tag>>>(
          "/admin/tags",
          {
            params: filters,
          }
        );

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
      } catch (error) {
        console.error("Tags fetch error:", error);
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

export const useTag = (tagId: string) => {
  return useQuery<Tag>({
    queryKey: ["tag", tagId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Tag>>(`/admin/tags/${tagId}`);
      return response.data.data || response.data;
    },
    enabled: !!tagId,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; category?: string }) => {
      const response = await api.post("/admin/tags", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      tagId: string;
      name: string;
      category?: string;
    }) => {
      const { tagId, ...updateData } = data;
      const response = await api.put(`/admin/tags/${tagId}`, updateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tagId: string) => {
      const response = await api.delete(`/admin/tags/${tagId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};
