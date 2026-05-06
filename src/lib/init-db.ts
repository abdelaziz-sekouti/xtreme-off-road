import mysql from 'mysql2/promise';

async function initDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xtreme--off-road',
  });

  console.log('Connected to MySQL.');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(191) PRIMARY KEY,
      email VARCHAR(191) UNIQUE NOT NULL,
      password VARCHAR(191) NOT NULL,
      name VARCHAR(191),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Drop and recreate to ensure all columns are present
  await connection.execute(`DROP TABLE IF EXISTS settings`);

  await connection.execute(`
    CREATE TABLE settings (
      id VARCHAR(191) PRIMARY KEY DEFAULT '1',
      title VARCHAR(191) DEFAULT 'Xtreme off-road 4x4 tanger',
      description TEXT,
      address VARCHAR(191) DEFAULT 'al mansour, 47 Av. Yakoub El Mansour, Tanger 90000',
      phone VARCHAR(191) DEFAULT '+212 (0) 6 61 72 06 63',
      whatsapp VARCHAR(191) DEFAULT '+212 (0) 6 61 72 06 63',
      instagram VARCHAR(191) DEFAULT 'https://instagram.com',
      facebook VARCHAR(191) DEFAULT 'https://facebook.com',
      youtube VARCHAR(191) DEFAULT 'https://youtube.com',
      twitter VARCHAR(191) DEFAULT 'https://twitter.com',
      primaryColor VARCHAR(191) DEFAULT '#e11d48',
      secondaryColor VARCHAR(191) DEFAULT '#1f2937',
      accentColor VARCHAR(191) DEFAULT '#fbbf24',
      typographyFamily VARCHAR(191) DEFAULT 'Inter',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log('Recreated settings table with all columns');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS packages (
      id VARCHAR(191) PRIMARY KEY,
      title VARCHAR(191) NOT NULL,
      description TEXT NOT NULL,
      price VARCHAR(191),
      duration VARCHAR(191),
      imageUrl VARCHAR(191),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS services (
      id VARCHAR(191) PRIMARY KEY,
      title VARCHAR(191) NOT NULL,
      description TEXT NOT NULL,
      imageUrl VARCHAR(191),
      category VARCHAR(191) NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id VARCHAR(191) PRIMARY KEY,
      url VARCHAR(191) NOT NULL,
      altText VARCHAR(191),
      category VARCHAR(191),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
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

  // Seed default carousel slides if empty
  const [carouselRows] = await connection.execute('SELECT COUNT(*) as count FROM carousels');
  if ((carouselRows as any[])[0].count === 0) {
    await connection.execute(`
      INSERT INTO carousels (id, title, subtitle, imageUrl, buttonText, buttonLink, sortOrder) VALUES
      (UUID(), 'Explorez le Maroc en 4×4', 'Vivez une aventure hors du commun à travers les dunes et les montagnes du Maroc.', '/uploads/images/carousel/images_(1).jpeg', 'Découvrir nos packages', '/packages', 1),
      (UUID(), 'Formation Pilote & Co-pilote', 'Apprenez les techniques de pilotage tout-terrain avec nos experts.', '/uploads/images/carousel/images_(2).jpeg', 'Voir nos formations', '/formation', 2),
      (UUID(), 'Préparation de votre 4×4', 'Expertise et préparation de votre véhicule pour affronter les terrains les plus extrêmes.', '/uploads/images/carousel/images_(3).jpeg', 'Nos services', '/preparation', 3)
    `);
    console.log('Default carousel slides seeded.');
  }

  // Seed default settings if not exists
  const [rows] = await connection.execute('SELECT * FROM settings WHERE id = "1"');
  if ((rows as any[]).length === 0) {
    await connection.execute(`
      INSERT INTO settings (id, description) VALUES ('1', 'Car repair and maintenance service')
    `);
  }

  console.log('Database initialized successfully.');
  await connection.end();
}

initDB().catch(console.error);
