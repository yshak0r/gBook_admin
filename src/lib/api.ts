import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Utility function to transform MongoDB _id to id recursively
const transformMongoId = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(transformMongoId);
  }

  if (typeof obj === "object") {
    const transformed: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (key === "_id") {
        // Transform _id to id
        transformed.id = value;
      } else {
        // Recursively transform nested objects and arrays
        transformed[key] = transformMongoId(value);
      }
    }

    return transformed;
  }

  return obj;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors, transform _id to id, and log responses
api.interceptors.response.use(
  (response) => {
    // Transform _id to id in response data
    if (response.data) {
      response.data = transformMongoId(response.data);
    }

    // Log successful responses for debugging
    console.log(
      `API Response [${response.config.method?.toUpperCase()} ${
        response.config.url
      }]:`,
      response.data
    );
    return response;
  },
  (error) => {
    // Log error responses for debugging
    console.error(
      `API Error [${error.config?.method?.toUpperCase()} ${
        error.config?.url
      }]:`,
      {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      }
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
