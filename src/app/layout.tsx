import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AnimatedNoise } from "@/components/ui/AnimatedNoise";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: {
    template: '%s | DataWatt Lyon',
    default:  'DataWatt Lyon'
  },
  description: "Analyse interactive des données de consommation d'électricité et de gaz dans la métropole de Grand Lyon entre 2018 et 2020. Visualisation sous forme de carte interactive et graphiques détaillés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-200">
        <div className=' fixed h-screen w-full overflow-hidden -z-10'>
          <AnimatedNoise opacity={0.07}/>
        </div>
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
