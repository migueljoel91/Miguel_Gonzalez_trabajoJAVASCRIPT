# ⚡ Vulkania Heavy

Sitio web de **Vulkania Heavy**, una empresa ficticia de equipamiento de gimnasio (racks, barras, mancuernas, bancos y accesorios) con sede en Santa Cruz de Tenerife y envíos a Canarias.

Trabajo Final del módulo **JavaScript Avanzado** del curso de **Desarrollo Web** de **Davante**.

**Autor:** Miguel Yoel González Martín

---

## 🚀 Cómo abrir el proyecto

La portada carga las noticias desde un archivo JSON con `fetch()`. Por seguridad, los navegadores **bloquean `fetch()` cuando la página se abre con doble clic** (`file://`), así que la web debe abrirse desde un servidor:

- **Opción 1:** abrir la carpeta en Visual Studio Code y pulsar **Go Live** con la extensión **Live Server**.
- **Opción 2:** acceder a la versión publicada en el hosting.

> Si se abre `index.html` con doble clic, todo funciona salvo la sección de noticias, que mostrará *"No se pudieron cargar las noticias."*

**Geolocalización:** el cálculo de ruta de la página de contacto usa la ubicación del usuario. Los navegadores solo la permiten en **HTTPS** o en `localhost`, y piden permiso la primera vez.

---

## 📁 Estructura de carpetas

```
Miguel_Gonzalez_trabajoJAVASCRIPT/
├── index.html                  Portada
├── README.md
├── assets/
│   ├── favicon/                Favicons y site.webmanifest
│   └── images/                 Banner, productos e icono del mapa
│       └── noticias/           Imágenes de las noticias
├── css/
│   ├── index.css               Estilos comunes: variables, temas, header, footer y responsive
│   ├── noticias.css            Tarjetas de noticias
│   ├── galeria.css             Carrusel, filtros y visor de imágenes
│   ├── presupuesto.css         Tienda y formulario
│   ├── contacto.css            Tarjeta de contacto y mapa
│   └── politica-privacidad.css Aviso legal
├── data/
│   └── noticias.json           Noticias que se cargan en la portada
├── js/
│   ├── index.js                Cambio de tema (común a todas las páginas)
│   ├── noticias.js             Carga y muestra las noticias
│   ├── galeria.js              Carrusel, filtros y visor
│   ├── presupuesto.js          Validación y cálculo del presupuesto
│   └── contacto.js             Mapa y cálculo de ruta
└── views/
    ├── galeria.html
    ├── presupuesto.html
    ├── contacto.html
    └── politica-privacidad.html
```

Solo `index.html` está en la raíz. El resto de páginas están en `views/`, y cada página carga `index.css` (estilos comunes) más su propio CSS.

---

## 📄 Páginas y funcionalidades

### Portada (`index.html`)
Cinco secciones: portada con banner, productos destacados, filosofía de la empresa, **últimas noticias** y llamada a la página de presupuesto.

- **Noticias dinámicas:** `noticias.js` lee `data/noticias.json` con `fetch()` y `async/await`, genera una tarjeta por noticia y gestiona los errores con `try/catch`.
- Cada tarjeta muestra el inicio del texto difuminado y un botón **"Leer más / Leer menos"** que la despliega.
- Las noticias se colocan en una rejilla de **4, 2 o 1 columnas** según el ancho de pantalla, para que las filas queden siempre completas.
- Los botones **"Ver Producto"** abren la galería ya filtrada por esa categoría (`galeria.html?categoria=...`).

### Galería (`views/galeria.html`)
- **Carrusel** con la imagen activa en el centro y las vecinas a los lados.
- Navegación con **flechas**, **puntos indicadores**, **teclado** (← →) y clic en las imágenes laterales.
- **Filtros por categoría:** Barras y discos, Mancuernas y Kettlebells, Racks y Bancos.
- **Visor de imagen ampliada**, que se cierra con clic o con la tecla Esc.
- Lee la categoría de la URL (`URLSearchParams`) para llegar filtrado desde la portada.

### Tienda y presupuesto (`views/presupuesto.html`)
Productos destacados con botón **"Añadir al presupuesto"**, que selecciona el producto, resalta su tarjeta y lleva al total.

**Validación de los datos de contacto** (en tiempo real y al enviar):

