import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Campus, College, Department, ApiResponse } from "@/types";

export const useAcademicStructure = () => {
  return useQuery<Campus[]>({
    queryKey: ["academic-structure"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<Campus[]>>(
          "/categories/structure"
        );

        if (response.data.data) {
          return response.data.data;
        } else if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Academic structure fetch error:", error);
        return [];
      }
    },
  });
};

export const useCampuses = () => {
  return useQuery<Campus[]>({
    queryKey: ["campuses"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<Campus[]>>(
          "/categories/campuses"
        );

        if (response.data.data) {
          return response.data.data;
        } else if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Campuses fetch error:", error);
        return [];
      }
    },
  });
};

export const useColleges = (campusId?: string) => {
  return useQuery<College[]>({
    queryKey: ["colleges", campusId],
    queryFn: async () => {
      try {
        const url = campusId
          ? `/categories/campuses/${campusId}/colleges`
          : "/categories/colleges";
        const response = await api.get<ApiResponse<College[]>>(url);

        if (response.data.data) {
          return response.data.data;
        } else if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Colleges fetch error:", error);
        return [];
      }
    },
    enabled: !!campusId,
  });
};

export const useDepartments = (collegeId?: string) => {
  return useQuery<Department[]>({
    queryKey: ["departments", collegeId],
    queryFn: async () => {
      try {
        const url = collegeId
          ? `/categories/colleges/${collegeId}/departments`
          : "/categories/departments";
        const response = await api.get<ApiResponse<Department[]>>(url);

        if (response.data.data) {
          return response.data.data;
        } else if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Departments fetch error:", error);
        return [];
      }
    },
    enabled: !!collegeId,
  });
};

export const useCreateCampus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      const response = await api.post("/admin/campuses", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
      queryClient.invalidateQueries({ queryKey: ["academic-structure"] });
    },
  });
};

export const useCreateCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      campusId: string;
      description?: string;
    }) => {
      const response = await api.post("/admin/colleges", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
      queryClient.invalidateQueries({ queryKey: ["academic-structure"] });
    },
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      collegeId: string;
      description?: string;
    }) => {
      const response = await api.post("/admin/departments", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["academic-structure"] });
    },
  });
};
