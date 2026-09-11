# 🏰 DisneyVerse — Personajes Disney

Aplicación web **frontend** creada con **React + Vite** para el módulo de Frontend del Bootcamp.
Consume la [Disney API](https://disneyapi.dev) usando **Axios** y muestra un catálogo paginado
de personajes en tarjetas, además de una página de presentación personal como
**desarrollador web freelance**.

## ✨ Funcionalidades

- **Página 1 — Personajes (`/`)**: cards de personajes Disney obtenidas con Axios (GET), con:
  - Imagen, nombre y apariciones (películas/series/videojuegos)
  - Buscador por nombre
  - Paginación (50 personajes por página, ~197 páginas)
  - Estados de carga (spinner) y error (con botón "Reintentar")
- **Página 2 — Sobre mí (`/about`)**: presentación como desarrollador web freelance, servicios y tecnologías
- **Header fijo** con navegación entre las dos páginas y **Footer** con créditos
- Página **404** personalizada
- Diseño **responsive** (mobile-first) con CSS puro y variables

## 🛠 Tecnologías

| Tecnología  | Uso |
|-------------|-----|
| React 19 + Vite | Framework y bundler |
| Axios | Peticiones HTTP a la API |
| React Router | Navegación entre páginas |
| CSS (variables) | Estilos responsive |
| Vercel | Despliegue |

## 📁 Estructura

```
src/
├── App.jsx                → Rutas y layout (Header/Footer)
├── main.jsx               → Punto de entrada
├── components/            → Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── CharacterCard.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── pages/                 → Páginas de la app
│   ├── CharactersPage.jsx → Página 1: cards de personajes
│   ├── AboutPage.jsx      → Página 2: presentación freelance
│   └── NotFoundPage.jsx   → Error 404
├── services/              → Capa de servicios (Axios)
│   ├── api.js             → Instancia de Axios (baseURL)
│   └── characterService.js→ getCharacters / getCharacterById
└── styles/main.css        → Estilos globales
```

## 🚀 Instalación y ejecución

Requisitos: **Node.js 18+** y **npm**.

```bash
# 1. Clonar el repositorio
git clone https://github.com/Mltiformacionjose/Proyecto-Frontend.git
cd Proyecto-Frontend

# 2. Instalar dependencias
npm install

# 3. Arrancar en desarrollo
npm run dev
```

Abre http://localhost:5173 en el navegador.

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo (Vite)
npm run build    # Compila el proyecto a la carpeta dist/
npm run preview  # Previsualiza el build de producción
```

## 📡 API utilizada

**Disney API** — https://api.disneyapi.dev

| Endpoint | Descripción |
|----------|-------------|
| `GET /character?page=1&pageSize=50` | Listado paginado de personajes (usa `info.totalPages`, `data[]`) |
| `GET /characters/:id` | Detalle de un personaje |

La URL base se define una sola vez en `src/services/api.js` y todos los servicios
reutilizan la misma instancia de Axios.

## ☁️ Despliegue en Vercel

1. Sube el proyecto a GitHub (rama `main`).
2. Entra en [vercel.com](https://vercel.com) e importa el repositorio.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Pulsa **Deploy**.
5. El archivo `vercel.json` incluido hace que todas las rutas de React Router funcionen en producción.

Alternativa desde CLI:

```bash
npm install -g vercel
vercel --prod
```

## ✅ Checklist

- [x] Página creada con React
- [x] Consumo de API con Axios (servicios)
- [x] Componentes, servicios y páginas separados
- [x] Commits y push al repositorio
- [x] Estilos con CSS (variables, responsive)
- [x] Carpetas organizadas y Clean Code
- [x] README documentado
- [x] Despliegue en Vercel

## 👤 Autor

Proyecto realizado por mi, un alumno del Bootcamp FullStack de Factoria 5.