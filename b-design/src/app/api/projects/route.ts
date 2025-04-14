import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Récupérer tous les projets ou filtrer par catégorie
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let result;
    
    // Si une catégorie est fournie, filtrer par catégorie
    if (category && category !== 'Tous') {
      result = await query(
        'SELECT * FROM projects WHERE category = $1 ORDER BY year DESC',
        [category]
      );
    } else {
      // Sinon, récupérer tous les projets
      result = await query('SELECT * FROM projects ORDER BY year DESC');
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des projets',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Ajouter un nouveau projet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, year, image_url } = body;
    
    const result = await query(
      'INSERT INTO projects (title, description, category, year, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, category, year, image_url]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création du projet',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}