# Google Comment Guidelines

Sources:

- Google Engineering Practices, "How to write code review comments":
  https://google.github.io/eng-practices/review/reviewer/comments.html
- Google Developer Documentation Style Guide, "API reference code comments":
  https://developers.google.com/style/api-reference-comments
- Google TypeScript Style Guide:
  https://google.github.io/styleguide/tsguide.html

## Code Review Comments

Google Engineering Practices emphasize:

- Be kind, clear, and helpful.
- Comment about code and behavior, not the developer.
- Explain the reasoning when it improves understanding.
- Balance direct guidance with leaving implementation choices to the author.
- Label severity so optional notes are not mistaken for required changes.
- Add positive comments when a change improves clarity, tests, or design.
- If a review explanation matters to future readers, ask for clearer code or a
  source comment instead of leaving the explanation only in the review tool.

Severity labels to use in this repo:

- `Blocking:` required before merge because correctness, safety, build, tests, or
  architecture are affected.
- `Required:` must be addressed, but the change can be mechanical or low risk.
- `Nit:` minor issue with low impact.
- `Optional:` or `Consider:` useful suggestion, not required.
- `FYI:` informational note, no action expected.

## Source Comments

Prefer comments that explain why, not what.

Good topics:

- domain assumptions;
- non-obvious formulas;
- chart-library limitations;
- accessibility rationale;
- performance tradeoffs;
- temporary workarounds with a removal trigger.

Weak topics:

- repeating variable names;
- restating types already checked by TypeScript;
- narrating each line;
- explaining code that should instead be simplified.

## TypeScript and JSDoc

Use `/** JSDoc */` for documentation that a caller or API consumer should read.
Use `//` for implementation comments.

For multi-line implementation comments, prefer consecutive `//` lines rather
than block comments.

JSDoc should not duplicate TypeScript annotations. It should add purpose,
assumptions, units, constraints, examples, or edge cases.

For exported functions, start with an action verb:

```ts
/**
 * Builds ECharts-ready series data for the selected comparison mode.
 *
 * Relative mode represents the reference formulation as 1.0 and the optimised
 * formulation as opt/ref.
 */
```

## API Comment Wording

Use present tense and concise descriptions.

For boolean values:

```txt
True if the chart is showing fold-change values; false otherwise.
```

For deprecated APIs, state the replacement:

```txt
Deprecated. Use `buildChartData` instead.
```

For parameter descriptions, define behavior or constraints, not just the type.
