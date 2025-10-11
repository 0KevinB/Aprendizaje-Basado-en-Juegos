'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MesopotamiaHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4A460] to-[#DEB887]">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="text-9xl mb-6 animate-pulse">𒀭</div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2C1810] mb-4">
          Mesopotamia
        </h1>
        <p className="text-2xl text-[#2C1810] max-w-3xl mx-auto font-semibold">
          La cuna de la civilización entre dos ríos eternos: Tigris y Éufrates
        </p>
      </section>

      {/* Intro Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-4 border-[#8B4513] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">📜</div>
              <CardTitle className="text-center font-serif text-[#2C1810]">
                Escritura Cuneiforme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#2C1810] text-center">
                El primer sistema de escritura del mundo, grabado en tablillas de arcilla
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#8B4513] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">⚖️</div>
              <CardTitle className="text-center font-serif text-[#2C1810]">
                Código de Hammurabi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#2C1810] text-center">
                Las primeras leyes escritas de la humanidad grabadas en piedra
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#8B4513] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">🏛️</div>
              <CardTitle className="text-center font-serif text-[#2C1810]">
                Ziggurats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#2C1810] text-center">
                Templos escalonados que tocaban el cielo en honor a los dioses
              </p>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#8B4513] bg-white hover:scale-105 transition-all">
            <CardHeader>
              <div className="text-6xl mb-3 text-center">💧</div>
              <CardTitle className="text-center font-serif text-[#2C1810]">
                Entre Dos Ríos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#2C1810] text-center">
                El Tigris y el Éufrates: fuente de vida y civilización
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-white to-[#F4A460] max-w-2xl mx-auto">
            <CardHeader>
              <div className="text-7xl mb-3">📚</div>
              <CardTitle className="text-4xl font-serif text-[#2C1810]">
                ¡Tu aventura comienza aquí!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-xl text-[#2C1810] font-semibold">
                Explora las misiones, descubre los aportes de Mesopotamia y conviértete en un Guardián del Legado Eterno
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/imperios/mesopotamia/misiones">
                  <Button className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#2C1810]">
                    🎮 Comenzar Misiones
                  </Button>
                </Link>
                <Link href="/imperios/mesopotamia/recursos">
                  <Button className="bg-gradient-to-r from-[#D2691E] to-[#8B4513] text-white hover:shadow-xl text-xl px-8 py-6 font-bold border-2 border-[#2C1810]">
                    📚 Ver Recursos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
