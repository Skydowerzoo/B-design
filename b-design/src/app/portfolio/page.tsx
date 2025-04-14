"use client";

import { Project, projectsService } from "@/lib/db/projects";
import Link from "next/link";
import { useEffect, useState } from "react";

// Catégories pour le filtrage
const categories = ["Tous", "Concept Car", "Production", "Prototype", "Étude"];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        let data;

        if (activeCategory === "Tous") {
          data = await projectsService.getAllProjects();
        } else {
          data = await projectsService.getProjectsByCategory(activeCategory);
        }

        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des projets:", err);
        setError(
          "Impossible de charger les projets. Veuillez réessayer plus tard."
        );
        setLoading(false);

        // Données de secours en cas d'erreur
        setProjects([
          {
            id: 1,
            title: "Concept Sportif Électrique",
            description:
              "Un concept de véhicule sportif électrique axé sur l'aérodynamisme et la performance.",
            category: "Concept Car",
            year: "2024",
          },
          {
            id: 2,
            title: "SUV Urbain Compact",
            description:
              "Un SUV compact conçu pour l'environnement urbain avec une attention particulière à l'efficacité spatiale.",
            category: "Production",
            year: "2023",
          },
          // ...autres projets de secours
        ]);
      }
    }

    loadProjects();
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio de Design Automobile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez mes projets de design automobile, des concepts aux modèles
            de production.
          </p>
        </header>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Message d'erreur */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}

        {/* Grille de projets */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link href={`/portfolio/${project.id}`} key={project.id}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="h-56 bg-gray-200 dark:bg-gray-700 relative">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
                        Design {project.id}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.category}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        Voir en détail →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Message si aucun projet */}
        {!loading && projects.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              Aucun projet trouvé dans cette catégorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
