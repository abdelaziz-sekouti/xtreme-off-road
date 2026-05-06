import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest, context: { params: Promise<{id: string}> }) {
  try {
    const params = await context.params;
    const [rows] = await pool.query('SELECT * FROM carousels WHERE id = ?', [params.id]);
    const rowsArray = rows as any[];
    if (rowsArray.length === 0) {
      return NextResponse.json({ message: 'Slide not found' }, { status: 404 });
    }
    return NextResponse.json(rowsArray[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{id: string}> }) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { title, subtitle, imageUrl, buttonText, buttonLink, sortOrder } = body;
    await pool.query(
      'UPDATE carousels SET title = ?, subtitle = ?, imageUrl = ?, buttonText = ?, buttonLink = ?, sortOrder = ? WHERE id = ?',
      [title, subtitle, imageUrl, buttonText, buttonLink, sortOrder || 0, params.id]
    );
    return NextResponse.json({ message: 'Slide updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{id: string}> }) {
  try {
    const params = await context.params;
    await pool.query('DELETE FROM carousels WHERE id = ?', [params.id]);
    return NextResponse.json({ message: 'Carousel deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
