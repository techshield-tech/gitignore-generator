// .gitignore rules for miscellaneous tools and file types. Tool-specific.
// Content is hand-written based on well-known github/gitignore patterns,
// kept accurate but concise (not the full upstream lists).

import type { GitignoreTemplate } from './types';

export const TOOL_TEMPLATES: readonly GitignoreTemplate[] = [
  {
    id: 'docker',
    name: 'Docker',
    category: 'Tools',
    rules: ['.docker/', 'docker-compose.override.yml', 'docker-compose.*.local.yml'],
  },
  {
    id: 'env',
    name: 'Env files/secrets',
    category: 'Tools',
    rules: [
      '.env',
      '.env.*',
      '!.env.example',
      '!.env.sample',
      '*.pem',
      '*.key',
      '*.p12',
      '*.pfx',
      'secrets.yml',
      'secrets.yaml',
      'credentials.json',
    ],
  },
  {
    id: 'logs',
    name: 'Logs',
    category: 'Tools',
    rules: [
      '*.log',
      'logs/',
      'log/',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
    ],
  },
  {
    id: 'archives',
    name: 'Archives',
    category: 'Tools',
    rules: ['*.zip', '*.tar', '*.tar.gz', '*.tgz', '*.tar.bz2', '*.rar', '*.7z', '*.gz', '*.bz2'],
  },
  {
    id: 'bun',
    name: 'Bun',
    category: 'Tools',
    rules: ['.bun/', 'bun-debug.log*'],
  },
  {
    id: 'yarn-berry',
    name: 'Yarn Berry',
    category: 'Tools',
    rules: [
      '.yarn/*',
      '!.yarn/patches',
      '!.yarn/plugins',
      '!.yarn/releases',
      '!.yarn/sdks',
      '!.yarn/versions',
      '.pnp.*',
    ],
  },
  {
    id: 'pnpm',
    name: 'pnpm',
    category: 'Tools',
    rules: ['.pnpm-store/', '.pnpm-debug.log*'],
  },
];
