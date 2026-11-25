// Mirrors .agents/skills (source of truth) into .claude/skills (read by Claude Code).
// Every folder holding a SKILL.md is copied; anything in .claude/skills without a source skill is removed.
// Usage: node scripts/sync-skills.mjs
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.env.SYNC_SKILLS_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '.agents', 'skills');
const dst = join(root, '.claude', 'skills');

if (!existsSync(src)) {
  console.error(`ERROR sync-skills: ${src} does not exist`);
  process.exit(1);
}

const skills = readdirSync(src, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(src, entry.name, 'SKILL.md')))
  .map((entry) => entry.name);
const wanted = new Set(skills);

mkdirSync(dst, { recursive: true });
for (const name of readdirSync(dst)) {
  if (!wanted.has(name)) rmSync(join(dst, name), { recursive: true, force: true });
}
for (const name of skills) {
  // Replace instead of merging so files deleted upstream do not linger in the mirror.
  rmSync(join(dst, name), { recursive: true, force: true });
  cpSync(join(src, name), join(dst, name), { recursive: true });
}
console.log(`INFO sync-skills: ${skills.length} skills mirrored into .claude/skills`);
