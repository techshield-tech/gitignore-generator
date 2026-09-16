// .gitignore rules for editors and IDEs. Tool-specific.
// Content is hand-written based on well-known github/gitignore patterns,
// kept accurate but concise (not the full upstream lists).

import type { GitignoreTemplate } from './types';

export const EDITOR_TEMPLATES: readonly GitignoreTemplate[] = [
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Editors/IDEs',
    rules: [
      '.vscode/*',
      '!.vscode/settings.json',
      '!.vscode/tasks.json',
      '!.vscode/launch.json',
      '!.vscode/extensions.json',
      '!.vscode/*.code-snippets',
      '.history/',
      '*.vsix',
    ],
  },
  {
    id: 'jetbrains',
    name: 'JetBrains',
    category: 'Editors/IDEs',
    rules: ['.idea/', '*.iml', '*.iws', '*.ipr', 'out/', '.idea_modules/', 'cmake-build-*/'],
  },
  {
    id: 'vim',
    name: 'Vim',
    category: 'Editors/IDEs',
    rules: ['*.swp', '*.swo', '*.swn', '*~', '.netrwhist', 'Session.vim', '.vim/', 'tags'],
  },
  {
    id: 'emacs',
    name: 'Emacs',
    category: 'Editors/IDEs',
    rules: [
      '*~',
      '\\#*\\#',
      '.\\#*',
      '.emacs.desktop',
      '.emacs.desktop.lock',
      '*.elc',
      'auto-save-list',
      'tramp',
      '.projectile',
      '.dir-locals.el',
    ],
  },
  {
    id: 'sublime',
    name: 'Sublime',
    category: 'Editors/IDEs',
    rules: ['*.sublime-workspace', '*.sublime-project', '.sublime/'],
  },
  {
    id: 'visual-studio',
    name: 'Visual Studio',
    category: 'Editors/IDEs',
    rules: [
      '.vs/',
      '*.suo',
      '*.user',
      '*.userosscache',
      '*.sln.docstates',
      '[Dd]ebug/',
      '[Rr]elease/',
      'x64/',
      'x86/',
      'build/',
      'bld/',
      '[Bb]in/',
      '[Oo]bj/',
      '*.pdb',
    ],
  },
];
