# Mario García · Portfolio

Portfolio personal: una experiencia web inmersiva en la que el scroll es la línea de tiempo de una escena 3D.

**[mgarcia02.github.io/portfolio](https://mgarcia02.github.io/portfolio/)**

## La idea

El protagonista es una tecla. Empieza sola delante de mi nombre, gira mientras cuento quién soy, se divide en
doce para mostrar mi stack, vuelve a ser una y da una vuelta completa por cada proyecto, y al final las doce se
reordenan para escribir un mensaje en la sección de contacto.

Toda la geometría y las texturas se generan por código: no hay modelos 3D ni imágenes de las teclas.

## Tecnologías

- [TypeScript](https://www.typescriptlang.org/) y [Vite](https://vite.dev/), sin framework: la página es HTML
  semántico y el comportamiento es imperativo.
- [Three.js](https://threejs.org/) para la escena WebGL.
- [GSAP](https://gsap.com/) con ScrollTrigger para los revelados, y [Lenis](https://lenis.darkroom.engineering/)
  para el scroll suave.

## Estructura

```
index.html            Todo el contenido: se lee aunque el JavaScript o WebGL fallen
src/
├─ main.ts            Arranque y bucle de animación
├─ config/            Capacidades del navegador y breakpoints
├─ content/           Datos de las teclas y leyendas de los proyectos
├─ input/             Estado del puntero
├─ lib/               Utilidades de DOM y matemáticas
├─ motion/            GSAP, scroll suave y revelado de texto
├─ scene/             Escena 3D
│  ├─ timeline.ts     Traduce el scroll a una sección o a una transición entre dos
│  ├─ layouts.ts      Pose de cada tecla en cada sección
│  ├─ legends.ts      Grabados de las teclas, dibujados en canvas
│  ├─ stage.ts        Luces, entorno, geometría y polvo
│  └─ KeyboardScene.ts
├─ ui/                Loader, cursor, menú, paneles de stack y proyectos, etc.
└─ styles/            Tokens, estilos base y una hoja por sección
```

Cada sección fija tiene en el HTML un hueco vacío (`.slot`). La escena mide esos huecos y coloca las teclas sobre
ellos, de modo que el diseño responsive del 3D se controla desde CSS.

## Accesibilidad y resistencia

- Con `prefers-reduced-motion` no hay scroll suave, revelados ni movimiento autónomo.
- Sin WebGL, o en pantallas muy bajas como un móvil en horizontal, la página se muestra como un documento normal, con
  todo el contenido.
- Sin JavaScript, todo el contenido sigue siendo visible.

## Desarrollo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

| Script            | Qué hace                                  |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                    |
| `npm run build`   | Comprueba tipos y genera `dist/`          |
| `npm run preview` | Sirve `dist/` en local                    |
| `npm run lint`    | ESLint                                    |
| `npm run format`  | Prettier                                  |
| `npm run deploy`  | Compila y publica `dist/` en GitHub Pages |

Three.js está fijado en la versión r128 porque de ella dependen la gestión de color y la iluminación de la escena.
Actualizarlo implica volver a ajustar los materiales.

## Contacto

- [LinkedIn](https://www.linkedin.com/in/mario-garc%C3%ADa-rela%C3%B1o-b66878284/)
- mariogrdg02@outlook.com
