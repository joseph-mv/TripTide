# Project Coding Standards

These rules enforce coding standards for a full-stack React + Express project (MERN stack without Mongo specific rules).

## General Rules

- **Prefer TypeScript over JavaScript**: All new code should be written in TypeScript.
- **Use ES modules**: Prefer ES module syntax (`import`/`export`) over CommonJS (`require`/`module.exports`).
- **Write clean, readable, maintainable code**: Code should be easy to understand and follow.
- **Avoid unnecessary comments**: Comments should explain *why* something is done, not *what* is done.
- **Use early returns instead of nested conditions**: Improve readability by returning early from functions.
- **Prefer `async/await` instead of `.then()`**: Use `async/await` for asynchronous operations to improve readability.
- **Follow functional programming where possible**: Favor pure functions and immutability.

## React Rules

- **Use functional components only**: All React components should be functional components.
- **Use React hooks**: Leverage React hooks for state and lifecycle management.
- **Prefer custom hooks for reusable logic**: Extract reusable component logic into custom hooks.
- **Keep components small and focused**: Each component should have a single responsibility.
- **Avoid prop drilling when possible**: Use Context API or state management libraries for global state.
- **Use folder-based component structure**: Organize components within their own folders (e.g., `client/src/components/Button/index.tsx`).

## Express Rules

- **Use MVC pattern**: Follow the Model-View-Controller pattern.
- **Separate**:
  - `routes`: Define API routes.
  - `controllers`: Handle request logic and interact with services.
  - `services`: Encapsulate business logic.
  - `middleware`: Handle cross-cutting concerns (authentication, logging, etc.).
- **Use async error handling**: Ensure asynchronous errors are caught and handled properly.
- **Validate request inputs**: All API inputs must be validated.
- **Use centralized error handling middleware**: Implement a global error handling middleware.

## File Organization

Follow this project structure:

```
client/
  src/
    components/
    pages/
    hooks/
    services/
    utils/
```

```
server/
  src/
    routes/
    controllers/
    services/
    middleware/
    utils/
```

## Code Quality

- **Prefer `const` over `let`**: Use `const` for variables that do not change, and `let` for mutable variables.
- **Avoid `any` in TypeScript**: Strive for strong typing and avoid `any` wherever possible.
- **Use destructuring**: Use object and array destructuring for cleaner code.
- **Prefer small reusable functions**: Break down complex logic into smaller, focused functions.
- **Follow single responsibility principle**: Each function, module, or class should have one reason to change.

## Performance

- **Avoid unnecessary re-renders**: Optimize React components to prevent excessive re-renders.
- **Use memoization when appropriate**: Employ `React.memo`, `useMemo`, and `useCallback` for performance optimization.
- **Optimize API calls**: Reduce unnecessary API requests and optimize data fetching.

## Security

- **Never expose secrets**: Do not hardcode or expose sensitive information in the codebase.
- **Validate all API inputs**: Implement robust input validation for all API endpoints.
- **Use proper HTTP status codes**: Return appropriate HTTP status codes for API responses (e.g., 200 OK, 400 Bad Request, 401 Unauthorized, 500 Internal Server Error).
