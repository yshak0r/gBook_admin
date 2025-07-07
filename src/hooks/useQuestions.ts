import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Question, PaginatedResponse, ApiResponse } from "@/types";

interface QuestionsFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  category?: string;
}

export const useQuestions = (filters: QuestionsFilters = {}) => {
  return useQuery<PaginatedResponse<Question>>({
    queryKey: ["questions", filters],
    queryFn: async () => {
      try {
        const response = await api.get<
          ApiResponse<PaginatedResponse<Question>>
        >("/admin/questions", {
          params: filters,
        });

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
        console.error("Questions fetch error:", error);
        // Return empty structure on error
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

export const useQuestion = (questionId: string) => {
  return useQuery<Question>({
    queryKey: ["question", questionId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Question>>(
        `/admin/questions/${questionId}`
      );
      return response.data.data || response.data;
    },
    enabled: !!questionId,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      text: string;
      type: "lastword" | "profile" | "post";
      category?: string;
    }) => {
      const response = await api.post("/admin/questions", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      questionId: string;
      text: string;
      type: "lastword" | "profile" | "post";
      category?: string;
    }) => {
      const { questionId, ...updateData } = data;
      const response = await api.put(
        `/admin/questions/${questionId}`,
        updateData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: string) => {
      const response = await api.delete(`/admin/questions/${questionId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};
