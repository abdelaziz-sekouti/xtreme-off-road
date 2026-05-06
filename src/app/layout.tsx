import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { pool } from "@/lib/db";

export const metadata: Metadata = {
  title: "Xtreme Off-Road 4x4 Tanger",
  description: "Créateur d'aventure off-road au Maroc et en Afrique",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings from DB
  let settings: any = {
    title: 'Xtreme Off-Road 4x4 Tanger',
    description: 'Créateur d\'aventure off-road au Maroc et en Afrique',
    address: 'Al Mansour, 47 Av. Yakoub El Mansour,90000 Tanger, Maroc',
    phone: '+212 (0) 6 61 72 06 63',
    whatsapp: '+212 (0) 6 61 72 06 63',
    instagram: 'https://www.instagram.com/bernoussiyassine/',
    primaryColor: '#e11d48',
    secondaryColor: '#1f2937',
    accentColor: '#fbbf24',
    typographyFamily: 'Inter',
  };

  try {
    const [rows] = await pool.query('SELECT * FROM settings LIMIT 1');
    const dbSettings = (rows as any[])[0];
    if (dbSettings) {
      settings = { ...settings, ...dbSettings };
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }

  const fontFamily = settings.typographyFamily || 'Inter';
  const fontUrl = fontFamily.replace(/ /g, '+');

  return (
    <html lang="fr" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${settings.primaryColor};
            --secondary: ${settings.secondaryColor};
            --accent: ${settings.accentColor};
            --font-main: '${fontFamily}', sans-serif;
          }
          body {
            font-family: var(--font-main);
          }
        ` }} />
        {/* Load Google Fonts dynamically based on setting */}
        <link href={`https://fonts.googleapis.com/css2?family=${fontUrl}:wght@300;400;500;600;700&display=swap`} rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative text-gray-800">
        <Navbar settings={settings} />
        <main className="grow">
          {children}
        </main>
        <Footer settings={settings} />

        <ScrollToTop />
        <WhatsAppButton phone={settings.whatsapp} />
      </body>
    </html>
  );
}
