import { strict as assert } from 'node:assert';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { RuleTester } from 'eslint';
import maxFileLines from '../eslint-rules/max-file-lines.cjs';

const repoRoot = join(import.meta.dirname, '..');
const hook = join(repoRoot, '.agents', 'hooks', 'session-start.mjs');
const sync = join(repoRoot, 'scripts', 'sync-skills.mjs');

const writeFile = (path, content) => {
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, content);
};

describe('agent tooling', () => {
  let root;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'agent-tooling-'));
    writeFile(join(root, '.agents/rules/active.md'), '---\ntrigger: always_on\ndescription: Active rule.\n---\n\nACTIVE_RULE_BODY\n');
    writeFile(join(root, '.agents/rules/manual.md'), '---\ntrigger: manual\ndescription: Manual rule.\n---\n\nMANUAL_RULE_BODY\n');
    writeFile(join(root, '.agents/skills/alpha/SKILL.md'), '---\nname: alpha\ndescription: Alpha skill description.\n---\n\nAlpha body\n');
    writeFile(
      join(root, '.agents/skills/using-superpowers/SKILL.md'),
      '---\nname: using-superpowers\ndescription: Meta.\n---\n\nUSING_SUPERPOWERS_BODY\n',
    );
    writeFile(join(root, '.agents/skills/not-a-skill/README.md'), 'no SKILL.md here\n');
  });

  afterEach(() => rmSync(root, { recursive: true, force: true }));

  it('session start hook prints always-on rules, the skill index and using-superpowers', () => {
    const output = execFileSync('node', [hook], { env: { ...process.env, SESSION_START_ROOT: root }, encoding: 'utf8' });
    assert.match(output, /ACTIVE_RULE_BODY/);
    assert.doesNotMatch(output, /MANUAL_RULE_BODY/);
    assert.doesNotMatch(output, /trigger: always_on/);
    assert.match(output, /- alpha: Alpha skill description\./);
    assert.doesNotMatch(output, /not-a-skill/);
    assert.match(output, /USING_SUPERPOWERS_BODY/);
  });

  it('sync-skills mirrors skill folders and removes stale ones', () => {
    writeFile(join(root, '.claude/skills/stale/SKILL.md'), 'stale\n');
    writeFile(join(root, '.claude/skills/alpha/old-file.md'), 'removed upstream\n');
    execFileSync('node', [sync], { env: { ...process.env, SYNC_SKILLS_ROOT: root }, encoding: 'utf8' });
    assert.equal(
      readFileSync(join(root, '.claude/skills/alpha/SKILL.md'), 'utf8'),
      readFileSync(join(root, '.agents/skills/alpha/SKILL.md'), 'utf8'),
    );
    assert.equal(existsSync(join(root, '.claude/skills/alpha/old-file.md')), false);
    assert.equal(existsSync(join(root, '.claude/skills/stale')), false);
    assert.equal(existsSync(join(root, '.claude/skills/not-a-skill')), false);
  });
});

describe('max-file-lines rule', () => {
  it('reports files above the code-line budget and ignores comment lines', () => {
    new RuleTester().run('max-file-lines', maxFileLines, {
      valid: [{ code: '// comment\n// comment\nconst a = 1;\nconst b = 2;', options: [{ max: 2 }] }],
      invalid: [{ code: 'const a = 1;\nconst b = 2;\nconst c = 3;', options: [{ max: 2 }], errors: [{ messageId: 'tooLong' }] }],
    });
  });
});
