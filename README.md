# Bioprocess Medium Optimisation Dashboard

Small Angular/Nx application scaffold for the frontend technical exercise.

The future implementation will visualise a reference medium formulation against
an optimised formulation, with absolute and relative chart modes powered by
Apache ECharts.

## Stack

- Nx 22
- Angular 21 standalone application, CSR, zoneless by default
- TypeScript strict mode
- SCSS
- Jest unit tests
- Playwright e2e scaffold
- Planned charting dependency: `echarts` + `ngx-echarts`

## Run

Install dependencies:

```sh
npm install
```

Start the app:

```sh
npm start
```

Build:

```sh
npm run build
```

Test:

```sh
npm test
```

Lint:

```sh
npx nx lint test-task-insilicobiotech
```

## Architecture

The workspace is prepared for a feature-first Nx structure. The application
project is only an app shell and should depend on feature libraries, not on
charting, data-access, or model libraries directly.

Planned libraries:

- `type:feature`: page/container orchestration, mode state, route-level UI.
- `type:ui`: reusable presentational Angular components, including the medium
  chart component.
- `type:data-access`: mock medium data and future API-facing data sources.
- `type:utils`: pure functions, including chart data transformation.
- `type:models`: domain interfaces and shared chart types.
- `type:constants`: palettes and stable domain constants.

Current module boundary policy is tag-based and intentionally has no
`scope:*` constraints yet. If the exercise grows beyond one domain, the proposed
scope split is:

- `scope:medium` for medium formulation features.
- `scope:shared` for reusable charting or UI primitives that are not specific to
  the medium domain.

## Implementation Notes

- Keep `buildChartData(medium, mode)` pure and framework-independent so it can
  be tested without Angular.
- Keep the container page responsible for mode selection and data source choice.
- Keep `MediumChartComponent` reusable: inputs in, chart options out/rendered.
- Use Angular signals or input signals for component state where appropriate.
- Set `ChangeDetectionStrategy.OnPush` for Angular components.
- Add focused unit tests for absolute values, relative values, and generated gap
  entries before polishing the visual layer.
