import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { v4 as uuid } from 'uuid';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM packages ORDER BY createdAt DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, duration, imageUrl } = body;
    const id = uuid();
    await pool.query(
      'INSERT INTO packages (id, title, description, price, duration, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [id, title, description, price, duration, imageUrl]
    );
    return NextResponse.json({ id, message: 'Package created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
