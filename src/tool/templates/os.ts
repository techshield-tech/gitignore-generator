// .gitignore rules for operating systems. Tool-specific.
// Content is hand-written based on well-known github/gitignore patterns,
// kept accurate but concise (not the full upstream lists).

import type { GitignoreTemplate } from './types';

export const OS_TEMPLATES: readonly GitignoreTemplate[] = [
  {
    id: 'macos',
    name: 'macOS',
    category: 'OS',
    rules: [
      '.DS_Store',
      '.AppleDouble',
      '.LSOverride',
      '._*',
      '.DocumentRevisions-V100',
      '.fseventsd',
      '.Spotlight-V100',
      '.TemporaryItems',
      '.Trashes',
      '.VolumeIcon.icns',
      '.com.apple.timemachine.donotpresent',
      '.AppleDB',
      '.AppleDesktop',
      'Network Trash Folder',
      'Temporary Items',
      '.apdisk',
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    category: 'OS',
    rules: [
      'Thumbs.db',
      'Thumbs.db:encryptable',
      'ehthumbs.db',
      'ehthumbs_vista.db',
      '*.stackdump',
      'Desktop.ini',
      '$RECYCLE.BIN/',
      '*.cab',
      '*.msi',
      '*.msix',
      '*.msm',
      '*.msp',
      '*.lnk',
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'OS',
    rules: ['*~', '.fuse_hidden*', '.directory', '.Trash-*', '.nfs*'],
  },
];
