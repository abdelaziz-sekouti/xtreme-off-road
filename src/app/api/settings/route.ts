import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keysParam = searchParams.get('keys');
    const [rows] = await pool.query('SELECT * FROM site_settings LIMIT 1');
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
    console.log('Settings POST body:', body);
    const fields = ['title', 'description', 'address', 'phone', 'whatsapp', 'instagram', 'facebook', 'youtube', 'twitter', 'primaryColor', 'secondaryColor', 'accentColor', 'typographyFamily'];
    const [existing] = await pool.query('SELECT id FROM site_settings LIMIT 1');
    const exists = (existing as any[]).length > 0;
    console.log('Settings exists:', exists);

    if (exists) {
      const updates = fields.filter(f => body[f] !== undefined).map(f => `${f} = ?`).join(', ');
      const values = fields.filter(f => body[f] !== undefined).map(f => body[f]);
      console.log('Updates:', updates, 'Values:', values);
      if (updates) {
        const query = `UPDATE site_settings SET ${updates} WHERE id = '1'`;
        console.log('Executing query:', query, 'with values:', values);
        await pool.query(query, values);
      }
    } else {
      const insertFields = ['id', ...fields.filter(f => body[f] !== undefined)];
      const placeholders = insertFields.map(() => '?').join(', ');
      const values = ['1', ...insertFields.slice(1).map(f => body[f])];
      console.log('Insert fields:', insertFields, 'Values:', values);
      const query = `INSERT INTO site_settings (${insertFields.join(', ')}) VALUES (${placeholders})`;
      console.log('Executing query:', query, 'with values:', values);
      await pool.query(query, values);
    }
    return NextResponse.json({ message: 'Settings updated' });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
