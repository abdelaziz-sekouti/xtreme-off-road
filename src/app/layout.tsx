import type { Metadata } from "next";
import "./globals.css";
import { pool } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";

export async function generateMetadata(): Promise<Metadata> {
  const [rows] = await pool.query('SELECT title, description FROM site_settings WHERE id = "1"');
  const settings = (rows as any[])[0] || { title: "Xtreme Off-Road", description: "" };
  return {
    title: settings.title,
    description: settings.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [rows] = await pool.query('SELECT * FROM site_settings WHERE id = "1"');
  const settings = (rows as any[])[0] || { 
    primaryColor: '#e11d48', 
    secondaryColor: '#1f2937', 
    accentColor: '#fbbf24',
    typographyFamily: 'Inter'
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${settings.primaryColor};
            --secondary: ${settings.secondaryColor};
            --accent: ${settings.accentColor};
            --font-main: '${settings.typographyFamily}', sans-serif;
          }
          body {
            font-family: var(--font-main);
          }
        ` }} />
        {/* Load Google Fonts dynamically based on setting */}
        <link href={`https://fonts.googleapis.com/css2?family=${settings.typographyFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`} rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative text-gray-800">
        <Navbar settings={settings} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer settings={settings} />
        
        <ScrollToTop />
        <WhatsAppButton phone={settings.whatsapp} />
      </body>
    </html>
  );
}
