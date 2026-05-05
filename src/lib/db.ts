import mysql from 'mysql2/promise';
import '@/lib/init-db';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'xtreme--off-road',
  waitForConnections: true,
  connectionLimit: 20, // Increased for multiple workers
  queueLimit: 0,
  connectTimeout: 30000,
});

export async function query(sql: string, params: any[] = []): Promise<any> {
  try {
    return await pool.query(sql, params);
  } catch (err: any) {
    if (err?.code === 'ER_CON_COUNT_ERROR') {
      console.warn('Too many connections – retrying in 1s...');
      await new Promise(r => setTimeout(r, 1000));
      return await pool.query(sql, params);
    }
    throw err;
  }
}

export { pool };