| Campo | Regla |
|---|---|
| Nombre | Solo letras (con tildes y ñ), de 2 a 15 caracteres |
| Apellidos | Solo letras, de 2 a 40 caracteres |
| Teléfono | Exactamente 9 dígitos |
| Email | Formato estándar (`usuario@dominio.ext`) |

**Calculadora del presupuesto**, que se actualiza al instante:

- **Producto:** Barra olímpica (150 €), Mancuernas (100 €), Banco de pesas (200 €).
- **Plazo de entrega:**
  - Solo días: de 7 a 30. Al escribir 30 días se convierten en 1 mes.
  - De 1 a 3 meses: se pueden añadir de 0 a 29 días.
  - A partir de 4 meses solo se cuentan meses y el campo de días se desactiva.
- **Descuento por plazo:** 5 % por cada mes a partir del tercero, hasta un máximo del 50 % (12 meses). Se aplica solo sobre el precio del producto.
- **Extras:** protector de suelo (20 €), montaje (40 €) y color personalizado (50 €). Los precios se leen del propio checkbox, así que solo están escritos en un sitio.
- **Fórmula:** `total = producto − producto × descuento + extras`

El formulario no se envía si falta algún dato, si el plazo no es válido o si no se aceptan las condiciones. Como el proyecto no tiene servidor, al ser válido se muestra una confirmación y se limpia el formulario.

### Contacto (`views/contacto.html`)
- Datos de la empresa: dirección, teléfonos, email y horario.
- **Mapa interactivo** con OpenStreetMap y Leaflet, con un marcador propio de la empresa.
- **Cálculo de ruta:** al pulsar en el mapa se obtiene la ubicación del usuario y se dibuja la ruta hasta la tienda, con indicaciones en español.
- Botón de **pantalla completa** para el mapa.

### Aviso legal y política de privacidad (`views/politica-privacidad.html`)
Datos identificativos, condiciones de uso, propiedad intelectual y protección de datos (RGPD).

---

## ✨ Características comunes

- **Tema claro / oscuro:** botón en el menú. Funciona con variables CSS y el atributo `data-tema`, y la elección se guarda en `localStorage`.
- **Diseño responsive:** puntos de corte en 1200, 768, 600, 480 y 360 px. Probado de 320 a 1920 px sin desbordes horizontales.
- **Accesibilidad:**
  - El texto rojo usa una variable propia (`--accent-text`) que cumple el contraste **WCAG AA** (mínimo 4,5:1) en los dos temas.
  - Todas las imágenes tienen `alt` y todos los campos tienen `<label>`.
  - Los botones que solo tienen icono llevan `aria-label`.
- **Menú con página activa resaltada** y header fijo al hacer scroll.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica (`header`, `nav`, `main`, `section`, `article`, `footer`) |
| CSS3 | Variables, Flexbox, Grid, media queries, transiciones, `clamp()` |
| JavaScript (ES6+) | `fetch`, `async/await`, `try/catch`, un archivo JS por página, sin frameworks |
| [Leaflet](https://leafletjs.com/) 1.9.4 | Mapa interactivo |
| [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/) 3.2.12 | Cálculo de rutas |
| [Leaflet.fullscreen](https://github.com/brunob/leaflet.fullscreen) 5.3.3 | Pantalla completa del mapa |
| [OpenStreetMap](https://www.openstreetmap.org/) | Mapas |
| [Font Awesome](https://fontawesome.com/) 6.5.1 | Iconos de redes sociales |

Las librerías se cargan por CDN con **la versión fijada**, para que una actualización externa no rompa la web.

---

## 📐 Estilo de código

- Código formateado con **[Prettier](https://prettier.io/)**: 4 espacios de sangría, comillas simples en JavaScript y líneas de hasta 120 caracteres. Los HTML se mantienen con su formato original.
- Nombres de variables y funciones en **español**.
- Código comentado por secciones.

---

## 📝 Notas

- **Empresa ficticia:** la empresa, los productos, las noticias y los datos de contacto son inventados para el proyecto.
- **Sin servidor (backend):** el formulario de presupuesto no envía datos a ningún sitio.
- **Rutas del mapa:** el cálculo de rutas usa el servidor público de demostración de OSRM, pensado para pruebas y no para uso comercial.
