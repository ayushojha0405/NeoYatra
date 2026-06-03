import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiBaseUrl = rawApiUrl
  ? rawApiUrl.replace(/\/+$/, "") + "/api"
  : "/api";

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Token is now sent automatically via HttpOnly cookie
  // Fallback to localStorage for smooth transition of existing logged-in users during testing
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export default api;
