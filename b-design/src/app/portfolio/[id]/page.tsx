"use client";

import { Project, projectsService } from "@/lib/db/projects";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        // Convertir l'ID de string à number
        const projectId = parseInt(params.id);

        // Charger les détails du projet
        const projectData = await projectsService.getProjectById(projectId);
        setProject(projectData);

        // Charger des projets connexes (3 projets aléatoires de la même catégorie)
        const allProjects = await projectsService.getAllProjects();
        const filtered = allProjects
          .filter((p) => p.id !== projectId)
          .slice(0, 3);

        setRelatedProjects(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement du projet:", err);
        setError(
          "Impossible de charger les détails du projet. Veuillez réessayer plus tard."
        );
        setLoading(false);
      }
    }

    loadProject();
  }, [params.id]);

  // Afficher un état de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Afficher un message d'erreur si le projet n'existe pas
  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Projet non trouvé
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error ||
              "Le projet que vous recherchez n'existe pas ou a été déplacé."}
          </p>
          <Link
            href="/portfolio"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Retour au portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation retour */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-8 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour au portfolio
        </Link>

        {/* En-tête du projet */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-2 px-4 rounded">
                {project.client || "Projet Personnel"}
              </span>
            </div>
          </div>
        </header>

        {/* Image principale */}
        <div className="rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 h-[400px] md:h-[500px] relative mb-12">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl">
              Image principale du projet
            </div>
          )}
        </div>

        {/* Informations du projet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              À propos de ce projet
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
              {project.detailed_description || project.description}
            </p>
          </div>
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Détails du projet
              </h3>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Catégorie
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.category}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Année
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.year}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Client
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.client || "Projet Personnel"}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Mon rôle
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.role || "Designer"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Processus de design (si disponible) */}
        {project.process && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Processus de design
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.process.map((step, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {step}
                    </h3>
                  </div>
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Image du processus
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Galerie d'images (si disponible) */}
        {project.gallery && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Galerie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl overflow-hidden"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                      Image {index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation vers d'autres projets */}
        {relatedProjects.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Autres projets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link
                  href={`/portfolio/${relatedProject.id}`}
                  key={relatedProject.id}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                      {relatedProject.image_url ? (
                        <img
                          src={relatedProject.image_url}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          Design {relatedProject.id}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {relatedProject.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {relatedProject.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
