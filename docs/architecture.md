# Architecture Plan

This project is a single-domain Nx Angular workspace for the bioprocess medium
optimisation dashboard exercise.

The architecture is both vertical and horizontal:

- Vertical boundaries follow product features and nested sub-features.
- Horizontal boundaries follow technical layer responsibilities inside each
  feature area.

## Feature Ownership

Features can contain nested features. Each feature owns the local libraries that
serve its use case: UI, data-access, utilities, constants, and models.

Start code as close as possible to the feature that needs it. Promote it upward
only when another feature at the same level or a parent feature needs it.

Promotion path:

```txt
nested feature -> parent feature -> higher parent feature -> shared
```

`shared` is the last step, not the default location. Move code to shared only
when there is no meaningful parent feature left and the code is genuinely used
across the product.

## Unidirectional Data Flow

User interaction flows down from UI to data:

```txt
ui -> feature -> data-access
```

Rendered state flows back up from data to UI:

```txt
data-access -> feature -> ui
```

Responsibilities:

- UI libraries expose inputs, outputs, and event handlers. They render state and
  emit user intent.
- Feature libraries coordinate UI state, compose UI/data-access, and own
  feature-level decisions.
- Data-access libraries own API calls, store setup, and persistence boundaries.
- Facades and transformers may be introduced in the data layer when they remove
  real complexity, but this exercise does not need them initially.

Data should move in one direction at a time. UI does not call APIs directly, and
data-access does not import UI or feature components.

## Dependency Direction

Rules:

- The app shell imports route-level feature libraries only.
- A parent feature may compose child features.
- A child feature should not import from sibling features directly.
- Feature libraries coordinate state and compose UI/data-access.
- UI libraries do not import data-access.
- Data-access libraries do not import UI or feature libraries/components. This
  can be checked with Nx `@nx/enforce-module-boundaries` dependency constraints
  in [`eslint.config.mjs`](../eslint.config.mjs). Buildable dependency leakage
  is covered by the same local rule config's `enforceBuildableLibDependency`
  option.
- Utils are pure and do not import Angular.
- Constants stay at the bottom of the graph.

Nx tag constraints enforce the horizontal layer direction. Vertical ownership is
kept by directory structure and reviews until the workspace needs explicit
`scope:*` tags.

## Model Boundaries

Low coupling and high cohesion require model separation. UI models and store/data
models must be separate libraries.

Use dedicated `type:models` libraries near the layer that owns them:

- Domain models describe business concepts such as `Medium` and
  `MediumComponent`.
- Store/data models describe API/store state and persistence shapes.
- UI models describe chart-ready and component-ready view state.

Do not reuse store models as UI models just to avoid mapping. That couples
rendering to persistence and makes chart/component changes riskier. Mapping
between model layers belongs in feature/data-access utilities or in a transformer
when the logic becomes large enough to justify one.

## Boundary Tags

Only `type:*` tags are enabled for now:

- `type:app`
- `type:feature`
- `type:ui`
- `type:data-access`
- `type:utils`
- `type:models`
- `type:constants`

No `scope:*` tags are enforced yet because there is only one product domain. If
scope tags become useful, start with `scope:medium` and introduce `scope:shared`
only for code that is genuinely reusable outside the exercise domain.
