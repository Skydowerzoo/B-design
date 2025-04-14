import Link from "next/link";

// Données fictives pour les projets (à remplacer par vos propres projets)
const projects = [
  {
    id: 1,
    title: "Concept Sportif Électrique",
    description:
      "Un concept de véhicule sportif électrique axé sur l'aérodynamisme et la performance. Ce design explore l'équilibre entre esthétique radicale et fonctionnalité aérodynamique.",
    category: "Concept Car",
    year: "2024",
    client: "Projet Personnel",
    role: "Designer Principal",
    detailedDescription:
      "Ce concept sportif électrique représente ma vision de la performance automobile de demain. J'ai cherché à réinterpréter les codes visuels du véhicule sportif tout en intégrant les contraintes techniques liées à la motorisation électrique. L'aérodynamisme a été une préoccupation centrale dans la conception, avec un travail approfondi sur les flux d'air et la réduction de la traînée.\n\nLe design extérieur présente des lignes tendues et des surfaces sculptées qui optimisent l'écoulement de l'air. La face avant minimaliste contraste avec les flancs complexes qui dirigent le flux d'air vers l'arrière du véhicule. La silhouette basse et large accentue l'aspect sportif tout en améliorant la stabilité à haute vitesse.",
    process: [
      "Recherche et analyses de marché",
      "Études de silhouette",
      "Sketchs manuels",
      "Modélisation 3D préliminaire",
      "Rendus numériques",
      "Modèle échelle 1:4",
    ],
  },
  {
    id: 2,
    title: "SUV Urbain Compact",
    description:
      "Un SUV compact conçu pour l'environnement urbain avec une attention particulière à l'efficacité spatiale.",
    category: "Production",
    year: "2023",
    client: "Constructeur Automobile",
    role: "Designer Extérieur",
    detailedDescription:
      "Ce SUV urbain compact a été conçu pour répondre aux défis de la mobilité urbaine moderne. L'objectif était de créer un véhicule qui offre la polyvalence et la position de conduite surélevée d'un SUV, tout en gardant des dimensions extérieures compactes adaptées à la ville.\n\nLe design extérieur combine des surfaces robustes avec des détails raffinés pour créer une présence affirmée malgré la taille compacte du véhicule. Les proportions ont été soigneusement étudiées pour maximiser l'espace intérieur tout en préservant une esthétique dynamique.",
    process: [
      "Études de marché",
      "Définition du package",
      "Sketchs d'exploration",
      "Modélisation numérique",
      "Rendus photoréalistes",
      "Prototype physique",
    ],
  },
  // Autres projets...
];

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // Convertir l'ID de string à number et trouver le projet correspondant
  const projectId = parseInt(params.id);
  const project = projects.find((p) => p.id === projectId);

  // Si le projet n'existe pas
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Projet non trouvé
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Le projet que vous recherchez n'existe pas ou a été déplacé.
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
                {project.client}
              </span>
            </div>
          </div>
        </header>

        {/* Image principale */}
        <div className="rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 h-[400px] md:h-[500px] relative mb-12">
          {/* Placeholder pour l'image principale du projet */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl">
            Image principale du projet
          </div>
        </div>

        {/* Informations du projet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              À propos de ce projet
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
              {project.detailedDescription}
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
                  {project.client}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Mon rôle
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Processus de design */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Processus de design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.process?.map((step, index) => (
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

        {/* Galerie d'images */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Galerie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400"
              >
                Image {item}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation vers d'autres projets */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Autres projets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.id !== projectId)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  href={`/portfolio/${relatedProject.id}`}
                  key={relatedProject.id}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        Design {relatedProject.id}
                      </div>
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
      </div>
    </div>
  );
}
