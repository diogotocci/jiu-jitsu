# Graph Report - jiu-jitsu  (2026-11-25)

## Corpus Check
- 16 files · ~3,568 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 3)

## Summary
- 138 nodes · 141 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Coding Standards
- package.json
- session-start.mjs
- updates
- agent-tooling.test.mjs
- ci.yml
- steps
- AGENTS.md — jiu-jitsu
- scripts
- .prettierrc.json
- Workflow: skills that apply automatically
- minimal-code.md
- VENDORED.md

## God Nodes (most connected - your core abstractions)
1. `Coding Standards` - 20 edges
2. `updates` - 8 edges
3. `scripts` - 7 edges
4. `steps` - 5 edges
5. `AGENTS.md — jiu-jitsu` - 5 edges
6. `check` - 4 edges
7. `eslint` - 4 edges
8. `frontMatterOf()` - 3 edges
9. `descriptionOf()` - 3 edges
10. `alwaysOnRules()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (14 total, 4 thin omitted)

### Community 0 - "Coding Standards"
Cohesion: 0.10
Nodes (20): AI attribution, Coding Standards, Comments, Commits and branches, Completion quality, Configuration, Dependencies, Emojis (+12 more)

### Community 1 - "package.json"
Cohesion: 0.12
Nodes (18): local, require, devDependencies, eslint@^10.15.0, @eslint/js@^10.0.1, globals@^17.14.0, prettier@^3.10.1, engines (+10 more)

### Community 2 - "session-start.mjs"
Cohesion: 0.16
Nodes (12): alwaysOnRules(), descriptionOf(), frontMatterOf(), markdownFiles(), rulesDir, skillIndex(), skillsDir, usingSuperpowersFile (+4 more)

### Community 3 - "updates"
Cohesion: 0.12
Nodes (15): prefix, prefix-development, security-fixes, interval, applies-to, patterns, updates, commit-message (+7 more)

### Community 4 - "agent-tooling.test.mjs"
Cohesion: 0.18
Nodes (3): hook, repoRoot, sync

### Community 5 - "ci.yml"
Cohesion: 0.18
Nodes (10): concurrency, cancel-in-progress, group, name, on, pull_request, push, permissions (+2 more)

### Community 6 - "steps"
Cohesion: 0.20
Nodes (10): runs-on, steps, timeout-minutes, jobs, check, name, run, uses (+2 more)

### Community 7 - "AGENTS.md — jiu-jitsu"
Cohesion: 0.22
Nodes (7): 1. Regras sempre ativas e skills — use sem esperar o usuário pedir, 2. Git: o agente commita, faz push e abre PR; o Diogo faz o merge, 3. Projeto, 4. Manutenção das skills, AGENTS.md — jiu-jitsu, Mapeamento de nomes (skills do Superpowers), jiu-jitsu

### Community 8 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, format, format:check, lint, lint:fix, sync-skills, test

### Community 9 - ".prettierrc.json"
Cohesion: 0.29
Nodes (6): arrowParens, endOfLine, printWidth, semi, singleQuote, trailingComma

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `eslint` connect `package.json` to `agent-tooling.test.mjs`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `Coding Standards` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.12380952380952381 - nodes in this community are weakly interconnected._
- **Should `updates` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._