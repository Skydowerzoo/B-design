import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { query } from '@/lib/db';

// Clé secrète pour JWT - à stocker dans les variables d'environnement en production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('auth_token')?.value;
    
    // Si aucun token n'est trouvé
    if (!token) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Vérifier le token
    const decoded = verify(token, JWT_SECRET) as { id: number };
    
    // Récupérer les informations de l'utilisateur
    const result = await query(
      'SELECT id, username, email, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Retourner les informations de l'utilisateur
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error);
    return NextResponse.json(
      { 
        error: 'Non autorisé',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 401 }
    );
  }
}