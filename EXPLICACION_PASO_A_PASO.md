# 📖 DisneyVerse explicado paso a paso (como para un niño)

## 1. ¿Qué es este proyecto?
Es una **web de personajes Disney** preparada con React. La web puede hacer dos cosas:

1. **Enseñar personajes Disney** en tarjetas (con foto, nombre y en qué películas salen).
2. **Presentarme como desarrollador web freelance** (una página "Sobre mí").

Para conseguir los personajes, la web **pregunta a una biblioteca gigante en internet** llamada **Disney API**. Esa biblioteca tiene más de **9.800 fichas** de personajes.

## 2. El cuento de la biblioteca Disney 🏰

Imagina que quieres hacer un trabajo del cole sobre personajes Disney. Tú no tienes los datos, pero existe una **biblioteca muy especial en internet** que tiene una ficha de cada personaje: su nombre, su foto y en qué películas aparece.

El problema: la biblioteca está **muy lejos** y nosotros no sabemos hablar su idioma. Por eso usamos un **cartero muy eficiente llamado Axios**. Axios va a la biblioteca, pide las fichas y nos las trae.

En nuestra casa (la web) tenemos tres tipos de trabajadores:

- **Los bibliotecarios** (`services/`) → Los únicos que saben llamar a Axios y hablar con la biblioteca. Si la biblioteca cambia de sitio, solo hay que cambiarles la dirección a ellos.
- **Las habitaciones** (`pages/`) → Las páginas grandes de la casa. Una habitación muestra los personajes y otra me presenta a mí.
- **Los muebles** (`components/`) → Piezas pequeñas reutilizables: una tarjeta de personaje, un botón de "siguiente", una barra de buscar... Son como **bloques LEGO**: los montas, desmontas y reutilizas donde quieras.

> **La regla de oro (Clean Code):** cada trabajador hace **una sola cosa** y la hace bien. El bibliotecario no pinta paredes, y los muebles no van a la biblioteca.

## 3. El mapa del tesoro (la estructura de carpetas)

```
Proyecto-Frontend/
├── index.html            ← La puerta de entrada (el hueco donde vive la web)
├── package.json          ← La lista de la compra (qué tecnologías usamos)
├── vite.config.js        ← Las instrucciones del "motor" que enciende la web
├── vercel.json           ← El libro de instrucciones para el alquiler de internet
├── src/                  ← LA CASA (todo el código)
│   ├── main.jsx          ← La llave que arranca la casa
│   ├── App.jsx           ← El semáforo que decide qué habitación se ve
│   ├── services/         ← LOS BIBLIOTECARIOS (hablan con la API)
│   ├── pages/            ← LAS HABITACIONES (páginas grandes)
│   ├── components/       ← LOS MUEBLES (piezas LEGO reutilizables)
│   └── styles/main.css   ← LA PINTURA (colores y formas)
```

| Carpeta | Es como... | Trabajo |
|---------|-----------|---------|
| `services/` | Los bibliotecarios | Llaman a la API y traen datos |
| `pages/` | Las habitaciones grandes | Deciden qué se ve en cada ruta |
| `components/` | Los bloques LEGO | Piezas pequeñas que se reutilizan |
| `styles/` | La pintura y los muebles | Colores, tamaños, responsive |

## 4. Paseo por la casa, cuarto a cuarto 🚶

### 🚪 4.1 La puerta de entrada: `index.html` + `main.jsx`

Cuando abres una web, el navegador solo sabe dibujar HTML. React necesita un **hueco** donde meterse. Ese hueco es:

```html
<div id="root"></div>
```
### 📞 4.3 Los bibliotecarios: `services/`

**`api.js`** — es el "número de teléfono" ya marcado:

```jsx
const api = axios.create({ baseURL: "https://api.disneyapi.dev" });
```

Una sola vez escribimos la dirección de la biblioteca. Todos los demás la usan. Si cambia la dirección, solo editamos **1 línea**.

**`characterService.js`** — el libro de recetas con llamadas:

| Método | ¿Qué hace? | Sencillo |
|--------|-----------|----------|
| `getCharacters(page, pageSize)` | Trae una página de personajes (50 por defecto) | "Tráeme la estantería 2" |
| `getCharacterById(id)` | Trae un personaje por su número | "Tráeme la ficha 112" |
| `getAllCharacters()` | Trae **todos** los personajes (~9.800) | "Tráeme toda la biblioteca" |

**¿Cómo trae `getAllCharacters` todo el catálogo sin hacer esperar?**
La biblioteca deja pedir como máximo 500 fichas por viaje. Con 9.800 fichas, ¡son 20 viajes! Si los hiciéramos uno tras otro, tardaríamos muchísimo. Por eso con `Promise.all` enviamos **20 carteros a la vez**:

