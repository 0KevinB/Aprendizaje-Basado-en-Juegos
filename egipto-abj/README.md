# 🏺 Aventura en la Historia Antigua - ABJ

Plataforma educativa de **Aprendizaje Basado en Juegos (ABJ)** diseñada para que estudiantes de aproximadamente 12 años aprendan sobre la cultura egipcia de manera interactiva y divertida.

## ✨ Características

- 🎮 **6 Misiones Interactivas**: Jeroglíficos, Pirámides, Faraones, Dioses, Vida Cotidiana y Momificación
- 🎲 **Juegos Dinámicos**: Preguntas generadas aleatoriamente para evitar memorización
- 🏆 **Sistema de Progreso**: Puntos, niveles y logros desbloqueables
- 🔐 **Autenticación de Usuarios**: Sistema completo con Firebase Authentication
- 📊 **Seguimiento de Progreso**: Guarda y sincroniza el progreso de cada estudiante
- 📱 **Diseño Responsivo**: Funciona perfectamente en móviles, tablets y desktop
- 🎨 **Interfaz Atractiva**: Diseño temático egipcio con animaciones y efectos visuales

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **shadcn/ui** - Componentes UI accesibles y personalizables
- **Firebase** - Autenticación y Base de Datos (Firestore)

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Firebase

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Habilita **Authentication** con Email/Password
4. Crea una base de datos **Firestore**
5. En la configuración del proyecto, ve a "Project Settings" > "General"
6. En "Your apps", crea una aplicación web
7. Copia las credenciales de configuración

### 3. Configurar variables de entorno

Edita el archivo `.env.local` en la raíz del proyecto y reemplaza los valores con tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id_aqui
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id_aqui
```

### 4. Configurar reglas de Firestore

En Firebase Console, ve a Firestore Database > Rules y configura las siguientes reglas:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura de usuarios autenticados en su propio documento
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Permitir lectura/escritura de progreso de usuarios autenticados
    match /userProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
egipto-abj/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal
│   │   ├── misiones/             # Página de misiones
│   │   ├── juego/[missionId]/    # Juegos dinámicos
│   │   ├── progreso/             # Página de progreso del usuario
│   │   └── recursos/             # Recursos educativos
│   ├── components/
│   │   ├── ui/                   # Componentes de shadcn/ui
│   │   ├── AuthForm.tsx          # Formulario de autenticación
│   │   └── Navbar.tsx            # Barra de navegación
│   ├── contexts/
│   │   └── AuthContext.tsx       # Context de autenticación
│   ├── lib/
│   │   ├── firebase.ts           # Configuración de Firebase
│   │   └── gameGenerators.ts     # Generadores de preguntas dinámicas
│   └── types/
│       └── index.ts              # Tipos TypeScript
├── .env.local                    # Variables de entorno
├── components.json               # Configuración de shadcn/ui
└── package.json
```

## 🎮 Características de los Juegos

### Generación Dinámica de Preguntas

Cada vez que un estudiante juega una misión, las preguntas se generan aleatoriamente desde un pool de datos, asegurando:

- ✅ Variedad en cada intento
- ✅ Evita memorización de respuestas
- ✅ Mantiene el contenido educativo fresco

### Tipos de Preguntas

- **Opción múltiple**: Selecciona la respuesta correcta entre varias opciones
- **Completar espacios**: Escribe la respuesta correcta
- **Ordenar**: Organiza elementos en el orden correcto
- **Emparejar**: Conecta elementos relacionados

### Sistema de Puntos y Niveles

| Nivel | Puntos Requeridos |
|-------|-------------------|
| Iniciado | 0 - 20 |
| Aprendiz | 20 - 60 |
| Intermedio | 60 - 120 |
| Avanzado | 120 - 180 |
| Experto | 180 - 250 |
| Maestro Egipcio | 250+ |

## 🎨 Personalización

### Agregar Nuevas Preguntas

Edita `src/lib/gameGenerators.ts` y agrega datos a los arrays correspondientes:

```typescript
const hieroglyphicsData = [
  { symbol: '𓀀', meaning: 'hombre', category: 'persona' },
  // Agrega más aquí
];
```

### Modificar Estilos

Los colores y estilos están definidos en `src/app/globals.css` usando variables CSS:

```css
:root {
  --gold: #FFD700;
  --dark-blue: #1e3a5f;
  // Personaliza aquí
}
```

## 🚢 Despliegue
 Vercel 
 
## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## 👨‍💻 Autor
Kevin Barrazueta - 0KevinB
Creado para facilitar el aprendizaje de la cultura egipcia mediante metodología ABJ.

---

¿Preguntas o sugerencias? ¡No dudes en contactar! 🏺✨
