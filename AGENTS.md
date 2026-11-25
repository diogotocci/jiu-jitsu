# AGENTS.md — jiu-jitsu

Webapp para uma academia de jiu-jitsu, com duas versões: **professor** (cadastra alunos, registra presença e feedback, acompanha avaliações) e **aluno** (vê presenças, comentários e o progresso até a próxima graduação). Os requisitos estão sendo levantados com o professor; a stack ainda não foi escolhida.

Este arquivo é lido automaticamente por Claude Code (via `CLAUDE.md`), Codex, Cursor, Gemini CLI, Copilot e outros agentes. **As regras daqui têm precedência sobre as skills.**

## 1. Regras sempre ativas e skills — use sem esperar o usuário pedir

**Antes de qualquer tarefa, leia e siga todas as regras de `.agents/rules/*.md` com `trigger: always_on`** (o Claude Code recebe esse conteúdo automaticamente pelo hook de início de sessão `.agents/hooks/session-start.mjs`; outros agentes devem lê-las):

- `workflow.md` — qual skill usar em cada situação (brainstorming, TDD, debugging, verificação, revisão…), sem o usuário invocar;
- `coding-standards.md` — padrões de código (inglês no código, UI em português, sem atribuição de IA, sem emojis em saída técnica, testes, lint, commits, versionamento);
- `minimal-code.md` — escrever o mínimo de código: reusar antes de criar;
- `graphify.md` — quando consultar o grafo do projeto e quando atualizá-lo.

As skills ficam em `.agents/skills/<nome>/SKILL.md` (fonte da verdade) e são espelhadas em `.claude/skills/` para o Claude Code. Se houver ~1% de chance de uma skill se aplicar, **leia o SKILL.md e siga-o**, anunciando "Usando <skill> para <objetivo>". Skills de processo vêm primeiro; skills de implementação depois.

### Mapeamento de nomes (skills do Superpowers)
- `superpowers:<nome>` = `.agents/skills/<nome>`.
- `superpowers:using-git-worktrees` → não usado; trabalhe na pasta do projeto, numa branch da tarefa.
- `superpowers:finishing-a-development-branch` → não instalada; siga a seção 2 (commit, push e PR; o merge é do Diogo).

## 2. Git: o agente commita, faz push e abre PR; o Diogo faz o merge

- Cada tarefa começa do `main` atualizado, numa branch própria (`feature/`, `fix/`, `refactor/`, `chore/`, `test/`, `docs/` + nome curto em kebab-case). Pequenos ajustes da mesma tarefa continuam na mesma branch.
- Antes de começar: `git status`; nunca descarte, faça stash ou commit de mudanças que não são da tarefa (`git reset --hard`, `git clean`, `git checkout -- .` são proibidos sem pedido explícito).
- O agente faz `git commit` (Conventional Commits, em inglês), `git push` da branch da tarefa e abre o PR para o `main`.
- O agente **nunca** faz merge de PR, nunca faz push direto no `main` e nunca usa `--force`.
- Commits e PRs nunca levam atribuição de IA (sem `Co-authored-by` de ferramenta, link de sessão ou rodapé "Generated with").
- Último commit de cada PR: bump de versão SemVer (`chore(release): x.y.z`), ver `coding-standards.md`.

## 3. Projeto
- Repositório: `https://github.com/diogotocci/jiu-jitsu` · branch padrão: `main`.
- Stack: a definir (webapp, como o time justo). Por enquanto o repositório tem só a estrutura de agentes, com Node 22+ e pnpm para lint e testes das ferramentas.
- Comandos:
  - `pnpm install` — instalar dependências;
  - `pnpm test` — testes (`node --test`, em `tests/`);
  - `pnpm lint` — Prettier + ESLint (regras locais em `eslint-rules/`); `pnpm lint:fix` corrige;
  - build: ainda não existe (entra com a stack);
  - `graphify update .` — atualizar o grafo (instalar com `uv tool install graphifyy==0.9.120`); `graphify query "<pergunta>"` para descoberta. Ver `.agents/rules/graphify.md`.
- Segurança de dependências: o Dependabot abre PR só para correções de vulnerabilidade; o CI (`.github/workflows/ci.yml`) roda lint e testes em toda PR.
- Privacidade: nunca usar dados reais de alunos em testes, fixtures, prints ou logs.
- Idioma: conversas, specs, planos, backlog e este arquivo em português; código, comentários, testes, scripts, mensagens técnicas, commits e PRs em inglês (Conventional Commits). Texto do app (UI) em português, sem travessão. Detalhes em `.agents/rules/coding-standards.md`.

## 4. Manutenção das skills
- Instaladas pelo CLI e rastreadas em `skills-lock.json`.
- Atualizar: `npx skills update` e depois `node scripts/sync-skills.mjs`.
- Adicionar: `npx skills add <owner/repo> -s <skill> -a universal --copy -y` e depois `node scripts/sync-skills.mjs`; acrescente a skill na tabela de `.agents/rules/workflow.md`.
- Remover: apague `.agents/skills/<nome>`, tire do `skills-lock.json` e rode `node scripts/sync-skills.mjs`.
- Skills que o CLI não instala (copiadas na mão, com referências trazidas para dentro da pasta): registrar origem, commit e licença em `.agents/VENDORED.md`.
- Candidatas para quando a stack for escolhida: `vercel-labs/agent-skills` → `react-best-practices` e `composition-patterns` (se for React), skills do `expo/skills` (se virar app nativo).