```jsx
const otherPages = await Promise.all(
  Array.from({ length: totalPages - 1 }, (_, index) =>
    api.get("/character", { params: { page: index + 2, pageSize: 500 } })
  )
);
```

- `Array.from({ length: 19 }, ...)` → crea 19 "pedidos" (las páginas 2 a 20).
- `Promise.all([...])` → "espérate a que **todos** los carteros vuelvan".
- `.reduce(...)` → junta todas las hojas en una sola libreta gigante.

> ¿Por qué necesitamos todo esto? Porque la biblioteca (la API) **no sabe buscar por nombre**. Si escribes "Mickey" y solo tenemos 50 fichas de la estantería 1, nunca aparecería. Por eso nos traemos **todo** y buscamos en casa. 🕵️

### 🧱 4.4 Los muebles: `components/`

| Componente | Es como... | Detalle chulo |
|-----------|-----------|---------------|
| `Header` | El letrero de la casa | Usa `NavLink`, que **marca solo** el enlace de la página donde estás |
| `Footer` | El pie de página | Pone el año solo con `new Date().getFullYear()` |
### 🏰 4.5 La habitación principal: `CharactersPage.jsx`

Esta es la página más importante. Funciona en 5 pasos:

**Paso 1 · La libreta de apuntes (estados)**
React guarda "apuntes" con `useState` — son como notas que, cuando cambian, React **vuelve a pintar** la página:

```jsx
const [characters, setCharacters] = useState([]);   // personajes de la página actual
const [page, setPage] = useState(1);                // número de página
const [totalPages, setTotalPages] = useState(1);    // total de páginas
const [loading, setLoading] = useState(true);       // ¿está cargando?
const [error, setError] = useState("");             // mensaje de error
const [searchTerm, setSearchTerm] = useState("");   // lo que escribes en el buscador
```

**Paso 2 · La alarma (useEffect)**
`useEffect` es como un despertador: **"cada vez que cambie el número de página, corre esta función"**:

```jsx
useEffect(() => {
  fetchCharacters(page);
}, [page]);
```

Y otro despertador **solo una vez** (el `[]` vacío = "al entrar a la página") que se trae todo el catálogo:

```jsx
useEffect(() => {
  loadAllCharacters();
}, []);
```

**Paso 3 · El intento (try/catch/finally)**
Cuando pedimos los datos a la biblioteca:

```jsx
try {
  const data = await characterService.getCharacters(currentPage, PAGE_SIZE);
  setCharacters(data.data);
  setTotalPages(data.info.totalPages);
} catch {
  setError("No se pudieron cargar los personajes. Inténtalo de nuevo.");
} finally {
  setLoading(false);
}
```

- `try` = "inténtalo" · `catch` = "si falla, avísame" · `finally` = "pase lo que pase, apaga el spinner". Es como: *"Intenta cruzar la calle; si un coche viene, para; y al final, siempre suelta la mano de mamá."*

**Paso 4 · La búsqueda 🕵️**

```jsx
const normalizedSearchTerm = searchTerm.trim().toLowerCase();
const filteredCharacters = normalizedSearchTerm
  ? allCharacters.filter((c) => c.name.toLowerCase().includes(normalizedSearchTerm))
  : characters;
```

- `trim()` quita espacios de más · `toLowerCase()` hace que "MICKEY" = "mickey".
- ¿Hay texto en el buscador? → busca en **todo el catálogo** (las 9.800 fichas).
- ¿El buscador está vacío? → muestra la **página actual** con sus 50 personajes.

**Paso 5 · La decoración (dibujar la página)**

### 📄 4.6 Las otras dos habitaciones

- **`AboutPage.jsx`** → Mira: tiene dos listas (`services` y `technologies`) y con `.map()` las pinta. Simple como colgar cuadros.
- **`NotFoundPage.jsx`** → Si alguien escribe una dirección que no existe, mostramos "404" y un botón para volver a casa.

### 🎨 4.7 La pintura: `main.css`

- Las **variables CSS** (`--color-primary`, `--radius`...) son como botes de pintura con nombre: pintas todas las paredes con el mismo color y, si quieres cambiar el color, cambias **una línea** en `:root` y se cambia toda la casa.
- El **grid** reparte las tarjetas en columnas: 1 en el móvil, 2 en tablet, 4 en el ordenador. Responsive 📱💻.

## 5. La historia de un clic: escribes "Mickey" 🖱️

1. Escribes "Mickey" en la barra de buscar.
2. `onChange` → `setSearchTerm("Mickey")` → React apunta en la libreta y vuelve a pintar.
3. `normalizedSearchTerm` = `"mickey"` (todo en minúsculas).
4. Hay texto → buscamos en `allCharacters` (las ~9.800 fichas que ya nos trajimos).
5. `.map()` crea una tarjeta por cada "Mickey" encontrado.
6. Cada tarjeta intenta cargar su foto → si la foto está rota, aparece 🎭.
7. Como hay búsqueda, la paginación se esconde.

