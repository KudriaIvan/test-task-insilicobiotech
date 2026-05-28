# Bioprocess Medium Optimisation Dashboard

Angular/Nx application that visualises a reference medium formulation against an optimised formulation, with absolute and relative chart modes powered by Apache ECharts.

## Stack

- Nx 22
- Angular 21 standalone, CSR, zoneless
- NgRx Signals (`@ngrx/signals`)
- Taiga UI 5 component library
- Apache ECharts + `ngx-echarts`
- TypeScript strict mode
- Jest unit tests

## Run

Install dependencies:

```sh
npm install
```

Start the app:

```sh
npm start
```

Test:

```sh
npm test
```

Lint:

```sh
npm run lint
```

## Architecture

Feature-first Nx monorepo. The app shell only imports route-level feature libraries. Libraries are tagged by type and the Nx `@nx/enforce-module-boundaries` rule prevents layer violations.

```
libs/medium-dashboard/
  constants/      # type:constants — chart colour palette
  data-access/    # type:data-access — NgRx signal store, mock API service
  feature/        # type:feature — page component, mode toggle
  models/         # type:models — domain interfaces (Medium, MediumComponent)
  ui/
    chart/        # type:ui — MediumChartComponent (pure renderer)
    models/       # type:models — ChartEntry, MediumChartData, ChartMode
  utils/          # type:utils — buildChartData, toEChartsOptions
```

Data flows in one direction:

```
store.medium() + feature.mode()
  → buildChartData(medium, mode)   # domain → chart-ready data
  → toEChartsOptions(data, mode)   # chart data → ECharts config
  → MediumChartComponent           # renders
```

## Assumptions & Tradeoffs

**`MediumChartComponent` accepts `EChartsOption` instead of `medium` + `mode`**

The task specifies `@Input() medium: Medium` and `@Input() mode` on the chart component. This was a deliberate architectural decision: the transformation pipeline (`buildChartData → toEChartsOptions`) lives in the `utils` library, which has no Angular dependency. Putting it in the `feature` layer keeps the chart component a pure renderer with a single concern — displaying whatever ECharts config it receives. The feature component owns mode state and orchestrates the transformation, which matches the unidirectional data-flow architecture described in `docs/architecture.md`. The tradeoff is a deviation from the spec's suggested component API.

**Relative mode uses ratio (`opt / ref`), not percentage change**

The task example shows `relative = opt_value / ref_value`. A ratio of `1.0` is the reference baseline (dashed line), values above `1.0` are increases and below are decreases. This is more natural for scientists reading concentration fold-changes than a `%` delta.

**Mock data served via `MediumDashboardApiService` returning an observable**

No backend exists. The service wraps `MOCK_MEDIUM` in `of(...)` so the data-access layer is ready to swap in a real HTTP call without changing the store or feature.

**Colour palette applied per compound, not per series**

Each compound pair (Reference + Optimised) shares one base colour from `['#4A90D9', '#E07048', '#50B86C', '#9B6EC8']`. Reference bars use a 50 % lightened shade of that colour. This matches the spec's visual requirement and makes compound identity immediately readable regardless of mode.

**Gap entries between compound groups**

`buildChartData` inserts invisible gap entries between compound groups as required by the spec. In ECharts these render as zero-width transparent bar slots, creating visual breathing room between pairs.
