import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { User, PaginatedResponse, ApiResponse } from "@/types";

interface UsersFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  campus?: string;
  college?: string;
  department?: string;
  status?: string;
}

export const useUsers = (filters: UsersFilters = {}) => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ["users", filters],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaginatedResponse<User>>>(
        "/admin/users",
        {
          params: filters,
        }
      );

      // Handle different possible response structures
      if (response.data.data) {
        return response.data.data;
      } else if (Array.isArray(response.data)) {
        // If response.data is directly an array, create pagination structure
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
        // Fallback structure
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

export const useUser = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<User>>(
        `/admin/users/${userId}`
      );
      return response.data.data || response.data;
    },
    enabled: !!userId,
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.post(`/admin/users/${userId}/deactivate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await api.post(`/admin/users/${userId}/activate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
