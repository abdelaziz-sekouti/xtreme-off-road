import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Xtreme Off-Road 4x4 Tanger",
  description: "Créateur d'aventure off-road au Maroc et en Afrique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Static default settings - Navbar/Footer will fetch real settings client-side
  const settings = {
    primaryColor: '#e11d48',
    secondaryColor: '#1f2937',
    accentColor: '#fbbf24',
    typographyFamily: 'Inter',
    phone: '+212 (0) 6 61 72 06 63',
    whatsapp: '+212 (0) 6 61 72 06 63',
    instagram: 'https://www.instagram.com/bernoussiyassine/',
  };

  const fontFamily = settings.typographyFamily || 'Inter';
  const fontUrl = fontFamily.replace(/ /g, '+');

  return (
    <html lang="fr" className="scroll-smooth">
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
