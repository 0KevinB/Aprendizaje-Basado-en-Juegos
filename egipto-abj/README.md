# 🏺 Aventura en la Historia Antigua - ABJ

Plataforma educativa de **Aprendizaje Basado en Juegos (ABJ)** diseñada para que estudiantes de aproximadamente 12 años aprendan sobre 4 grandes civilizaciones antiguas: **Egipto, Mesopotamia, India y China**, de manera interactiva y divertida.

## ✨ Características

- 🗺️ **4 Imperios para Explorar**: Cada uno con su propia ruta de aprendizaje.
- 🏺 **Egipto**: Descubre los secretos de los faraones, jeroglíficos y pirámides.
- 🧱 **Mesopotamia**: Viaja a la cuna de la civilización entre los ríos Tigris y Éufrates.
- 🕉️ **India**: Explora el valle del Indo, su espiritualidad y avances matemáticos.
- 🐉 **China**: Conoce las dinastías, la Gran Muralla y los guerreros de terracota.
- 🎮 **Misiones por Fases**: Cada imperio se divide en 4 fases de aprendizaje progresivo.
- 🎲 **Juegos Dinámicos**: Preguntas generadas aleatoriamente para evitar la memorización.
- 🏆 **Sistema de Progreso**: Puntos, niveles y logros desbloqueables.
- 🔐 **Autenticación de Usuarios**: Sistema completo con Firebase Authentication.
- 📊 **Seguimiento de Progreso**: Guarda y sincroniza el progreso de cada estudiante.
- 📱 **Diseño Responsivo**: Funciona en móviles, tablets y desktop.
- 🎨 **Interfaz Atractiva**: Diseño temático para cada imperio con elementos interactivos.

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
2. Crea un nuevo proyecto o usa uno existente.
3. Habilita **Authentication** con Email/Password.
4. Crea una base de datos **Firestore**.
5. En la configuración del proyecto, ve a "Project Settings" > "General".
6. En "Your apps", crea una aplicación web.
7. Copia las credenciales de configuración.

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto y reemplaza los valores con tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id_aqui
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id_aqui
```

### 4. Configurar reglas de Firestore

En Firebase Console, ve a Firestore Database > Rules y configura las siguientes reglas para permitir que los usuarios autenticados gestionen su propio progreso:

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
└── src/
    ├── app/
    │   ├── page.tsx                # Página de inicio (Login/Registro)
    │   ├── globals.css             # Estilos globales
    │   ├── layout.tsx              # Layout principal
    │   └── imperios/
    │       ├── page.tsx            # Selector de imperios
    │       ├── egipto/
    │       │   ├── page.tsx        # Dashboard de Egipto
    │       │   ├── misiones/       # Misiones de Egipto
    │       │   └── juego/[missionId]/ # Juego para una misión específica
    │       ├── mesopotamia/
    │       │   └── ... (estructura similar)
    │       ├── india/
    │       │   └── ... (estructura similar)
    │       └── china/
    │           └── ... (estructura similar)
    ├── components/
    │   ├── ui/                     # Componentes de shadcn/ui
    │   ├── AuthForm.tsx            # Formulario de autenticación
    │   ├── Navbar.tsx              # Barra de navegación principal
    │   ├── EmpireNavbar.tsx        # Navegación dentro de un imperio
    │   └── missions/
    │       ├── egipto/             # Componentes de misiones de Egipto
    │       ├── mesopotamia/        # Componentes de misiones de Mesopotamia
    │       └── ...                 # etc.
    ├── contexts/
    │   └── AuthContext.tsx         # Contexto de autenticación
    ├── lib/
    │   ├── firebase.ts             # Configuración de Firebase
    │   └── gameGenerators.ts       # Lógica para generar juegos y preguntas
    └── types/
        └── index.ts                # Tipos de TypeScript
```

## 🎮 Características de los Juegos

### Generación Dinámica

Cada vez que un estudiante juega una misión, las actividades y preguntas se pueden generar o seleccionar de un pool de datos, asegurando:

- ✅ Variedad en cada intento.
- ✅ Evita la memorización de respuestas.
- ✅ Mantiene el contenido educativo fresco y desafiante.

### Tipos de Actividades

- **Opción múltiple**: Selecciona la respuesta correcta.
- **Completar espacios**: Escribe la palabra o frase que falta.
- **Ordenar secuencias**: Organiza eventos históricos o pasos de un proceso.
- **Emparejar conceptos**: Conecta elementos relacionados (ej. dioses con sus dominios).

## 🎨 Personalización

### Agregar Nuevas Preguntas

Edita `src/lib/gameGenerators.ts` y agrega nuevo contenido a los arrays de datos para cada imperio. La estructura es autoexplicativa dentro del archivo.

### Modificar Estilos

Los colores y estilos principales están definidos en `src/app/globals.css` usando variables CSS. Puedes adaptar la paleta de colores para que se ajuste a nuevos temas o preferencias.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... más variables */
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

¿Preguntas o sugerencias? ¡No dudes in contactar! 🏛️✨
