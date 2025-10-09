'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface EmpireNavbarProps {
  empireId: 'egipto' | 'mesopotamia' | 'india' | 'china';
}

const empireConfig = {
  egipto: {
    name: 'Antiguo Egipto',
    icon: '𓂀',
    gradient: 'from-[#1e3a5f] to-[#0f1e30]',
    borderColor: 'border-[#FFD700]',
    textColor: 'text-[#FFD700]',
    hoverBg: 'hover:bg-[#FFD700]',
    hoverText: 'hover:text-[#0f1e30]',
    activeBg: 'bg-[#FFD700]',
    activeText: 'text-[#0f1e30]',
    baseUrl: '/imperios/egipto',
  },
  mesopotamia: {
    name: 'Mesopotamia',
    icon: '𒀭',
    gradient: 'from-[#8B4513] to-[#5D2E0F]',
    borderColor: 'border-[#D2691E]',
    textColor: 'text-[#F4A460]',
    hoverBg: 'hover:bg-[#D2691E]',
    hoverText: 'hover:text-white',
    activeBg: 'bg-[#D2691E]',
    activeText: 'text-white',
    baseUrl: '/imperios/mesopotamia',
  },
  india: {
    name: 'Antigua India',
    icon: '🕉️',
    gradient: 'from-[#FF6B35] to-[#C44300]',
    borderColor: 'border-[#F7931E]',
    textColor: 'text-[#FFE5B4]',
    hoverBg: 'hover:bg-[#F7931E]',
    hoverText: 'hover:text-[#8B4000]',
    activeBg: 'bg-[#F7931E]',
    activeText: 'text-[#8B4000]',
    baseUrl: '/imperios/india',
  },
  china: {
    name: 'Antigua China',
    icon: '龍',
    gradient: 'from-[#DC143C] to-[#8B0000]',
    borderColor: 'border-[#FFD700]',
    textColor: 'text-[#FFD700]',
    hoverBg: 'hover:bg-[#FFD700]',
    hoverText: 'hover:text-[#8B0000]',
    activeBg: 'bg-[#FFD700]',
    activeText: 'text-[#8B0000]',
    baseUrl: '/imperios/china',
  },
};

export function EmpireNavbar({ empireId }: EmpireNavbarProps) {
  const pathname = usePathname();
  const config = empireConfig[empireId];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const navLinks = [
    { href: config.baseUrl, label: 'Inicio', exact: true },
    { href: `${config.baseUrl}/misiones`, label: 'Misiones' },
    { href: `${config.baseUrl}/progreso`, label: 'Mi Progreso' },
    { href: `${config.baseUrl}/recursos`, label: 'Recursos' },
  ];

  return (
    <div className={`w-full bg-gradient-to-r ${config.gradient} border-b-4 ${config.borderColor} shadow-lg py-3`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Empire Title */}
          <Link
            href={config.baseUrl}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="text-4xl" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' }}>
              {config.icon}
            </span>
            <h2 className={`text-xl md:text-2xl font-serif font-bold ${config.textColor}`}>
              {config.name}
            </h2>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const active = link.exact
                ? pathname === link.href
                : isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors font-bold text-sm px-3 py-2 rounded-md ${
                    active
                      ? `${config.activeBg} ${config.activeText}`
                      : `text-white ${config.hoverBg} ${config.hoverText}`
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Back to Empires */}
            <Link
              href="/imperios"
              className={`transition-colors font-bold text-sm px-3 py-2 rounded-md border-2 ${config.borderColor} text-white ${config.hoverBg} ${config.hoverText}`}
            >
              ← Civilizaciones
            </Link>
          </nav>

          {/* Mobile Menu Button - Could be expanded later */}
          <div className="md:hidden">
            <Link
              href="/imperios"
              className={`text-sm font-bold ${config.textColor} underline`}
            >
              ← Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
