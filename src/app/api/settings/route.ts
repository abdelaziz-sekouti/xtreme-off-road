import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keysParam = searchParams.get('keys');
    let query = 'SELECT * FROM site_settings WHERE id = "1"';
    const [rows] = await pool.query(query);
    const settings = (rows as any[])[0] || {};

    // If specific keys are requested, filter them
    if (keysParam) {
      const keys = keysParam.split(',');
      const filtered: any = {};
      keys.forEach(key => {
        if (settings[key] !== undefined) filtered[key] = settings[key];
      });
      return NextResponse.json(filtered);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
