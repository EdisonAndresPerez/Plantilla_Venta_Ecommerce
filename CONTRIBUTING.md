# Contributing

Gracias por contribuir a este proyecto.

## Flujo de trabajo (Git)

- Rama estable: `main`
- Rama de desarrollo (recomendada): `develop`
- Ramas de trabajo:
  - `feature/<breve-descripcion>` (nuevas funcionalidades)
  - `fix/<breve-descripcion>` (correcciones)
  - `refactor/<breve-descripcion>` (refactors)
  - `docs/<breve-descripcion>` (documentación)

### Propuesta simple (para equipos y proyectos reales)

1. Crea una rama desde `develop`:
   - `git checkout develop`
   - `git pull`
   - `git checkout -b feature/auth-login-ui`
2. Haz cambios en pequeños pasos.
3. Commits pequeños y atómicos (ver convención abajo).
4. Sube tu rama:
   - `git push -u origin feature/auth-login-ui`
5. Abre un Pull Request hacia `develop`.
6. Al finalizar el sprint/entrega: merge `develop` -> `main` (idealmente con tag/version).

> Si trabajas solo y quieres algo más simple: puedes usar `main` + ramas `feature/*` y merge directo a `main`.

## Convención de commits (Conventional Commits)

Formato:

```
<type>(<scope>): <summary>

<body opcional>

<footer opcional>
```

Tipos más usados:
- `feat`: nueva funcionalidad
- `fix`: corrección de bug
- `docs`: documentación
- `refactor`: cambio interno sin alterar comportamiento
- `chore`: tareas de mantenimiento (deps, configs)
- `test`: tests
- `style`: formato (sin cambios de lógica)
- `build`: build tooling
- `ci`: pipelines

Scopes sugeridos en este proyecto:
- `shop`, `admin`, `auth`, `router`, `ui`, `styles`, `deps`

Ejemplos:
- `feat(auth): add register page layout`
- `fix(router): prevent redirect loop on /login`
- `docs(readme): add setup instructions`
- `chore(deps): bump react-router`

### ¿Cada cuánto hacer commits?

No es “por tiempo”, es “por cambio lógico”. Regla práctica:
- Un commit = un paso verificable que deja el repo en buen estado.
- Ideal: 3–15 minutos de trabajo por commit cuando estás construyendo UI/flujo.
- Evita commits gigantes (difíciles de revisar) y evita commits que rompan el build.

Checklist antes de commitear:
- `npm run lint` pasa (o al menos no empeoraste el repo)
- El cambio compila/funciona localmente
- El mensaje describe el valor del cambio

## Calidad / revisiones

- Prefiere PRs pequeños: 200–500 líneas cambiadas máximo cuando sea posible.
- Incluye screenshots si cambias UI.
- Si agregas una ruta nueva, actualiza el README (sección de rutas).
