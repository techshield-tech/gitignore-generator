import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, CopyButton, Panel, TextArea, Toolbar } from '../shell/ui';
import { buildGitignore } from './gitignore-builder';
import {
  CATEGORY_ORDER,
  POPULAR_TEMPLATE_IDS,
  TEMPLATES_BY_CATEGORY,
  TEMPLATES_BY_ID,
  type GitignoreTemplate,
} from './templates';
import { buildHashFromSelection, idsEqual, parseSelectionFromHash } from './url-hash';

function readSelectionFromLocation(): string[] {
  return parseSelectionFromHash(window.location.hash).filter((id) => TEMPLATES_BY_ID.has(id));
}

export function Tool() {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => readSelectionFromLocation());
  const [search, setSearch] = useState('');
  const [customText, setCustomText] = useState('');

  // Push the current selection into the URL hash whenever it changes locally.
  useEffect(() => {
    const nextHash = buildHashFromSelection(selectedIds);
    const currentHash = window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : window.location.hash;
    if (nextHash === currentHash) return;
    if (nextHash === '') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = nextHash;
    }
  }, [selectedIds]);

  // Pick up hash changes that didn't originate from this component (back/forward, pasted link).
  useEffect(() => {
    function handleHashChange() {
      const ids = readSelectionFromLocation();
      setSelectedIds((prev) => (idsEqual(prev, ids) ? prev : ids));
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTemplate = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id],
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const selectedTemplates = useMemo<GitignoreTemplate[]>(
    () =>
      selectedIds
        .map((id) => TEMPLATES_BY_ID.get(id))
        .filter((template): template is GitignoreTemplate => template !== undefined),
    [selectedIds],
  );

  const output = useMemo(
    () => buildGitignore(selectedTemplates, customText),
    [selectedTemplates, customText],
  );

  const normalizedSearch = search.trim().toLowerCase();

  const visibleCategories = useMemo(() => {
    return CATEGORY_ORDER.map((category) => {
      const templates = TEMPLATES_BY_CATEGORY.get(category) ?? [];
      const filtered = normalizedSearch
        ? templates.filter((template) => template.name.toLowerCase().includes(normalizedSearch))
        : templates;
      return { category, templates: filtered };
    }).filter((group) => group.templates.length > 0);
  }, [normalizedSearch]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '.gitignore';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <div className="flex flex-col gap-4">
      <Toolbar>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search templates…"
          aria-label="Search templates"
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-panel)] px-2 py-1.5 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-accent)] sm:w-64"
        />
        <Button variant="ghost" onClick={clearSelection} disabled={selectedIds.length === 0}>
          Clear selection
        </Button>
      </Toolbar>

      <Toolbar>
        {POPULAR_TEMPLATE_IDS.map((id) => {
          const template = TEMPLATES_BY_ID.get(id);
          if (!template) return null;
          const active = selectedIds.includes(id);
          return (
            <Button
              key={id}
              variant={active ? 'primary' : 'secondary'}
              onClick={() => toggleTemplate(id)}
              aria-pressed={active}
            >
              {template.name}
            </Button>
          );
        })}
      </Toolbar>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel
          title="Templates"
          actions={
            <span className="text-xs text-[var(--color-muted)]">{selectedIds.length} selected</span>
          }
        >
          <div className="flex max-h-[480px] flex-col gap-4 overflow-y-auto pr-1">
            {visibleCategories.length === 0 && (
              <p className="text-sm text-[var(--color-muted)]">No templates match “{search}”.</p>
            )}
            {visibleCategories.map(({ category, templates }) => (
              <div key={category} className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  {category}
                </h3>
                <div className="flex flex-col">
                  {templates.map((template) => (
                    <label
                      key={template.id}
                      className="flex items-center gap-2 rounded px-1.5 py-1 text-sm text-[var(--color-fg)] hover:bg-[var(--color-panel)]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(template.id)}
                        onChange={() => toggleTemplate(template.id)}
                      />
                      {template.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Custom rules">
            <TextArea
              aria-label="Custom rules"
              value={customText}
              onChange={(event) => setCustomText(event.target.value)}
              placeholder="Extra patterns to append, one per line…"
              className="min-h-[100px]"
            />
          </Panel>

          <Panel
            title="Output"
            className="flex-1"
            actions={
              <>
                <CopyButton getText={() => output} />
                <Button variant="secondary" onClick={handleDownload} disabled={output === ''}>
                  Download
                </Button>
              </>
            }
          >
            <TextArea
              aria-label=".gitignore output"
              value={output}
              readOnly
              placeholder="Select templates to generate a .gitignore…"
              className="min-h-[280px]"
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}
