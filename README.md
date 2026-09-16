# Gitignore Generator

Generate a `.gitignore` file from languages, frameworks, editors, OSes, and
tools — fast, free, and 100% client-side. Nothing is ever sent over the
network; everything runs in your browser.

**Live:** https://techshield-tech.github.io/gitignore-generator/

Part of [MMOALL Developer Tools](https://mmoall.com/tools).
Also available at [mmoall.com/tools/gitignore-generator](https://mmoall.com/tools/gitignore-generator).

## Features

- Searchable multi-select picker covering:
  - **Languages** — Node, Python, Java, Go, Rust, C/C++, C#/.NET, PHP, Ruby,
    Swift, Kotlin, Dart/Flutter, Elixir, Scala, R.
  - **Frameworks** — React/Vite, Next.js, Nuxt, Angular, Django, Laravel,
    Rails, Spring Boot, Unity, Unreal, Android, iOS/Xcode, Terraform,
    Serverless, Jupyter.
  - **Editors/IDEs** — VS Code, JetBrains, Vim, Emacs, Sublime, Visual
    Studio.
  - **OS** — macOS, Windows, Linux.
  - **Tools** — Docker, Env files/secrets, Logs, Archives, Bun, Yarn Berry,
    pnpm.
- "Popular" one-click chips for the most commonly combined templates (Node,
  Python, Java, Go, React/Vite, macOS, VS Code, Docker).
- Selected templates are merged into one output, each under its own
  `### Name ###` section header, in the order you selected them.
- Duplicate lines are removed automatically — if a rule already appeared in
  an earlier section, it isn't repeated later.
- A custom rules textarea, appended at the end under `### Custom ###`.
- Copy output to clipboard, or download it directly as `.gitignore`.
- The selection is reflected in the URL hash (e.g.
  `#node,macos,vscode`), kept in sync in both directions — load a link with
  a hash to pre-select those templates, or share your current selection by
  copying the URL.
- Responsive down to 360px viewport width.

## Embedding

This tool can be embedded in an iframe, e.g. on mmoall.com. In embed mode it
renders only the tool itself (no header/footer) on a transparent background.

```html
<iframe
  id="gitignore-generator"
  src="https://techshield-tech.github.io/gitignore-generator/?embed=1&theme=dark"
  style="width: 100%; border: 0;"
  title="Gitignore Generator"
></iframe>

<script>
  const iframe = document.getElementById('gitignore-generator');

  // Resize the iframe to fit its content.
  window.addEventListener('message', (event) => {
    const data = event.data;
    if (data && data.type === 'mmoall-tool:height' && data.slug === 'gitignore-generator') {
      iframe.style.height = `${data.height}px`;
    }
    if (data && data.type === 'mmoall-tool:ready' && data.slug === 'gitignore-generator') {
      // The tool has mounted and is ready.
    }
  });

  // Push a theme change into the iframe (only accepted from an allowed origin).
  iframe.contentWindow.postMessage({ type: 'mmoall-tool:theme', theme: 'dark' }, '*');
</script>
```

### Contract

- `?embed=1` in the URL renders only the tool (no chrome), transparent
  background.
- `?theme=light` / `?theme=dark` sets the initial theme; otherwise it follows
  `prefers-color-scheme`.
- The page listens for `window.postMessage({type:'mmoall-tool:theme', theme})`
  from the parent frame to change theme at runtime. Only messages whose
  `event.origin` is `https://mmoall.com`, `https://www.mmoall.com`, or
  `http://localhost:3000` are accepted.
- On mount (embed mode only), the page posts
  `{type:'mmoall-tool:ready', slug:'gitignore-generator'}` to `window.parent`.
- Whenever its rendered height changes (embed mode only), the page posts
  `{type:'mmoall-tool:height', slug:'gitignore-generator', height}` to
  `window.parent`.

## Local development

```bash
bun install
bun dev
```

Build for production:

```bash
bun run build
```

Deployment to GitHub Pages happens automatically via
`.github/workflows/deploy.yml` on every push to `main`.

## License

MIT — see [LICENSE](./LICENSE).
