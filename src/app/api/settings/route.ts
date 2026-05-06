import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keysParam = searchParams.get('keys');
    const [rows] = await pool.query('SELECT * FROM settings LIMIT 1');
    const settings = (rows as any[])[0] || {};

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fields = ['title', 'description', 'address', 'phone', 'whatsapp', 'instagram', 'facebook', 'youtube', 'twitter', 'primaryColor', 'secondaryColor', 'accentColor', 'typographyFamily'];
    const [existing] = await pool.query('SELECT id FROM settings LIMIT 1');
    const exists = (existing as any[]).length > 0;
    
    if (exists) {
      const updates = fields.filter(f => body[f] !== undefined).map(f => `${f} = ?`).join(', ');
      const values = fields.filter(f => body[f] !== undefined).map(f => body[f]);
      if (updates) {
        await pool.query(`UPDATE settings SET ${updates}`, values);
      }
    } else {
      const insertFields = fields.filter(f => body[f] !== undefined);
      const placeholders = insertFields.map(() => '?').join(', ');
      const values = insertFields.map(f => body[f]);
      await pool.query(`INSERT INTO settings (${insertFields.join(', ')}) VALUES (${placeholders})`, values);
    }
    return NextResponse.json({ message: 'Settings updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
