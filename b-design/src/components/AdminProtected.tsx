"use client";

import authService from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier si le token existe
        if (!authService.isAuthenticated()) {
          router.push("/admin/login");
          return;
        }

        // Vérifier si le token est valide en appelant l'API
        await authService.checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        // Rediriger vers la connexion en cas d'erreur
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Ne rien afficher pendant la redirection
  }

  return <>{children}</>;
}
