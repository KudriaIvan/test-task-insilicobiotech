# Architecture Plan

This project is a single-domain Nx Angular workspace for the bioprocess medium
optimisation dashboard exercise.

## Dependency Direction

The intended dependency flow is:

```txt
app -> feature -> ui -> utils -> models/constants
              -> data-access -> models/constants
```

Rules:

- The app shell imports route-level feature libraries only.
- Feature libraries coordinate user state and compose UI/data-access.
- UI libraries do not import data-access.
- Data-access libraries do not import UI or feature libraries.
- Utils are pure and do not import Angular.
- Models and constants stay at the bottom of the graph.

## Planned Libraries

```txt
libs/
  medium-composition/
    feature/
      dashboard/
    ui/
      medium-chart/
    data-access/
    utils/
      chart-data/
    models/
    constants/
```

## Boundary Tags

Only `type:*` tags are enabled for now:

- `type:app`
- `type:feature`
- `type:ui`
- `type:data-access`
- `type:utils`
- `type:models`
- `type:constants`

No `scope:*` tags are enforced yet because there is only one product domain.
If scope tags become useful, start with `scope:medium` and introduce
`scope:shared` only for code that is genuinely reusable outside the exercise
domain.

## Exercise Mapping

- Domain models: `Medium`, `MediumComponent`, chart mode types.
- Constants: chart palette.
- Data-access: `MOCK_MEDIUM`.
- Utils: `buildChartData(medium, mode)` and related pure chart-data helpers.
- UI: `MediumChartComponent` wrapping ECharts/ngx-echarts.
- Feature: dashboard page with the absolute/relative toggle.
