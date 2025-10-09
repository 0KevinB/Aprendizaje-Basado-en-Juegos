# 🎨 Sistema de Navbar Personalizado por Imperio

## 📋 Descripción

Cada imperio ahora tiene su propio **navbar temático** que se muestra automáticamente cuando entras a cualquier página de ese imperio. El navbar principal general solo se muestra en las páginas de inicio y selección de imperios.

---

## 🏗️ Arquitectura de Doble Navbar

### **Navbar Principal** (Global)
**Ubicación:** `src/components/Navbar.tsx`
**Se muestra en:** Páginas generales (`/`, `/imperios`)
**Características:**
- Icono: 🌍 (Globo terráqueo)
- Título: "Civilizaciones Antiguas"
- Links: Inicio, Civilizaciones
- Color: Azul oscuro con dorado

### **Empire Navbar** (Por Imperio)
**Ubicación:** `src/components/EmpireNavbar.tsx`
**Se muestra en:** Páginas dentro de cada imperio
**Características:**
- Icono específico del imperio
- Título del imperio
- Links: Inicio, Misiones, Mi Progreso, Recursos, ← Civilizaciones
- Colores temáticos del imperio

---

## 🎨 Configuración de Cada Imperio

### **1. Imperio Egipcio** 𓂀

```typescript
egipto: {
  name: 'Antiguo Egipto',
  icon: '𓂀',
  gradient: 'from-[#1e3a5f] to-[#0f1e30]',
  borderColor: 'border-[#FFD700]',
  textColor: 'text-[#FFD700]',
  activeBg: 'bg-[#FFD700]',
  activeText: 'text-[#0f1e30]',
}
```

