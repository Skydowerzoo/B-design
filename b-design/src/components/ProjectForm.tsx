"use client";

import AdminProtected from "@/components/AdminProtected";
import { projectsService } from "@/lib/db/projects";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProjectFormProps = {
  projectId?: number; // Si présent, nous sommes en mode édition
};

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter();
  const isEditMode = !!projectId;

  // État des champs du formulaire
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    year: new Date().getFullYear().toString(),
    image_url: "",
    client: "",
    role: "",
    detailed_description: "",
  });

  // États pour les tableaux (processus et galerie)
  const [processSteps, setProcessSteps] = useState<string[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // États pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Catégories disponibles
  const categories = ["Concept Car", "Production", "Prototype", "Étude"];

  // Charger les données du projet en mode édition
  useEffect(() => {
    if (isEditMode && projectId) {
      const loadProject = async () => {
        try {
          setLoading(true);
          const project = await projectsService.getProjectById(projectId);

          // Remplir le formulaire avec les données du projet
          setFormData({
            title: project.title || "",
            description: project.description || "",
            category: project.category || "",
            year: project.year || "",
            image_url: project.image_url || "",
            client: project.client || "",
            role: project.role || "",
            detailed_description: project.detailed_description || "",
          });

          // Remplir les tableaux
          if (project.process) setProcessSteps(project.process);
          if (project.gallery) setGalleryImages(project.gallery);

          setLoading(false);
        } catch (err) {
          console.error("Erreur lors du chargement du projet:", err);
          setError(
            "Impossible de charger les données du projet. Veuillez réessayer plus tard."
          );
          setLoading(false);
        }
      };

      loadProject();
    }
  }, [isEditMode, projectId]);

  // Gérer les changements dans le formulaire principal
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer l'ajout d'une étape de processus
  const handleAddProcessStep = () => {
    setProcessSteps((prev) => [...prev, ""]);
  };

  // Gérer la modification d'une étape de processus
  const handleProcessStepChange = (index: number, value: string) => {
    setProcessSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = value;
      return newSteps;
    });
  };

  // Gérer la suppression d'une étape de processus
  const handleRemoveProcessStep = (index: number) => {
    setProcessSteps((prev) => prev.filter((_, i) => i !== index));
  };

  // Gérer l'ajout d'une image à la galerie
  const handleAddGalleryImage = () => {
    setGalleryImages((prev) => [...prev, ""]);
  };

  // Gérer la modification d'une image de la galerie
  const handleGalleryImageChange = (index: number, value: string) => {
    setGalleryImages((prev) => {
      const newImages = [...prev];
      newImages[index] = value;
      return newImages;
    });
  };

  // Gérer la suppression d'une image de la galerie
  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      // Préparer les données du projet
      const projectData = {
        ...formData,
        process: processSteps.filter((step) => step.trim() !== ""),
        gallery: galleryImages.filter((url) => url.trim() !== ""),
      };

      let response;
      if (isEditMode && projectId) {
        // Mettre à jour un projet existant
        response = await projectsService.updateProject(projectId, projectData);
        setSuccess("Projet mis à jour avec succès!");
      } else {
        // Créer un nouveau projet
        response = await projectsService.addProject(projectData);
        setSuccess("Projet créé avec succès!");

        // Réinitialiser le formulaire après création
        setFormData({
          title: "",
          description: "",
          category: "",
          year: new Date().getFullYear().toString(),
          image_url: "",
          client: "",
          role: "",
          detailed_description: "",
        });
        setProcessSteps([]);
        setGalleryImages([]);
      }

      // Rediriger vers le tableau de bord après un court délai
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000);
    } catch (err: any) {
      console.error("Erreur lors de l'enregistrement du projet:", err);
      setError(
        err.response?.data?.error ||
          "Une erreur s'est produite lors de l'enregistrement du projet."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminProtected>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminProtected>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {isEditMode
                    ? "Modifier le projet"
                    : "Créer un nouveau projet"}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                  {isEditMode
                    ? "Modifiez les informations du projet existant"
                    : "Remplissez les informations pour créer un nouveau projet"}
                </p>
              </div>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Retour
              </button>
            </div>

            {error && (
              <div className="px-4 sm:px-6 py-2 bg-red-100 border border-red-400 text-red-700 rounded mx-4 my-3">
                {error}
              </div>
            )}

            {success && (
              <div className="px-4 sm:px-6 py-2 bg-green-100 border border-green-400 text-green-700 rounded mx-4 my-3">
                {success}
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations de base */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Titre */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Titre*
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description courte*
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="description"
                        id="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Une brève description qui apparaîtra dans la liste des
                      projets.
                    </p>
                  </div>

                  {/* Catégorie */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Catégorie*
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Année */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Année*
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="year"
                        id="year"
                        required
                        value={formData.year}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* URL de l'image */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="image_url"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      URL de l'image principale
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        name="image_url"
                        id="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Client */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="client"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Client
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="client"
                        id="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Rôle */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Votre rôle
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Description détaillée */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="detailed_description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description détaillée
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="detailed_description"
                        id="detailed_description"
                        rows={6}
                        value={formData.detailed_description}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Processus de design */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Processus de design
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Ajoutez les étapes de votre processus de design pour ce
                    projet.
                  </p>

                  <div className="mt-4 space-y-4">
                    {processSteps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 flex-shrink-0 text-center">
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-grow ml-3">
                          <input
                            type="text"
                            value={step}
                            onChange={(e) =>
                              handleProcessStepChange(index, e.target.value)
                            }
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Étape du processus de design"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveProcessStep(index)}
                          className="ml-3 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddProcessStep}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                    >
                      Ajouter une étape
                    </button>
                  </div>
                </div>

                {/* Galerie */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Galerie d'images
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Ajoutez des images supplémentaires pour showcaser votre
                    projet.
                  </p>

                  <div className="mt-4 space-y-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-grow">
                          <input
                            type="url"
                            value={image}
                            onChange={(e) =>
                              handleGalleryImageChange(index, e.target.value)
                            }
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="URL de l'image"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="ml-3 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddGalleryImage}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                    >
                      Ajouter une image
                    </button>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-end space-x-3 pt-5 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/dashboard")}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enregistrement...
                      </span>
                    ) : isEditMode ? (
                      "Mettre à jour"
                    ) : (
                      "Créer"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}
