'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, userProfile, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#34495E] to-[#2C3E50] border-b-4 border-[#3498DB] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 8px rgba(52, 152, 219, 0.6))' }}>🌍</span>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-white">
            Civilizaciones Antiguas
          </h1>
        </Link>

        {user && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`transition-colors font-bold text-base px-3 py-2 rounded-md ${
                isActive('/') && pathname === '/'
                  ? 'bg-[#3498DB] text-white'
                  : 'text-[#ECF0F1] hover:text-white hover:bg-white/10'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/imperios"
              className={`transition-colors font-bold text-base px-3 py-2 rounded-md ${
                isActive('/imperios')
                  ? 'bg-[#3498DB] text-white'
                  : 'text-[#ECF0F1] hover:text-white hover:bg-white/10'
              }`}
            >
              Civilizaciones
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user && userProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="hidden sm:block">
                    <AvatarFallback className="bg-[#3498DB] text-white font-bold text-lg">
                      {userProfile.displayName?.charAt(0).toUpperCase() || 'E'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white font-semibold hidden sm:block">{userProfile.displayName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#34495E] border-2 border-[#3498DB]">
                <DropdownMenuItem
                  onClick={logout}
                  className="text-white hover:bg-[#3498DB] focus:bg-[#3498DB] focus:text-white cursor-pointer font-semibold"
                >
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
