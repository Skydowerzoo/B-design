import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="block">Design Automobile</span>
              <span className="text-blue-600 dark:text-blue-400">
                Innovation & Élégance
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Bienvenue dans mon portfolio de design automobile. Je crée des
              véhicules qui allient esthétique et fonctionnalité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portfolio"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 text-center"
              >
                Voir mes designs
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition duration-300 text-center"
              >
                À propos de moi
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
            {/* Ici, vous placerez une image phare de votre travail */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-70 rounded-xl">
              {/* Remplacer par une vraie image quand vous en aurez une */}
              <div className="flex items-center justify-center h-full text-white text-xl font-light">
                Votre design phare ici
              </div>
            </div>
          </div>
        </div>

        {/* Featured Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Projets en Vedette
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  {/* Placeholder pour vos images */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Design {item}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">
                    Projet de design {item}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Description brève du projet et des concepts utilisés.
                  </p>
                  <Link
                    href={`/portfolio/${item}`}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Voir en détail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Voir tous les projets
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* About Me Preview */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 rounded-full overflow-hidden h-48 w-48 relative bg-gray-200 dark:bg-gray-700">
              {/* Placeholder pour votre photo */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Photo
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">À Propos de Moi</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Designer automobile passionné avec une vision unique du futur de
                la mobilité. Mon approche combine esthétique, ergonomie et
                innovation technique pour créer des véhicules qui inspirent et
                performent.
              </p>
              <Link
                href="/about"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
              >
                En savoir plus sur mon parcours
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Intéressé par une collaboration?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Je suis ouvert aux opportunités de travail et projets créatifs.
            N'hésitez pas à me contacter pour discuter de votre vision.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
          >
            Me contacter
          </Link>
        </section>
      </div>
    </div>
  );
}