**Colores:**
- Fondo: Gradiente azul oscuro → negro azulado
- Borde: Dorado (#FFD700)
- Texto: Dorado
- Activo: Fondo dorado con texto oscuro

---

### **2. Mesopotamia** 𒀭

```typescript
mesopotamia: {
  name: 'Mesopotamia',
  icon: '𒀭',
  gradient: 'from-[#8B4513] to-[#5D2E0F]',
  borderColor: 'border-[#D2691E]',
  textColor: 'text-[#F4A460]',
  activeBg: 'bg-[#D2691E]',
  activeText: 'text-white',
}
```

**Colores:**
- Fondo: Gradiente marrón → marrón oscuro
- Borde: Terracota (#D2691E)
- Texto: Arena clara (#F4A460)
- Activo: Fondo terracota con texto blanco

---

### **3. Antigua India** 🕉️

```typescript
india: {
  name: 'Antigua India',
  icon: '🕉️',
  gradient: 'from-[#FF6B35] to-[#C44300]',
  borderColor: 'border-[#F7931E]',
  textColor: 'text-[#FFE5B4]',
  activeBg: 'bg-[#F7931E]',
  activeText: 'text-[#8B4000]',
}
```

**Colores:**
- Fondo: Gradiente naranja → naranja oscuro
- Borde: Naranja dorado (#F7931E)
- Texto: Beige claro (#FFE5B4)
- Activo: Fondo naranja con texto marrón

---

### **4. Antigua China** 龍

```typescript
china: {
  name: 'Antigua China',
  icon: '龍',
  gradient: 'from-[#DC143C] to-[#8B0000]',
  borderColor: 'border-[#FFD700]',
  textColor: 'text-[#FFD700]',
  activeBg: 'bg-[#FFD700]',
  activeText: 'text-[#8B0000]',
}
```

**Colores:**
- Fondo: Gradiente rojo → rojo oscuro
- Borde: Dorado (#FFD700)
- Texto: Dorado
- Activo: Fondo dorado con texto rojo oscuro

---

## 🚀 Cómo Funciona

### **Sistema de Layouts**

Cada imperio tiene un archivo `layout.tsx` que envuelve todas sus páginas:

```
src/app/imperios/egipto/
├── layout.tsx          ← Aplica EmpireNavbar
├── page.tsx            ← Home de Egipto
├── misiones/
│   └── page.tsx        ← Hereda el navbar
├── progreso/
│   └── page.tsx        ← Hereda el navbar
└── recursos/
    └── page.tsx        ← Hereda el navbar
```

**Código del Layout:**
```tsx
import { EmpireNavbar } from '@/components/EmpireNavbar';

export default function EgiptoLayout({ children }) {
  return (
    <>
      <EmpireNavbar empireId="egipto" />
      {children}
    </>
  );
}
```

---

## 📍 Jerarquía de Navbars

```
┌─────────────────────────────────────────┐
│  Navbar Principal (General)             │
│  🌍 Civilizaciones Antiguas             │
│  [Inicio] [Civilizaciones] [Usuario]    │
└─────────────────────────────────────────┘
              ↓ Usuario entra a /imperios/egipto
┌─────────────────────────────────────────┐
│  Navbar Principal (Sigue visible)       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  EmpireNavbar - Egipto                  │
│  𓂀 Antiguo Egipto                       │
│  [Inicio][Misiones][Progreso][Recursos] │
└─────────────────────────────────────────┘
```

---

## 🎯 Navegación Dentro del Imperio

Cuando estás en `/imperios/egipto/misiones`:

```
┌──────────────────────────────────────────────────────┐
│  Navbar Global                                       │
│  🌍 Civilizaciones Antiguas | Inicio | Civilizaciones│
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│  𓂀 Antiguo Egipto                                    │
│  [Inicio] [●Misiones] [Progreso] [Recursos] [← Civilizaciones] │
└──────────────────────────────────────────────────────┘
```

**El link activo se resalta:**
- Fondo dorado (#FFD700)
- Texto oscuro (#0f1e30)

---

## 📱 Responsive Design

### **Desktop (md:)**
- Muestra todos los links
- Título completo del imperio
- Botón "← Civilizaciones" visible

### **Mobile:**
- Solo muestra icono y título
- Link simple "← Volver" en lugar de nav completo
- Diseño optimizado para pantallas pequeñas

---

## 🔄 Flujo de Usuario

```
1. LOGIN → Navbar General
   ↓
2. Página Principal (/) → Navbar General
   ↓
3. Clic en "Civilizaciones" → Navbar General
   ↓
4. Selecciona "Egipto" → Navbar General + EmpireNavbar (Egipto)
   ↓
5. Navega por Misiones/Progreso → Mantiene ambos navbars
   ↓
6. Clic en "← Civilizaciones" → Vuelve a Navbar General solo
```

---

## ✨ Ventajas del Sistema

### **Para Usuarios:**
✅ **Contexto Visual**: Siempre saben en qué imperio están
✅ **Navegación Rápida**: Links directos a todas las secciones
✅ **Consistencia**: Cada imperio tiene su identidad visual
✅ **Fácil Salida**: Botón visible para volver a selección

### **Para Desarrollo:**
✅ **Escalable**: Agregar nuevos imperios es trivial
✅ **Modular**: Un componente reutilizable
✅ **Mantenible**: Configuración centralizada
✅ **DRY**: No repetir código en cada página

---

## 🛠️ Cómo Agregar un Nuevo Imperio

### **Paso 1:** Agregar configuración en `EmpireNavbar.tsx`

```typescript
const empireConfig = {
  // ... otros imperios
  grecia: {
    name: 'Antigua Grecia',
    icon: '🏛️',
    gradient: 'from-[#4169E1] to-[#1E90FF]',
    borderColor: 'border-[#FFD700]',
    textColor: 'text-[#FFD700]',
    activeBg: 'bg-[#FFD700]',
    activeText: 'text-[#1E3A8A]',
    baseUrl: '/imperios/grecia',
  },
};
```

### **Paso 2:** Crear layout del imperio

```tsx
// src/app/imperios/grecia/layout.tsx
import { EmpireNavbar } from '@/components/EmpireNavbar';

export default function GreciaLayout({ children }) {
  return (
    <>
      <EmpireNavbar empireId="grecia" />
      {children}
    </>
  );
}
```

### **Paso 3:** ¡Listo!

Todas las páginas dentro de `/imperios/grecia/` automáticamente tendrán el navbar personalizado.

---

## 🎨 Personalización Adicional

### **Agregar más links:**

Edita el array `navLinks` en `EmpireNavbar.tsx`:

```typescript
const navLinks = [
  { href: config.baseUrl, label: 'Inicio', exact: true },
  { href: `${config.baseUrl}/misiones`, label: 'Misiones' },
  { href: `${config.baseUrl}/progreso`, label: 'Mi Progreso' },
  { href: `${config.baseUrl}/recursos`, label: 'Recursos' },
  { href: `${config.baseUrl}/desafios`, label: 'Desafíos' }, // ← Nuevo
];
```

### **Cambiar colores de un imperio:**

Simplemente edita la configuración en `empireConfig`:

```typescript
egipto: {
  // Cambiar solo el color activo
  activeBg: 'bg-[#40E0D0]', // Ahora turquesa
  activeText: 'text-white',
}
```

---

## 📊 Comparativa Visual

| Aspecto | Navbar General | Empire Navbar |
|---------|---------------|---------------|
| Alcance | Global | Por imperio |
| Icono | 🌍 | Específico (𓂀, 𒀭, etc.) |
| Links | 2 (Inicio, Civilizaciones) | 5 (Inicio, Misiones, Progreso, Recursos, Volver) |
| Colores | Fijos (azul+dorado) | Temáticos por imperio |
| Posición | Top fijo | Debajo del navbar general |

---

## 🚧 Estado Actual

| Imperio | Navbar | Páginas | Estado |
|---------|--------|---------|--------|
| Egipto | ✅ | ✅ Completas | Funcional |
| Mesopotamia | ✅ | 🚧 Próximamente | Listo para desarrollo |
| India | ✅ | 🚧 Próximamente | Listo para desarrollo |
| China | ✅ | 🚧 Próximamente | Listo para desarrollo |

---

## 📝 Próximas Mejoras

- [ ] Menú hamburguesa para mobile con todos los links
- [ ] Animaciones de transición entre navbars
- [ ] Breadcrumbs para rutas profundas
- [ ] Indicador de progreso en el navbar
- [ ] Notificaciones/badges en links (ej: nuevas misiones)

---

**Versión:** 2.0
**Última actualización:** 2025
**Desarrollado con:** Next.js 15 + TypeScript + Tailwind CSS
