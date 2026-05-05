import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

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
