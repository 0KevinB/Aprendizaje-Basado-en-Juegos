'use client';

import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/AuthForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2C3E50]">
        <div className="text-6xl animate-pulse text-white">🌍</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16 mb-12">
        <div className="inline-block animate-float mb-6">
          <span className="text-8xl" style={{ filter: 'drop-shadow(0 0 12px rgba(52, 152, 219, 0.7))' }}>🌍</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2C3E50] mb-6">
          ¡Bienvenido, Explorador!
        </h1>
        <p className="text-xl md:text-2xl text-[#34495E] font-semibold mb-8 max-w-3xl mx-auto leading-relaxed">
          Embárcate en una aventura épica a través de las civilizaciones antiguas. Descubre misterios, resuelve acertijos y conviértete en un maestro de la historia.
        </p>
        <Link href="/imperios">
          <Button className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white hover:shadow-2xl transition-all hover:scale-110 text-xl px-10 py-7 font-bold border-4 border-[#2980B9]">
            🌟 Explorar Civilizaciones
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="border-4 border-[#3498DB] hover:shadow-2xl transition-all hover:scale-105 bg-white">
          <CardHeader>
            <div className="text-6xl mb-4 text-center">🌍</div>
            <CardTitle className="font-serif text-2xl text-[#2C3E50] text-center font-bold">
              4 Civilizaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center text-[#34495E] font-medium leading-relaxed">
              Explora Egipto, Mesopotamia, India y China. Cada civilización con sus misiones únicas.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#3498DB] hover:shadow-2xl transition-all hover:scale-105 bg-white">
          <CardHeader>
            <div className="text-6xl mb-4 text-center">🎮</div>
            <CardTitle className="font-serif text-2xl text-[#2C3E50] text-center font-bold">
              Aprendizaje Gamificado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center text-[#34495E] font-medium leading-relaxed">
              Misiones interactivas, juegos dinámicos y desafíos que hacen el aprendizaje divertido.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#3498DB] hover:shadow-2xl transition-all hover:scale-105 bg-white">
          <CardHeader>
            <div className="text-6xl mb-4 text-center">🏆</div>
            <CardTitle className="font-serif text-2xl text-[#2C3E50] text-center font-bold">
              Logros y Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center text-[#34495E] font-medium leading-relaxed">
              Gana sellos únicos, acumula puntos y sigue tu progreso mientras aprendes.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Quick Stats */}
      <section className="bg-gradient-to-r from-[#34495E] to-[#2C3E50] rounded-3xl p-8 md:p-12 text-white border-4 border-[#3498DB]">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-white">
          Tu Aventura Te Espera
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
            <div className="text-5xl mb-3">🌍</div>
            <div className="text-4xl font-bold text-[#3498DB] mb-2">4</div>
            <div className="text-lg font-semibold text-white">Civilizaciones</div>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
            <div className="text-5xl mb-3">📚</div>
            <div className="text-4xl font-bold text-[#3498DB] mb-2">16</div>
            <div className="text-lg font-semibold text-white">Misiones Totales</div>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
            <div className="text-5xl mb-3">🎯</div>
            <div className="text-4xl font-bold text-[#3498DB] mb-2">100+</div>
            <div className="text-lg font-semibold text-white">Actividades</div>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
            <div className="text-5xl mb-3">⭐</div>
            <div className="text-4xl font-bold text-[#3498DB] mb-2">400+</div>
            <div className="text-lg font-semibold text-white">Datos Históricos</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C3E50] mb-6">
          ¿Listo para la Aventura?
        </h2>
        <p className="text-xl text-[#34495E] font-semibold mb-8">
          Elige una civilización y comienza tu viaje por la historia
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/imperios">
            <Button className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white hover:shadow-xl transition-all hover:scale-105 text-lg px-8 py-6 font-bold border-3 border-[#2980B9]">
              🌟 Ver Civilizaciones
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
