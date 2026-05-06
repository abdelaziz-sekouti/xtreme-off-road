import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { v4 as uuid } from 'uuid';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery_images ORDER BY createdAt DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Gallery POST body:', body);
    const { url, altText, category } = body;
    const id = uuid();
    await pool.query(
      'INSERT INTO gallery_images (id, url, altText, category) VALUES (?, ?, ?, ?)',
      [id, url, altText, category]
    );
    return NextResponse.json({ id, message: 'Image added' }, { status: 201 });
  } catch (error) {
    console.error('Gallery POST error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
