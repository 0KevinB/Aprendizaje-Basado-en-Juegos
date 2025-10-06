'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          setError('Por favor ingresa tu nombre');
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#87CEEB] via-[#E6D5B8] to-[#D4A574]">
      <Card className="w-full max-w-md border-4 border-[#FFD700] shadow-2xl bg-white">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' }}>𓂀</div>
          <CardTitle className="text-3xl font-serif text-[#0f1e30] mb-2">
            {isSignUp ? '¡Únete a la Aventura!' : 'Bienvenido Explorador'}
          </CardTitle>
          <CardDescription className="text-lg text-[#1e3a5f] font-medium">
            {isSignUp
              ? 'Crea tu cuenta para comenzar a explorar el Antiguo Egipto'
              : 'Inicia sesión para continuar tu aventura'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-[#0f1e30] font-semibold">
                  Nombre de Explorador
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Tu nombre"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required={isSignUp}
                  className="border-2 border-[#C19A6B] focus:border-[#FFD700] text-[#0f1e30] placeholder:text-gray-500"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0f1e30] font-semibold">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-[#C19A6B] focus:border-[#FFD700] text-[#0f1e30] placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0f1e30] font-semibold">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-[#C19A6B] focus:border-[#FFD700] text-[#0f1e30] placeholder:text-gray-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border-2 border-red-500 text-red-800 rounded font-semibold">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#0f1e30] font-bold text-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-[#B8860B]"
              disabled={loading}
            >
              {loading ? 'Cargando...' : isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-[#1e3a5f] hover:text-[#B8860B] transition-colors underline font-semibold text-base"
              >
                {isSignUp
                  ? '¿Ya tienes cuenta? Inicia sesión'
                  : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
