import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Report, PaginatedResponse, ApiResponse } from "@/types";

interface ReportsFilters {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}

export const useReports = (filters: ReportsFilters = {}) => {
  return useQuery<PaginatedResponse<Report>>({
    queryKey: ["reports", filters],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<PaginatedResponse<Report>>>(
          "/admin/reports",
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
        console.error("Reports fetch error:", error);
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

export const useReport = (reportId: string) => {
  return useQuery<Report>({
    queryKey: ["report", reportId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Report>>(
        `/admin/reports/${reportId}`
      );
      return response.data.data || response.data;
    },
    enabled: !!reportId,
  });
};

export const useReviewReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      reportId: string;
      status: "reviewed" | "resolved" | "dismissed";
      reviewNotes?: string;
    }) => {
      const { reportId, ...reviewData } = data;
      const response = await api.put(
        `/admin/reports/${reportId}/review`,
        reviewData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
