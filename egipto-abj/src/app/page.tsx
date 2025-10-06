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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-glow">𓂀</div>
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
          <span className="text-8xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))' }}>𓂀</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#0f1e30] mb-6" style={{ textShadow: '2px 2px 4px rgba(184, 134, 11, 0.3)' }}>
          ¡Bienvenido, Explorador!
        </h1>
        <p className="text-xl md:text-2xl text-[#1e3a5f] font-semibold mb-8 max-w-3xl mx-auto leading-relaxed">
          Embárcate en una aventura épica por el Antiguo Egipto. Descubre misterios, resuelve acertijos y conviértete en un maestro de la cultura egipcia.
        </p>
        <Link href="/misiones">
          <Button className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] hover:shadow-2xl transition-all hover:scale-110 text-xl px-10 py-7 font-bold border-4 border-[#B8860B]">
            🏺 Comenzar Aventura
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="border-4 border-[#FFD700] hover:shadow-2xl transition-all hover:scale-105 bg-white">
          <CardHeader>
            <div className="text-6xl mb-4 text-center">⚱️</div>
            <CardTitle className="font-serif text-2xl text-[#0f1e30] text-center font-bold">
              Misiones Interactivas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center text-[#1e3a5f] font-medium leading-relaxed">
              Completa 6 misiones únicas que te enseñarán sobre jeroglíficos, pirámides, faraones y más.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#40E0D0] hover:shadow-2xl transition-all hover:scale-105 bg-white">
          <CardHeader>
            <div className="text-6xl mb-4 text-center">🎮</div>
            <CardTitle className="font-serif text-2xl text-[#0f1e30] text-center font-bold">
              Juegos Dinámicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center text-[#1e3a5f] font-medium leading-relaxed">
              Cada vez que juegues, las preguntas serán diferentes. ¡Nunca será lo mismo!
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#CD7F32] hover:shadow-2xl transition-all hover:scale-105 bg-white">
          <CardHeader>
            <div className="text-6xl mb-4 text-center">🏆</div>
            <CardTitle className="font-serif text-2xl text-[#0f1e30] text-center font-bold">
              Logros y Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center text-[#1e3a5f] font-medium leading-relaxed">
              Gana puntos, desbloquea logros y sigue tu progreso mientras aprendes.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Quick Stats */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#0f1e30] rounded-3xl p-8 md:p-12 text-white border-4 border-[#FFD700]">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-[#FFD700]">
          Tu Aventura Te Espera
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
            <div className="text-5xl mb-3">📚</div>
            <div className="text-4xl font-bold text-[#FFD700] mb-2">6</div>
            <div className="text-lg font-semibold text-white">Misiones Épicas</div>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
            <div className="text-5xl mb-3">🎯</div>
            <div className="text-4xl font-bold text-[#FFD700] mb-2">∞</div>
            <div className="text-lg font-semibold text-white">Preguntas Únicas</div>
          </div>
          <div className="bg-white/15 rounded-2xl p-6 backdrop-blur border-2 border-white/20 hover:bg-white/25 transition-all">
            <div className="text-5xl mb-3">⭐</div>
            <div className="text-4xl font-bold text-[#FFD700] mb-2">100+</div>
            <div className="text-lg font-semibold text-white">Datos Fascinantes</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f1e30] mb-6">
          ¿Listo para la Aventura?
        </h2>
        <p className="text-xl text-[#1e3a5f] font-semibold mb-8">
          Explora las misiones y comienza tu viaje al Antiguo Egipto
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/misiones">
            <Button className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] hover:shadow-xl transition-all hover:scale-105 text-lg px-8 py-6 font-bold border-3 border-[#B8860B]">
              Ver Misiones
            </Button>
          </Link>
          <Link href="/recursos">
            <Button variant="outline" className="border-3 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white text-lg px-8 py-6 font-bold">
              Explorar Recursos
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
