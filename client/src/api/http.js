import axios from "axios";

const api = axios.create({
  // Keep the base URL as "/api" so the Vite proxy can handle requests.
  // Environment configuration takes priority when it is provided.
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const productApi = {
  getProducts: (params = {}) => api.get("/products", { params }),
  getProductBySlug: (slug) => api.get(`/products/slug/${slug}`),
  getProductById: (id) => api.get(`/products/${id}`),
  getProduct: (slugOrId) => api.get(`/products/${slugOrId}`),
  createProduct: (payload) => api.post("/products", payload),
  updateProduct: (id, payload) => api.put(`/products/${id}`, payload),
  deleteProduct: (id) => api.delete(`/products/${id}`)
};

export const leadApi = {
  // Sends quote requests to the leads endpoint.
  createLead: (payload) => api.post("/leads", payload),
  getLeads: () => api.get("/leads")
};

export const contactApi = {
  createContact: (payload) => api.post("/contact", payload),
  getContacts: () => api.get("/contact")
};

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  signup: (payload) => api.post("/auth/signup", payload)
};  

export const testimonialApi = {
  getTestimonials: () => api.get("/testimonials"),
  createTestimonial: (payload) => api.post("/testimonials", payload),
  updateTestimonial: (id, payload) => api.put(`/testimonials/${id}`, payload),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`)
};

export const sectionItemApi = {
  getItems: (section) => api.get("/section-items", { params: section ? { section } : {} }),
  createItem: (payload) => api.post("/section-items", payload),
  updateItem: (id, payload) => api.put(`/section-items/${id}`, payload),
  deleteItem: (id) => api.delete(`/section-items/${id}`)
};

export default api;
