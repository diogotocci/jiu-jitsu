// SessionStart hook (Claude Code): injects the always-on rules, the project skill index and the using-superpowers skill.
// Whatever this script prints on stdout becomes additional session context.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.env.SESSION_START_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const skillsDir = join(root, '.agents', 'skills');
const rulesDir = join(root, '.agents', 'rules');

const frontMatterOf = (md) => md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

const descriptionOf = (md) => {
  const frontMatter = frontMatterOf(md);
  if (!frontMatter) return '';
  const match = frontMatter[1].match(/^description:\s*(>-?|\|-?)?\s*([\s\S]*?)(?=^\w[\w-]*:|$(?![\s\S]))/m);
  return match
    ? match[2]
        .replace(/\s+/g, ' ')
        .replace(/^["']|["']$/g, '')
        .trim()
    : '';
};

const markdownFiles = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((name) => name.endsWith('.md'))
        .sort()
    : [];

/** Rules with `trigger: always_on` in their front matter are injected in full, without the front matter. */
const alwaysOnRules = () =>
  markdownFiles(rulesDir)
    .map((name) => ({ name, md: readFileSync(join(rulesDir, name), 'utf8') }))
    .filter(({ md }) => /^trigger:\s*always_on\s*$/m.test(frontMatterOf(md)?.[1] ?? ''))
    .map(({ name, md }) => `### .agents/rules/${name}\n${md.replace(frontMatterOf(md)?.[0] ?? '', '').trim()}`);

const skillIndex = () =>
  existsSync(skillsDir)
    ? readdirSync(skillsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(join(skillsDir, entry.name, 'SKILL.md')))
        .map((entry) => entry.name)
        .sort()
        .map((name) => `- ${name}: ${descriptionOf(readFileSync(join(skillsDir, name, 'SKILL.md'), 'utf8')).slice(0, 220)}`)
    : [];

const usingSuperpowersFile = join(skillsDir, 'using-superpowers', 'SKILL.md');
const usingSuperpowers = existsSync(usingSuperpowersFile)
  ? `\n## using-superpowers skill\n${readFileSync(usingSuperpowersFile, 'utf8')}`
  : '';

process.stdout.write(
  `<EXTREMELY_IMPORTANT>
This project has skills in .agents/skills (mirrored in .claude/skills). Use them without waiting to be asked, following .agents/rules/workflow.md.
AGENTS.md and the rules below take precedence over any skill.

## Always-on rules
${alwaysOnRules().join('\n\n')}

## Available skills
${skillIndex().join('\n')}
${usingSuperpowers}
</EXTREMELY_IMPORTANT>
`,
);
