// Shared types for the .gitignore template catalog. Tool-specific.

export type TemplateCategory = 'Languages' | 'Frameworks' | 'Editors/IDEs' | 'OS' | 'Tools';

export interface GitignoreTemplate {
  /** Stable identifier used in the URL hash and as the React key. */
  id: string;
  /** Display name, also used as the `### Name ###` section header. */
  name: string;
  category: TemplateCategory;
  /** Raw ignore-pattern lines (no blank lines, no header). */
  rules: readonly string[];
}

/** Display order for categories in the picker. */
export const CATEGORY_ORDER: readonly TemplateCategory[] = [
  'Languages',
  'Frameworks',
  'Editors/IDEs',
  'OS',
  'Tools',
];
