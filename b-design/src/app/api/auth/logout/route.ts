import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  try {
    // Créer une réponse qui supprime le cookie d'authentification
    const response = NextResponse.json({ 
      message: 'Déconnexion réussie' 
    });

    // Supprimer le cookie d'authentification
    response.cookies.set({
      name: 'auth_token',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0, // Expire immédiatement
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la déconnexion',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}