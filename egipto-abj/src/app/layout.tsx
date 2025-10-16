import type { Metadata } from "next";
import { Poppins, Cinzel } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const cinzel = Cinzel({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Aventura en el Antiguo Egipto - ABJ",
  description: "Plataforma educativa de Aprendizaje Basado en Juegos sobre la cultura egipcia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${cinzel.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="w-full bg-[#2C3E50] text-white py-4 mt-16">
            <div className="container mx-auto text-center text-sm text-gray-400">
              <p>Metodología de estudio por Stalin Tapia</p>
              <p>Desarrollo por Kevin Barrazueta</p>
              <p>© 2025</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
