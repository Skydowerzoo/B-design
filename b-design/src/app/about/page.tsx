import Link from "next/link";

export default function About() {
  const skills = [
    { name: "Design Conceptuel", level: 95 },
    { name: "Sketch & Illustration", level: 90 },
    { name: "Modélisation 3D", level: 85 },
    { name: "Rendu & Visualisation", level: 80 },
    { name: "UX / Ergonomie", level: 75 },
    { name: "Modélisation Clay", level: 70 },
  ];

  const education = [
    {
      degree: "Master en Design Automobile",
      school: "École de Design Automobile de Paris",
      year: "2018 - 2020",
      description:
        "Spécialisation en design extérieur et conception de véhicules électriques",
    },
    {
      degree: "Bachelor en Design Industriel",
      school: "Université des Arts Appliqués",
      year: "2015 - 2018",
      description:
        "Formation pluridisciplinaire en design de produits avec focus sur les transports",
    },
  ];

  const experience = [
    {
      position: "Designer Automobile Senior",
      company: "Studio de Design Créatif",
      location: "Paris",
      period: "2022 - Présent",
      description:
        "Conception de véhicules concept pour divers constructeurs automobiles. Direction artistique de projets de design avancé.",
      projects: [
        "Concept car électrique de luxe",
        "Étude de design pour véhicule autonome",
      ],
    },
    {
      position: "Designer Extérieur",
      company: "Constructeur Automobile International",
      location: "Munich",
      period: "2020 - 2022",
      description:
        "Contribution au design extérieur de véhicules de production. Développement de langage stylistique pour nouvelles gammes de produits.",
      projects: [
        "SUV compact de nouvelle génération",
        "Berline sportive électrifiée",
      ],
    },
    {
      position: "Stagiaire en Design",
      company: "Bureau de Design Automobile",
      location: "Turin",
      period: "2019 (6 mois)",
      description:
        "Stage de fin d'études. Participation à des projets de design conceptuel pour clients internationaux.",
      projects: [
        "Concept car pour salon automobile",
        "Étude de design pour un constructeur asiatique",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            À Propos de Moi
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Designer automobile passionné avec une expertise dans la création de
            véhicules qui allient esthétique et fonctionnalité.
          </p>
        </header>

        {/* Section profil */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-1">
            <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md">
              <div className="h-64 md:h-72 bg-gray-200 dark:bg-gray-700 relative">
                {/* Placeholder pour votre photo */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl">
                  Votre Photo
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Votre Nom
                </h2>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  Designer Automobile
                </p>

                <div className="flex items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Paris, France
                  </span>
                </div>

                <div className="flex items-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    votre.email@example.com
                  </span>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  {/* Liens sociaux */}
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-gray-700 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-gray-700 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-gray-700 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Mon Parcours
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Designer automobile passionné avec plus de 5 ans d'expérience
                dans la conception de véhicules innovants. Spécialisé dans le
                design extérieur et les concepts de mobilité future, je cherche
                constamment à repousser les limites de l'esthétique automobile
                tout en respectant les contraintes techniques et fonctionnelles.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Ma démarche créative combine une forte sensibilité artistique
                avec une compréhension approfondie des aspects techniques de
                l'automobile. J'accorde une attention particulière à
                l'expérience utilisateur et à l'impact environnemental dans
                chacun de mes projets, cherchant à créer des véhicules qui
                inspirent et qui répondent aux défis de la mobilité
                contemporaine.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Compétences
              </h2>

              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expérience professionnelle */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Expérience Professionnelle
          </h2>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {job.position}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {job.company}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-gray-700 dark:text-gray-300">
                      {job.location}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {job.period}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {job.description}
                </p>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Projets clés:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {job.projects.map((project, idx) => (
                      <li key={idx}>{project}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formation */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Formation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {edu.school}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">{edu.year}</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Appel à l'action */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Intéressé par mon travail?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Consultez mon portfolio complet ou contactez-moi pour discuter de
            collaborations potentielles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 sm:flex-1 sm:max-w-xs"
            >
              Voir le portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300 sm:flex-1 sm:max-w-xs"
            >
              Me contacter
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
