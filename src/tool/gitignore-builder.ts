// Pure, framework-free logic that merges selected templates (plus custom
// user rules) into the final .gitignore text. Tool-specific.

import type { GitignoreTemplate } from './templates';

/**
 * Builds the merged .gitignore output.
 *
 * Each template becomes a `### Name ###` section listing only the lines
 * that have not already appeared in an earlier section (case-sensitive,
 * exact-line match, matching how gitignore rules are compared). Sections
 * that end up with no unique lines are omitted entirely, including their
 * header. `customText` (if non-blank after trimming) becomes a final
 * `### Custom ###` section, following the same de-duplication rule.
 */
export function buildGitignore(selected: readonly GitignoreTemplate[], customText: string): string {
  const seen = new Set<string>();
  const sections: string[] = [];

  function appendSection(name: string, rawLines: readonly string[]): void {
    const uniqueLines: string[] = [];
    for (const rawLine of rawLines) {
      const line = rawLine.trim();
      if (line === '' || seen.has(line)) continue;
      seen.add(line);
      uniqueLines.push(line);
    }
    if (uniqueLines.length === 0) return;
    sections.push(`### ${name} ###\n${uniqueLines.join('\n')}`);
  }

  for (const template of selected) {
    appendSection(template.name, template.rules);
  }

  appendSection('Custom', customText.split('\n'));

  return sections.length === 0 ? '' : `${sections.join('\n\n')}\n`;
}
