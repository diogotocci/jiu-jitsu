---
trigger: always_on
description: Which skills to use automatically, without waiting for the owner to ask.
---

# Workflow: skills that apply automatically

Skills live in `.agents/skills/<name>/SKILL.md` (mirrored to `.claude/skills/`). Before acting, check this table. If there is even a ~1% chance a skill applies, read its `SKILL.md` and follow it, announcing "Usando <skill> para <objetivo>". Process skills first (they define how), implementation skills second. `AGENTS.md` and these rules win over any skill.

| Situation | Skill |
|---|---|
| New idea, feature, screen or behavior change (teacher or student version) | `brainstorming`, then `writing-plans` |
| Turning the teacher's questionnaire answers into requirements, or pressure-testing an idea | `grilling` (or `grill-me` when the owner asks to be grilled) |
| Execute a written plan | `subagent-driven-development` (preferred) or `executing-plans` |
| Two or more independent tasks (for example teacher and student screens) | `dispatching-parallel-agents` |
| Any domain logic (graduation rules, attendance counts, progress percentage, permissions) | `test-driven-development` |
| Bug, failing test, odd behavior | `systematic-debugging` |
| New screen, layout, component or visual change | `frontend-design` |
| Review UI, UX or accessibility of a screen | `web-design-guidelines` |
| Browser testing, screenshots, mobile viewport, smoke tests | `playwright-cli` |
| Before saying "done", "works", "passes" | `verification-before-completion` |
| Task finished and needs review / review feedback received | `requesting-code-review` / `receiving-code-review` |
| Cross-module discovery, architecture question or impact analysis | Graphify query (see `graphify.md`) |
| Hand work over to another session | `handoff` |
| A capability no installed skill covers (for example once the stack is chosen) | `find-skills` |

Always-on rules in `.agents/rules/` (`coding-standards.md`, `minimal-code.md`, `graphify.md`, this file) apply to every task without being invoked.

## Git

The agent commits, pushes its task branch and opens the pull request; the owner reviews and merges. The agent never merges, never pushes to `main` and never force-pushes. Details in `AGENTS.md`.
