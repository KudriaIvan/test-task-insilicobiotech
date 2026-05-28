# Code Style

This workspace uses automated formatting and linting rather than manual style
review.

## Sources

- Angular coding style guide: Angular naming, structure, standalone components,
  `inject`, protected template members, `readonly`, class/style bindings,
  lifecycle interfaces, and simple templates.
- Angular best practices: standalone APIs, signals, `OnPush`, modern template
  control flow, and `NgOptimizedImage`.
- Google TypeScript style guide: `const` by default, no `var`, no default
  exports for app/library code, type-only imports/exports, semicolons, and
  concise implementation comments.
- Google JavaScript style guide: 80-column formatting and explicit semicolons.

## Commands

```sh
npm run format
npm run format:check
npm run lint
npm run check
```

## Project Rules

- Prettier owns whitespace and wrapping.
- ESLint owns code quality, Angular conventions, template accessibility, and Nx
  module boundaries.
- Do not add formatter-like ESLint rules that conflict with Prettier.
- Keep app/library source exports named. Config files may use default exports
  when required by tooling.
- Prefer comments that explain why a decision exists, not what each line does.