**¡Y eso es todo!** La magia de React es que solo cambia lo que cambia; no vuelve a pintar toda la casa, solo la parte que necesita.

## 6. Diccionario de palabras "difíciles" 📖

| Palabra | Significa (en fácil) |
|---------|---------------------|
| **API** | Una biblioteca en internet que nos da datos |
| **Endpoint** | La dirección exacta de una estantería de la biblioteca (`/character`, `/characters/112`) |
| **Axios** | El cartero que va y vuelve de la biblioteca |
| **GET** | Pedir — como "dame esa ficha" |
| **async/await** | "Voy a esperar a que vuelva el cartero" sin bloquear la web |
| **Promise** | Un "vale, ya te aviso cuando vuelva" |
| **Componente** | Un bloque LEGO de la interfaz |
| **Props** | Los paquetes de datos que le pasamos a un componente |
| **Estado (state)** | La libreta de apuntes de React |
| **useState** | La función que crea una nota de esas |
| **useEffect** | El despertador que corre una función cuando algo cambia |
| **Render/renderizar** | Dibujar/pintar la página |
| **Array** | Una caja ordenada con varias cosas |
| **`.map()`** | Recorrer la caja y crear algo por cada cosa |
| **`&&`** | "Y además / si esto es verdad" |
| **Ternario** `? :` | "¿es esto? → haz esto : si no, esto otro" |
| **JSDoc** | La etiqueta de instrucciones que explica una función |

## 7. Los comandos mágicos ✨

| Comando | Es como... |
|---------|-----------|
| `npm install` | "Compra todos los ingredientes de la lista" (los bloques LEGO) |
| `npm run dev` | "Enciende la casa en modo construcción" (se actualiza sola al guardar) |
| `npm run build` | "Empaqueta la casa para mudarse" (crea la carpeta `dist`, lista para producción) |
| `npm run preview` | "Prueba la casa empaquetada antes de mudarte" |

---

**Resumen en una frase:** servicios = bibliotecarios que traen datos con Axios → páginas = habitaciones que deciden qué enseñar → componentes = bloques LEGO que pintan todo → CSS = la pintura → y React, con su libreta y sus despertadores, lo mantiene todo vivo. 🏰✨
```jsx
{loading && <LoadingSpinner />}                    // cargando → ruedita
{error && <ErrorMessage message={error} onRetry={...} />}  // error → aviso
{!loading && !error && (                           // todo bien → contenido
  ...
)}
```

- `condición && cosa` → "si la condición es cierta, pinta la cosa".
- `.map()` → convierte cada personaje en una tarjeta:

```jsx
{filteredCharacters.map((character) => (
  <CharacterCard key={character._id} character={character} />
))}
```

- La paginación solo aparece **si no estás buscando** (buscar + paginar no tienen sentido juntos).
| `CharacterCard` | Un marco con foto | Si la foto se rompe, muestra 🎭 en su lugar |
| `Pagination` | Los botones del ascensor | "Anterior" se apaga en la página 1; "Siguiente" en la última |
| `SearchBar` | El cajón de buscar | Cada tecla que escribes se guarda al momento |
| `LoadingSpinner` | La ruedita de "cargando..." | Siempre que pedimos datos, gira para avisarte |
| `ErrorMessage` | La señal de "ups" | Si algo falla, muestra el problema y el botón "Reintentar" |

**El truco de los muebles:** casi no saben de dónde vienen los datos. Los datos llegan por **props** (como paquetes que te entregan por la puerta):

```jsx
function CharacterCard({ character }) { ... }
function Pagination({ page, totalPages, onPageChange }) { ... }
```

Así, el mismo mueble sirve para cualquier personaje o cualquier página. Reutilizable. ♻️

Luego, `main.jsx` **enciende React** dentro del hueco:

```jsx
createRoot(document.getElementById("root")).render(<App />);
```

- `createRoot(...)` → busca el hueco `root` y lo prepara.
- `.render(...)` → "coloca los muebles" dentro del hueco.
- `BrowserRouter` → el "GPS" que sabe en qué calle estamos (`/` o `/about`).

### 🚦 4.2 El semáforo de rutas: `App.jsx`

```jsx
<Route path="/" element={<CharactersPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="*" element={<NotFoundPage />} />
```

- El **Header** y el **Footer** se pintan siempre (están fuera del semáforo).
- Solo cambia el contenido central según la calle:
  - `/` → personajes · `/about` → sobre mí · cualquier otra → 404.