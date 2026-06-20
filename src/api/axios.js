import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true, // برای SSO / Cookie-based auth
});

//  اینجا اضافه میشه (Request Interceptor)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // حذف اطلاعات کاربر
      localStorage.removeItem("token");

      // هدایت به لاگین
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
