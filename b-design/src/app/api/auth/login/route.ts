import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Clé secrète pour JWT - à stocker dans les variables d'environnement en production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    console.log('Tentative de connexion API reçue');
    
    const { email, password } = await request.json();
    console.log('Identifiants reçus:', { email });

    // Vérifier que les champs requis sont présents
    if (!email || !password) {
      console.log('Erreur: champs manquants');
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur depuis la base de données
    console.log('Recherche utilisateur dans la BD:', email);
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    console.log('Utilisateur trouvé?', !!user);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    console.log('Vérification du mot de passe');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Mot de passe valide?', isPasswordValid);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    // Créer un token JWT
    console.log('Création du token JWT');
    const token = sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Ne pas renvoyer le mot de passe dans la réponse
    const userCopy = { ...user };
    delete userCopy.password;

    // Stocker le token dans un cookie HTTP-only pour plus de sécurité
    console.log('Envoi de la réponse avec token');
    const response = NextResponse.json({ 
      user: userCopy, 
      token,
      message: 'Connexion réussie' 
    });

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 jour
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la connexion',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}