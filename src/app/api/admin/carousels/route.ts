import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { v4 as uuid } from 'uuid';

// Create table if not exists
const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS carousels (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      title VARCHAR(255),
      subtitle TEXT,
      imageUrl VARCHAR(500),
      buttonText VARCHAR(100),
      buttonLink VARCHAR(255),
      sortOrder INT DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
};

export async function GET() {
  try {
    await createTable();
    const [rows] = await pool.query('SELECT * FROM carousels ORDER BY sortOrder ASC');
    if ((rows as any[]).length === 0) {
      // Seed default slides
      await pool.query(`
        INSERT INTO carousels (id, title, subtitle, imageUrl, buttonText, buttonLink, sortOrder) VALUES
        (UUID(), 'Explorez le Maroc en 4×4', 'Vivez une aventure hors du commun à travers les dunes et les montagnes du Maroc.', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop', 'Découvrir nos packages', '/packages', 1),
        (UUID(), 'Formation Pilote & Co-pilote', 'Apprenez les techniques de pilotage tout-terrain avec nos experts.', 'https://images.unsplash.com/photo-1609619385076-36a873425636?q=80&w=2070&auto=format&fit=crop', 'Voir nos formations', '/formation', 2),
        (UUID(), 'Préparation de votre 4×4', 'Expertise et préparation de votre véhicule pour affronter les terrains les plus extrêmes.', 'https://images.unsplash.com/photo-1619642751034-765dfdf0c4ef?q=80&w=2070&auto=format&fit=crop', 'Nos services', '/preparation', 3)
      `);
      const [newRows] = await pool.query('SELECT * FROM carousels ORDER BY sortOrder ASC');
      return NextResponse.json(newRows);
    }
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await createTable();
    const body = await request.json();
    const { title, subtitle, imageUrl, buttonText, buttonLink, sortOrder } = body;
    const id = uuid();
    await pool.query(
      'INSERT INTO carousels (id, title, subtitle, imageUrl, buttonText, buttonLink, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, title, subtitle, imageUrl, buttonText, buttonLink, sortOrder || 0]
    );
    return NextResponse.json({ id, message: 'Carousel created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
