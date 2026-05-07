# 🚀 VoltPro — Guía de Instalación Completa
### Desde cero hasta ver la web corriendo con el robot 3D

---

## ✅ PASO 1 — Instalar Node.js

Node.js es el motor que necesitas para correr React y Vite.

1. Ve a 👉 **https://nodejs.org**
2. Descarga la versión **LTS** (la recomendada, dice "Recommended For Most Users")
3. Ejecuta el instalador → siguiente → siguiente → instalar
4. Cuando termine, **abre una terminal / PowerShell** y verifica:

```bash
node --version
# Debe mostrar algo como: v20.x.x

npm --version
# Debe mostrar algo como: 10.x.x
```

> **¿Cómo abrir la terminal en Windows?**
> Presiona `Win + R`, escribe `powershell`, Enter.
> 
> **¿En Mac?**
> `Cmd + Espacio`, escribe `terminal`, Enter.

---

## ✅ PASO 2 — Crear la carpeta del proyecto

En la terminal, navega a donde quieras guardar el proyecto, por ejemplo el Escritorio:

```bash
# Windows
cd C:\Users\TuNombre\Desktop

# Mac / Linux
cd ~/Desktop
```

Crea la carpeta del proyecto:

```bash
mkdir voltpro
cd voltpro
```

---

## ✅ PASO 3 — Copiar los archivos del proyecto

Copia **todos los archivos** que te entregué dentro de la carpeta `voltpro/`.
La estructura debe quedar exactamente así:

```
voltpro/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Navbar.jsx
        ├── Navbar.module.css
        ├── Hero.jsx
        ├── Hero.module.css
        ├── Services.jsx
        ├── Services.module.css
        ├── WhyUs.jsx
        ├── WhyUs.module.css
        ├── Process.jsx
        ├── Process.module.css
        ├── Testimonials.jsx
        ├── Testimonials.module.css
        ├── Contact.jsx
        ├── Contact.module.css
        ├── Footer.jsx
        ├── Footer.module.css
        ├── WhatsAppFloat.jsx
        ├── WhatsAppFloat.module.css
        └── ui/
            ├── Icons.jsx
            ├── SectionHeader.jsx
            └── SectionHeader.module.css
```

---

## ✅ PASO 4 — Instalar las dependencias

Con la terminal dentro de la carpeta `voltpro/`, ejecuta:

```bash
npm install
```

Esto descargará automáticamente:
- **React** — la librería de interfaz
- **Vite** — el servidor de desarrollo ultrarrápido
- **Framer Motion** — animaciones de las tarjetas de testimonios
- **@splinetool/react-spline** — el componente del robot 3D
- **@splinetool/runtime** — el motor de Spline

> ⏳ Espera 1-2 minutos. Verás que se crea una carpeta `node_modules/`.

---

## ✅ PASO 5 — Correr el servidor de desarrollo

```bash
npm run dev
```

Verás algo así en la terminal:

```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

---

## ✅ PASO 6 — Ver la página web

Abre tu navegador (Chrome recomendado) y ve a:

```
http://localhost:5173
```

🎉 **¡Listo! Deberías ver la landing page de VoltPro con el robot 3D.**

> **Nota sobre el robot 3D:** La primera vez tarda unos segundos en cargar
> porque descarga la escena de Spline desde internet.
> Verás un spinner amarillo mientras carga, luego aparece el robot interactivo.

---

## 🔧 COMANDOS ÚTILES

| Comando | Para qué sirve |
|---------|---------------|
| `npm run dev` | Inicia el servidor de desarrollo (para trabajar) |
| `npm run build` | Genera la versión final para publicar |
| `npm run preview` | Previsualiza la versión publicada |

---

## ❌ SOLUCIÓN DE PROBLEMAS COMUNES

### "command not found: npm"
→ Node.js no se instaló bien. Reinstálalo desde nodejs.org y reinicia la terminal.

### "Cannot find module..."
→ Ejecuta `npm install` de nuevo dentro de la carpeta `voltpro/`.

### El robot 3D no carga / se ve en blanco
→ Es normal si la conexión es lenta. Espera unos segundos.
→ Asegúrate de tener conexión a internet (Spline carga desde la nube).
→ Si quieres poner tu propia escena de Spline, cambia la URL en `Hero.jsx`:
```jsx
scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
```

### La página no se ve bien en móvil al probarla en Chrome DevTools
→ Presiona `F12` → ícono de móvil → selecciona `iPhone 12` o similar → recarga.

---

## 📱 VERIFICAR RESPONSIVO

Para probar cómo se ve en celular sin necesitar el teléfono:

1. En Chrome abre `http://localhost:5173`
2. Presiona `F12` (DevTools)
3. Clic en el ícono de tablet/móvil (arriba izquierda del panel)
4. Selecciona un dispositivo (iPhone 14, Galaxy S20, etc.)
5. ¡La página se ajusta automáticamente!

---

## 🌐 PUBLICAR EN INTERNET (opcional, gratis)

Si quieres que la página sea visible en internet:

### Opción A — Netlify (más fácil)
1. Ejecuta `npm run build` → se crea la carpeta `dist/`
2. Ve a **https://netlify.com** → crea cuenta gratis
3. Arrastra la carpeta `dist/` al panel de Netlify
4. ¡En 30 segundos tendrás una URL pública!

### Opción B — Vercel
1. Ve a **https://vercel.com** → crea cuenta con GitHub
2. Sube el proyecto a GitHub
3. Conecta el repositorio en Vercel → deploy automático

---

## 🎨 PERSONALIZACIÓN RÁPIDA

| Qué cambiar | Dónde |
|-------------|-------|
| Nombre de la empresa | `Navbar.jsx` → "VoltPro" |
| Colores principales | `src/index.css` → variables `--y`, `--d`, etc. |
| Robot 3D (escena Spline) | `Hero.jsx` → prop `scene="..."` |
| Número de WhatsApp | Busca `573001234567` y reemplaza en todos los archivos |
| Testimonios | `Testimonials.jsx` → array `DATA` |
| Servicios | `Services.jsx` → array `SERVICES` |

---

*VoltPro · React + Vite + Spline + Framer Motion*
