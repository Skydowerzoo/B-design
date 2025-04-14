import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Récupérer un projet spécifique par son ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération du projet',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Mettre à jour un projet existant
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { title, description, category, year, image_url } = body;
    
    // Vérifier si le projet existe
    const checkResult = await query('SELECT id FROM projects WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    // Mettre à jour le projet
    const result = await query(
      `UPDATE projects 
       SET title = $1, description = $2, category = $3, year = $4, image_url = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, category, year, image_url, id]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la mise à jour du projet',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Supprimer un projet
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Vérifier si le projet existe
    const checkResult = await query('SELECT id FROM projects WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    // Supprimer le projet
    await query('DELETE FROM projects WHERE id = $1', [id]);
    
    return NextResponse.json(
      { message: 'Projet supprimé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la suppression du projet',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}