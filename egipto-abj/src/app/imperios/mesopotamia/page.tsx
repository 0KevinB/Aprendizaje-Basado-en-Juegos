'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MesopotamiaHome() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-16 max-w-4xl mx-auto">
        <div className="text-9xl mb-8">𒀭</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2C1810] mb-6">
          Mesopotamia
        </h1>
        <Card className="border-4 border-[#8B4513] bg-gradient-to-br from-[#F4A460] to-[#DEB887]">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#2C1810]">
              🚧 Próximamente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-[#2C1810] font-semibold">
              La aventura en Mesopotamia está en desarrollo. Pronto podrás explorar:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">📜</div>
                <h3 className="font-bold text-[#2C1810] mb-1">Escritura Cuneiforme</h3>
                <p className="text-sm text-[#2C1810]">Aprende el primer sistema de escritura</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">⚖️</div>
                <h3 className="font-bold text-[#2C1810] mb-1">Código de Hammurabi</h3>
                <p className="text-sm text-[#2C1810]">Descubre las primeras leyes escritas</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="font-bold text-[#2C1810] mb-1">Ziggurats</h3>
                <p className="text-sm text-[#2C1810]">Explora los templos monumentales</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-3xl mb-2">💧</div>
                <h3 className="font-bold text-[#2C1810] mb-1">Entre Dos Ríos</h3>
                <p className="text-sm text-[#2C1810]">Conoce el Tigris y el Éufrates</p>
              </div>
            </div>
            <Link href="/imperios">
              <Button className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white hover:shadow-xl text-lg px-8 py-6 font-bold">
                ← Volver a Imperios
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
