// Aggregates the per-category template catalogs into the lookups the tool
// UI and logic need. Tool-specific.

import { LANGUAGE_TEMPLATES } from './languages';
import { FRAMEWORK_TEMPLATES } from './frameworks';
import { EDITOR_TEMPLATES } from './editors';
import { OS_TEMPLATES } from './os';
import { TOOL_TEMPLATES } from './tools';
import type { GitignoreTemplate, TemplateCategory } from './types';

export type { GitignoreTemplate, TemplateCategory } from './types';
export { CATEGORY_ORDER } from './types';

/** Every template, in catalog order. */
export const ALL_TEMPLATES: readonly GitignoreTemplate[] = [
  ...LANGUAGE_TEMPLATES,
  ...FRAMEWORK_TEMPLATES,
  ...EDITOR_TEMPLATES,
  ...OS_TEMPLATES,
  ...TOOL_TEMPLATES,
];

/** Fast id -> template lookup. */
export const TEMPLATES_BY_ID: ReadonlyMap<string, GitignoreTemplate> = new Map(
  ALL_TEMPLATES.map((template) => [template.id, template]),
);

/** Templates grouped by category, in display order. */
export const TEMPLATES_BY_CATEGORY: ReadonlyMap<TemplateCategory, readonly GitignoreTemplate[]> =
  new Map([
    ['Languages', LANGUAGE_TEMPLATES],
    ['Frameworks', FRAMEWORK_TEMPLATES],
    ['Editors/IDEs', EDITOR_TEMPLATES],
    ['OS', OS_TEMPLATES],
    ['Tools', TOOL_TEMPLATES],
  ]);

/** A short, commonly-used subset surfaced as one-click chips. */
export const POPULAR_TEMPLATE_IDS: readonly string[] = [
  'node',
  'python',
  'java',
  'go',
  'react-vite',
  'macos',
  'vscode',
  'docker',
];
