import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest, context: { params: Promise<{id: string}> }) {
  try {
    const params = await context.params;
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [params.id]);
    const rowsArray = rows as any[];
    if (rowsArray.length === 0) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
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
    const { title, description, imageUrl, category } = body;
    await pool.query(
      'UPDATE services SET title = ?, description = ?, imageUrl = ?, category = ? WHERE id = ?',
      [title, description, imageUrl, category, params.id]
    );
    return NextResponse.json({ message: 'Service updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{id: string}> }) {
  try {
    const params = await context.params;
    await pool.query('DELETE FROM services WHERE id = ?', [params.id]);
    return NextResponse.json({ message: 'Service deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
