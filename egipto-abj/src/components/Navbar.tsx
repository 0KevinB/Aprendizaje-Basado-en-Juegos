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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#1e3a5f] to-[#0f1e30] border-b-4 border-[#FFD700] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' }}>𓂀</span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#FFD700]">
            Aventura en el Antiguo Egipto
          </h1>
        </Link>

        {user && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`transition-colors font-bold text-base px-3 py-2 rounded-md ${
                isActive('/') && pathname === '/'
                  ? 'bg-[#FFD700] text-[#0f1e30]'
                  : 'text-white hover:text-[#FFD700]'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/misiones"
              className={`transition-colors font-bold text-base px-3 py-2 rounded-md ${
                isActive('/misiones')
                  ? 'bg-[#FFD700] text-[#0f1e30]'
                  : 'text-white hover:text-[#FFD700]'
              }`}
            >
              Misiones
            </Link>
            <Link
              href="/progreso"
              className={`transition-colors font-bold text-base px-3 py-2 rounded-md ${
                isActive('/progreso')
                  ? 'bg-[#FFD700] text-[#0f1e30]'
                  : 'text-white hover:text-[#FFD700]'
              }`}
            >
              Mi Progreso
            </Link>
            <Link
              href="/recursos"
              className={`transition-colors font-bold text-base px-3 py-2 rounded-md ${
                isActive('/recursos')
                  ? 'bg-[#FFD700] text-[#0f1e30]'
                  : 'text-white hover:text-[#FFD700]'
              }`}
            >
              Recursos
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user && userProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="hidden sm:block">
                    <AvatarFallback className="bg-[#FFD700] text-[#0f1e30] font-bold text-lg">
                      {userProfile.displayName?.charAt(0).toUpperCase() || 'E'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white font-semibold hidden sm:block">{userProfile.displayName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#1e3a5f] border-2 border-[#FFD700]">
                <DropdownMenuItem
                  onClick={logout}
                  className="text-white hover:bg-[#FFD700] hover:text-[#0f1e30] cursor-pointer font-semibold"
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
