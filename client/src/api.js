<<<<<<< HEAD


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const customerToken = localStorage.getItem("bondhu_customer_token");
  const adminToken = localStorage.getItem("bondhu_token");

  const token = customerToken || adminToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

=======
import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });
api.interceptors.request.use(config => {
  const token = localStorage.getItem("bondhu_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
>>>>>>> 8c310ee99bf1474734a2671225b7506f5dcd95a5
export default api;
