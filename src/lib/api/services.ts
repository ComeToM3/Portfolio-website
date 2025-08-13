import api from './axios';

// Types pour les données
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

// Service d'authentification
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Service utilisateur
export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },
};

// Service des projets
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  
  create: async (projectData: Omit<Project, 'id'>) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  
  update: async (id: string, projectData: Partial<Project>) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Service des compétences
export const skillService = {
  getAll: async (): Promise<Skill[]> => {
    const response = await api.get('/skills');
    return response.data;
  },
  
  getByCategory: async (category: string): Promise<Skill[]> => {
    const response = await api.get(`/skills/category/${category}`);
    return response.data;
  },
  
  create: async (skillData: Omit<Skill, 'id'>) => {
    const response = await api.post('/skills', skillData);
    return response.data;
  },
  
  update: async (id: string, skillData: Partial<Skill>) => {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  },
};

// Service de contact
export const contactService = {
  sendMessage: async (contactData: ContactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
};

// Service d'analytics
export const analyticsService = {
  trackPageView: async (page: string) => {
    const response = await api.post('/analytics/pageview', { page });
    return response.data;
  },
  
  trackEvent: async (event: string, data?: Record<string, unknown>) => {
    const response = await api.post('/analytics/event', { event, data });
    return response.data;
  },
};
