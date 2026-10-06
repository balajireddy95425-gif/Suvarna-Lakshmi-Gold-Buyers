import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && sessionStorage.getItem("adminToken")) {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminLoggedIn");
      sessionStorage.removeItem("adminUsername");
      sessionStorage.removeItem("adminRole");
      if (window.location.pathname.startsWith("/admin") && !window.location.pathname.includes("login")) {
        window.location.replace("/admin/login");
      }
    }
    return Promise.reject(error);
  }
);

// =========================================
// API PATHS
// =========================================

const GOLD_RATES_API =
  import.meta.env.VITE_GOLD_RATES_API || "/gold-rates";

const ENQUIRIES_API =
  import.meta.env.VITE_ENQUIRIES_API || "/enquiries";

const APPOINTMENTS_API =
  import.meta.env.VITE_APPOINTMENTS_API || "/appointments";

const GOLD_CALCULATIONS_API =
  import.meta.env.VITE_GOLD_CALCULATIONS_API ||
  "/gold-calculations";

const BLOGS_API =
  import.meta.env.VITE_BLOGS_API || "/blogs";

const BRANCHES_API =
  import.meta.env.VITE_BRANCHES_API || "/branches";

// =========================================
// ADMIN AUTH
// =========================================
export const adminApi = {
  login: (data) => api.post("/admin/login", data),
  logout: () => api.post("/admin/logout"),
  getAll: () => api.get("/admin"),
  getById: (id) => api.get(`/admin/${id}`),
  create: (data) => api.post("/admin", data),
  update: (id, data) => api.put(`/admin/${id}`, data),
  updateStatus: (id, active) => api.put(`/admin/${id}/status`, { active }),
  remove: (id) => api.delete(`/admin/${id}`),
};

// =========================================
// GOLD RATES
// =========================================

export const goldRateApi = {
  getAll: () =>
    api.get(GOLD_RATES_API),

  getById: (id) =>
    api.get(`${GOLD_RATES_API}/${id}`),

  create: (data) =>
    api.post(GOLD_RATES_API, data),

  update: (id, data) =>
    api.put(`${GOLD_RATES_API}/${id}`, data),

  remove: (id) =>
    api.delete(`${GOLD_RATES_API}/${id}`),
};

// =========================================
// ENQUIRIES
// =========================================

export const enquiryApi = {
  getAll: () =>
    api.get(ENQUIRIES_API),

  getById: (id) =>
    api.get(`${ENQUIRIES_API}/${id}`),

  create: (data) =>
    api.post(ENQUIRIES_API, data),

  remove: (id) =>
    api.delete(`${ENQUIRIES_API}/${id}`),

  updateStatus: (id, status) =>
    api.put(
      `${ENQUIRIES_API}/${id}/status`,
      { status }
    ),
};

// =========================================
// APPOINTMENTS
// =========================================

export const appointmentApi = {
  getAll: () =>
    api.get(APPOINTMENTS_API),

  getById: (id) =>
    api.get(`${APPOINTMENTS_API}/${id}`),

  create: (data) =>
    api.post(APPOINTMENTS_API, data),

  update: (id, data) =>
    api.put(
      `${APPOINTMENTS_API}/${id}`,
      data
    ),

  remove: (id) =>
    api.delete(
      `${APPOINTMENTS_API}/${id}`
    ),

  updateStatus: (id, status) =>
    api.put(
      `${APPOINTMENTS_API}/${id}/status`,
      { status }
    ),
};

// =========================================
// GOLD CALCULATIONS
// =========================================

export const goldCalculationApi = {
  getAll: () =>
    api.get(GOLD_CALCULATIONS_API),

  getById: (id) =>
    api.get(`${GOLD_CALCULATIONS_API}/${id}`),

  create: (data) =>
    api.post(GOLD_CALCULATIONS_API, data),

  updateStatus: (id, status) =>
    api.put(
      `${GOLD_CALCULATIONS_API}/${id}/status`,
      { status }
    ),
};

// =========================================
// BLOG
// =========================================

export const blogApi = {
  getAll: () =>
    api.get(BLOGS_API),

  getPublished: () =>
    api.get(`${BLOGS_API}/published`),

  getById: (id) =>
    api.get(`${BLOGS_API}/${id}`),

  getBySlug: (slug) =>
    api.get(`${BLOGS_API}/slug/${slug}`),

  create: (data) =>
    api.post(BLOGS_API, data),

  update: (id, data) =>
    api.put(
      `${BLOGS_API}/${id}`,
      data
    ),

  remove: (id) =>
    api.delete(`${BLOGS_API}/${id}`),
};

// =========================================
// BRANCHES
// =========================================

export const branchApi = {
  getAll: () =>
    api.get(BRANCHES_API),

  getActive: () =>
    api.get(`${BRANCHES_API}/active`),

  getById: (id) =>
    api.get(`${BRANCHES_API}/${id}`),

  create: (data) =>
    api.post(BRANCHES_API, data),

  update: (id, data) =>
    api.put(
      `${BRANCHES_API}/${id}`,
      data
    ),

  remove: (id) =>
    api.delete(
      `${BRANCHES_API}/${id}`
    ),
};

// =========================================
// EXPORT DEFAULT API
// =========================================

export default api;