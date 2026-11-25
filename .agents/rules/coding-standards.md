---
trigger: always_on
description: Coding standards for every source, test, script, config and technical document in this repository.
---

# Coding Standards

These rules apply to all source code, tests, scripts, configuration, logs, technical documentation, commit messages and generated development artifacts in this repository. They come from the owner's other projects (policia-ladrao, pelada-manager, adaptaprova-a2). Do not introduce new conventions without asking the owner.

## Language

All technical content is written in English:

- identifiers (functions, classes, types, variables, constants), technical file names;
- tests and test names;
- comments, JSDoc, docstrings;
- developer-facing errors, logs, console and CLI output, script messages;
- configuration keys, storage keys, API fields, database names and migrations;
- commit messages, PR titles and bodies.

User-facing product copy is Brazilian Portuguese (screens, buttons, labels, messages for the teacher and the student). Do not use em dashes in product copy. Never mix Portuguese identifiers into code.

Conversations with the owner, product specs and plans (`docs/`), `AGENTS.md` and the backlog stay in Portuguese: they are product documents written for the owner.

Bad:

```ts
const alunoAtual = getStudent();
function carregarPresencas() {}
```

Good:

```ts
const currentStudent = getStudent();
function loadAttendance() {}
```

## Naming

Use descriptive English names (`classesUntilEvaluation`, `beltRank`, `attendanceCount`). Avoid vague names (`data`, `obj`, `tmp`, `foo`, `result2`). Booleans read as questions: `isTeacher`, `hasPendingEvaluation`, `canEditStudent`.

## Functions

Functions have one clear responsibility, a descriptive name, no hidden side effects, few parameters (prefer an options object above four), predictable return types, and fail explicitly at boundaries. Keep them small enough to understand and test; ESLint warns above the size budgets.

## Comments

Comments explain why something exists, constraints, invariants and non-obvious behavior. Do not restate the code. Do not write implementation-history comments; Git history explains changes.

## AI attribution

Never add AI, assistant or model attribution to repository artifacts: no tool names, no "AI-generated", no AI `Co-authored-by` trailers, no session links, no "Generated with" footers. This applies to source, comments, docs, commit messages and bodies, Git trailers, PR descriptions, scripts, logs, UI and metadata.

## Emojis

No emojis in technical output: console, logs, scripts, shell/CLI output, test output, build output and developer-facing errors. Use plain status words (`INFO`, `WARN`, `ERROR`, `PASS`, `FAIL`, `SUCCESS`).

## Logging

Never log secrets, tokens, complete environment variables or personal data (student names, contact details, health information).

## Privacy

Never use real student data in fixtures, screenshots, logs, prompts or tests. Use synthetic names and data. Never commit secrets, credentials, tokens or private URLs.

## Error handling

Do not silently swallow errors. Empty `catch` blocks are allowed only where failure is expected and harmless and must say why in a comment.

## Type safety

Do not bypass type errors. Avoid `any`; prefer `unknown` at external boundaries and validate it. No `@ts-ignore` or unsafe casts to silence valid errors. If a cast is unavoidable, isolate it and explain why.

## External input

Treat as untrusted: form input, URL parameters, request bodies, `localStorage` content and anything from the network. Validate every external boundary on the server, and check authorization (teacher vs. student) on every read and write.

## Tests

Test names are English sentences describing behavior. Tests use synthetic fixtures, are deterministic, avoid arbitrary sleeps (prefer bounded polling), and do not depend on test order or shared mutable state. New logic is written test-first (`test-driven-development` skill). Business logic changes include tests.

## Scripts

Scripts (Node scripts, hooks) use English identifiers and output, no emojis, fail with non-zero exit codes when a check fails, avoid destructive behavior by default, never print secrets, and support non-interactive execution.

## Configuration

Configuration and storage keys use English. Do not add configuration for features that do not exist yet. No placeholder secrets.

## Dependencies

Do not add dependencies unnecessarily. Before adding one, weigh necessity, maintenance, security, license, bundle impact and fit. Prefer the platform and what is already installed (see `minimal-code.md`).

## Formatting and linting

Prettier owns formatting (`.prettierrc.json`); ESLint owns correctness (`eslint.config.mjs`, local rules in `eslint-rules/`). Run `pnpm lint` (Prettier check + ESLint). Do not disable lint rules globally to solve a local problem; fix the code. Errors block; warnings are refactoring pressure to address when touching the code. Source files are budgeted at 350 code lines (`eslint-rules/max-file-lines.cjs`).

## Commits and branches

Commits follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, `ci:`, `build:`), in English, one intentional change each. Every task gets its own branch from the latest `main`; the owner reviews and merges the PR.

## Versioning

`package.json` `version` follows Semantic Versioning. Every PR bumps it exactly once, in its last commit (`chore(release): x.y.z`), based on the highest-impact change in the PR:

- **major** (`x`): a breaking change for users or their data. While the version is `0.y.z`, a breaking change bumps the minor instead; `1.0.0` is set only when the owner declares the launch.
- **minor** (`y`): new user-facing behavior (`feat`). Resets the patch to 0.
- **patch** (`z`): everything else (`fix`, `perf`, `refactor`, `style`, `test`, `docs`, `chore`, `ci`, `build`).

The PR title or body states the new version. Dependabot security PRs do not bump the version; the next regular PR includes them in its bump.

## Completion quality

A change is complete only when:

- the required behavior is implemented and covered by tests;
- `pnpm lint` and `pnpm test` pass (plus typecheck, build and e2e once the app stack adds them);
- the Graphify refresh is done when indexed files changed (`graphify.md`);
- the spec is updated when product behavior changes;
- `package.json` `version` is bumped according to Versioning;
- no unrelated changes are included.
