---
name: google-comment-style
description: "Draft, rewrite, or audit AI-generated implementation notes, source-code comments, TODOs, JSDoc/API documentation, and code review comments using Google-style clarity and Google Engineering Practices. Use when asked to create comments, review comments, PR feedback, inline explanations, or comment standards for this Angular/Nx repo."
---

# Google Comment Style

Use this skill to make comments clear, actionable, respectful, and useful to
future maintainers.

## Workflow

1. Identify the comment type: source comment, JSDoc/API comment, TODO, PR/code
   review comment, or AI-facing implementation note.
2. Decide whether a comment is needed. Prefer clearer naming, smaller functions,
   or simpler structure when a comment only explains avoidable complexity.
3. Write the comment around intent, constraints, tradeoffs, or action. Avoid
   restating what the code already says.
4. Keep each comment focused on one issue or idea.
5. Use English for code and review comments unless the user explicitly asks for
   another language. Answer the user in their language.

For detailed rules, read `references/google-comment-guidelines.md`.

## Review Comments

Write review comments about the code, not the author.

Use severity labels when intent could be ambiguous:

- `Blocking:` for a required change before merge.
- `Required:` for a non-blocking but still mandatory correction.
- `Nit:` for a small issue that should be fixed but is low impact.
- `Optional:` or `Consider:` for suggestions.
- `FYI:` for information that does not require action in this change.

Preferred shape:

```txt
Label: State the concrete issue. Explain why it matters. Suggest a fix or ask a
specific question if the right fix depends on context.
```

Avoid vague comments such as "clean this up" or "bad naming". State the impact:
"This name hides that the value is already normalized, which makes the relative
mode calculation harder to verify."

## Source Comments

Add source comments when they preserve information that is not obvious from the
code:

- why a branch, threshold, fallback, or invariant exists;
- why a charting workaround is needed;
- what a non-obvious domain formula assumes;
- what future change should remove a temporary workaround.

Avoid comments that repeat names or types:

```ts
// Bad: Sets the mode to relative.
mode.set('relative');

// Good: The reference series stays at 1.0 so deviations read as fold-change.
```

## JSDoc/API Comments

Use JSDoc for exported APIs, reusable utilities, and public component contracts
when the signature is not enough.

Keep JSDoc concise:

- Start with the purpose or action.
- Explain important assumptions, units, edge cases, or side effects.
- Do not duplicate TypeScript types.
- Document boolean behavior as `True if ...; false otherwise.` when needed.

## TODO Comments

Use TODOs only for temporary, tracked work:

```ts
// TODO(issue-123): Replace mock medium data when the API contract is available.
```

A TODO must include an owner, ticket, or removal condition. Do not add TODOs for
general wishes.
