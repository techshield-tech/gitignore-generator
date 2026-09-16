// Pure, framework-free helpers for reading/writing the selected-template
// list from the URL hash (`#node,macos,vscode`), so a selection is
// shareable via plain link. Tool-specific.

/** Parses a comma-separated id list out of a URL hash (with or without the leading `#`). */
export function parseSelectionFromHash(hash: string): string[] {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  if (raw.trim() === '') return [];
  return raw
    .split(',')
    .map((id) => decodeURIComponent(id.trim()))
    .filter((id) => id !== '');
}

/** Builds the hash fragment (without the leading `#`) for a list of selected ids. */
export function buildHashFromSelection(ids: readonly string[]): string {
  return ids.map((id) => encodeURIComponent(id)).join(',');
}

/** Shallow order-sensitive equality check for two id lists. */
export function idsEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}
