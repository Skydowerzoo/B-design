import apiService from '../api';

// Interface pour le type Project
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  image_url?: string;
  client?: string;
  role?: string;
  detailed_description?: string;
  process?: string[];
  gallery?: string[];
}

// Service spécifique pour les projets
export const projectsService = {
  // Récupérer tous les projets
  async getAllProjects() {
    return apiService.get('/projects');
  },

  // Récupérer un projet par son ID
  async getProjectById(id: number) {
    return apiService.get(`/projects/${id}`);
  },

  // Récupérer les projets par catégorie
  async getProjectsByCategory(category: string) {
    return apiService.get('/projects', { category });
  },

  // Rechercher des projets
  async searchProjects(query: string) {
    return apiService.get('/projects/search', { query });
  },

  // Récupérer les projets paginés
  async getProjectsPaginated(page: number = 1, limit: number = 10) {
    return apiService.get('/projects', { page, limit });
  },

  // Ajouter un nouveau projet
  async addProject(project: Omit<Project, 'id'>) {
    return apiService.post('/projects', project);
  },

  // Mettre à jour un projet
  async updateProject(id: number, project: Partial<Project>) {
    return apiService.put(`/projects/${id}`, project);
  },

  // Supprimer un projet
  async deleteProject(id: number) {
    return apiService.delete(`/projects/${id}`);
  }
};

export default projectsService;