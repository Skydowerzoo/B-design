import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import axios from 'axios';

export async function GET() {
  try {
    // Test simple pour vérifier la connexion et retourner la date du serveur PostgreSQL
    const result = await query('SELECT NOW() as current_time');
    
    // Exemple d'utilisation d'Axios pour une requête externe
    // Décommentez et adaptez selon vos besoins
    // const externalApiResponse = await axios.get('https://api.exemple.com/data');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Connexion à la base de données réussie',
      data: result.rows[0],
      // externalData: externalApiResponse.data
    });
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Échec de connexion à la base de données',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}