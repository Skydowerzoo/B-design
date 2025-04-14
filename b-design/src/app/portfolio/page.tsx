import Link from "next/link";

// Données fictives pour les projets (à remplacer par vos propres projets)
const projects = [
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
  {
    id: 3,
    title: "Berline Luxe Hydrogène",
    description:
      "Une berline de luxe propulsée à l'hydrogène, combinant élégance et technologie avancée.",
    category: "Concept Car",
    year: "2023",
  },
  {
    id: 4,
    title: "Hypercar Hybride",
    description:
      "Une hypercar au design radical utilisant une technologie hybride pour des performances exceptionnelles.",
    category: "Prototype",
    year: "2022",
  },
  {
    id: 5,
    title: "Citadine Autonome",
    description:
      "Une citadine compacte avec fonctionnalités de conduite autonome et un intérieur modulable.",
    category: "Étude",
    year: "2022",
  },
  {
    id: 6,
    title: "Coupé Rétro-Futuriste",
    description:
      "Un coupé qui réinterprète des éléments de design classiques avec une approche moderne.",
    category: "Concept Car",
    year: "2021",
  },
];

// Catégories pour le filtrage
const categories = ["Tous", "Concept Car", "Production", "Prototype", "Étude"];

export default function Portfolio() {
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
              className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link href={`/portfolio/${project.id}`} key={project.id}>
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="h-56 bg-gray-200 dark:bg-gray-700 relative">
                  {/* Placeholder pour vos images de projet */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
                    Design {project.id}
                  </div>
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
      </div>
    </div>
  );
}
