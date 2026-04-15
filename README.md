# Crafters Companion Theme

## Getting Started

Follow the setup for your operating system, then move on to "Authenticate with Shopify".

---

### Mac Setup

#### Step 1: Install Homebrew

Open **Terminal** and paste:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. When it finishes, close and reopen Terminal.

#### Step 2: Install Node.js

```bash
brew install node
```

Verify it's installed (you need v20.10.0 or later):

```bash
node --version
```

#### Step 3: Install Shopify CLI

```bash
npm install -g @shopify/cli
```

Verify it's installed:

```bash
shopify version
```

#### Step 4: Clone the repo

```bash
cd ~/Documents
git clone https://github.com/outrankagency/crafters-companion-refresh.git
cd crafters-companion-refresh
```

You're ready — skip to **Authenticate with Shopify** below.

---

### Windows Setup (using WSL)

We use WSL (Windows Subsystem for Linux) so that everyone has a consistent terminal environment. You need Windows 10 (Build 19041+) or Windows 11.

#### Step 1: Install WSL

Open **PowerShell as Administrator** (right-click > Run as administrator) and run:

```powershell
wsl --install
```

If WSL is already partially installed and that just shows help text, run:

```powershell
wsl --install -d Ubuntu
```

Restart your laptop when prompted. After restart, **Ubuntu** will open automatically — create a username and password when asked.

From now on, **always use the Ubuntu terminal** for this project (search "Ubuntu" in the Start menu).

#### Step 2: Install dependencies for Homebrew

Inside the Ubuntu terminal, run:

```bash
sudo apt-get update && sudo apt-get install -y build-essential procps curl file git
```

#### Step 3: Install Homebrew

Still inside the Ubuntu terminal, paste:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

When it finishes, it will print some commands under **"Next steps"** — you must run those to add Homebrew to your PATH. They will look something like:

```bash
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"
```

Verify Homebrew is working:

```bash
brew --version
```

#### Step 4: Install Node.js

```bash
brew install node
```

Verify it's installed (you need v20.10.0 or later):

```bash
node --version
```

#### Step 5: Install Shopify CLI

```bash
npm install -g @shopify/cli
```

Verify it's installed:

```bash
shopify version
```

#### Step 6: Clone the repo

**Important:** Clone into the WSL filesystem (your home directory), NOT the Windows side (`/mnt/c/...`). Running from the Windows mount is much slower and causes issues with file watching.

```bash
cd ~
git clone https://github.com/outrankagency/crafters-companion-refresh.git
cd crafters-companion-refresh
```

#### Step 7: Set up VS Code (optional but recommended)

1. Make sure VS Code is installed on Windows (not inside WSL)
2. Open VS Code and install the **WSL** extension (by Microsoft) from the Extensions tab
3. From the Ubuntu terminal, open the project:

```bash
cd ~/crafters-companion-refresh
code .
```

The first time you do this, VS Code will install a server component inside WSL — this takes a moment. After that, you'll be editing in VS Code on Windows while all terminal commands run through WSL.

> **Tip:** If `code .` opens a regular Windows window instead of a WSL window, open VS Code manually and use the command palette (`Ctrl+Shift+P`) > **WSL: Reopen Folder in WSL**.

---

## Authenticate with Shopify

You need to do this once per machine:

```bash
shopify auth login
```

This will open a browser window. Log in with the Shopify account that has access to the dev store. The store is already configured in the `npm run dev` script, so you won't need to specify it each time.

---

## Available Scripts

### `npm run dev`

Starts a local development server with live reload.

1. Run `npm run dev` from the project root
2. Your browser will automatically open to the local preview URL
3. Any changes you save to theme files (Liquid, CSS, JS) will hot-reload in the browser
4. Press `Ctrl+C` to stop the server

This creates a temporary **development theme** on the store. It does not affect the live/published theme and is only visible to you.

### `npm run pull`

Downloads the latest version of the theme from Shopify into your local files.

1. Run `npm run pull`
2. Select the theme you want to pull from (if prompted)
3. Your local files will be updated with the remote theme's contents

Useful if someone has made changes directly in the Shopify theme editor and you need to sync those changes locally.

### `npm run check`

Runs Shopify's theme linter to catch errors and best-practice issues.

1. Run `npm run check`
2. Review the output for any warnings or errors
3. Fix any issues flagged before committing

---

## Deployment Workflow

**Important: Do NOT use `shopify theme push` directly.**

This theme is connected to GitHub via Shopify's "Link theme to GitHub repo" feature. Deployments happen automatically when changes are merged into the `main` branch.

### How to make changes

1. Make sure you're on the latest `main`:
   ```bash
   git checkout main
   git pull
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Run the dev server to preview your changes:
   ```bash
   npm run dev
   ```

4. When you're happy, commit and push:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin feature/your-feature-name
   ```

5. Open a **Pull Request** on GitHub to merge into `main`

6. Once the PR is reviewed and merged, Shopify will automatically deploy the changes to the live theme

### Why not `shopify theme push`?

`shopify theme push` uploads files directly to Shopify via their API, completely bypassing Git. This means:

- Changes won't be tracked in version control
- It can overwrite work that was deployed via GitHub
- Other team members won't see what changed or why
- It breaks the single source of truth (the `main` branch)

If you need to test something before merging, use `npm run dev` — it creates a safe, temporary preview theme.

---

## Development Guidelines

Follow these rules when building new sections, blocks, or snippets for this theme.

### CSS and JavaScript

Use `{% stylesheet %}` and `{% javascript %}` tags inside your section, block, or snippet files. Do not create new CSS or JS files in the `assets/` folder.

```liquid
{% stylesheet %}
  .my-section {
    display: grid;
    gap: 2rem;
  }
{% endstylesheet %}

{% javascript %}
  document.querySelectorAll('.my-section').forEach(el => {
    // your JS here
  });
{% endjavascript %}
```

**Important:**
- You cannot use Liquid variables inside `{% stylesheet %}` or `{% javascript %}` tags
- For dynamic styles that need Liquid variables (e.g. colours from settings), use an inline `<style>` block instead:

```liquid
<style>
  #shopify-section-{{ section.id }} .banner {
    background-color: {{ section.settings.bg_color }};
  }
</style>
```

- Each file can only have **one** `{% stylesheet %}` and **one** `{% javascript %}` tag
- Use CSS variables for single-property settings (e.g. `--gap: {{ section.settings.gap }}px`)

### Images

Always use the modern `image_url` and `image_tag` filters. Never use the deprecated `img_url`.

```liquid
<!-- Good -->
{{ product.featured_image | image_url: width: 800 | image_tag }}

<!-- Bad -->
<img src="{{ product.featured_image | img_url: '800x' }}">
```

### Translations

All user-facing text must use the `| t` translation filter. Add new keys to `locales/en.default.json`.

```liquid
<!-- Good -->
<h2>{{ 'sections.my_section.heading' | t }}</h2>
<button>{{ 'products.product.add_to_cart' | t }}</button>

<!-- Bad -->
<h2>Featured Products</h2>
<button>Add to Basket</button>
```

### Snippets

Every snippet must have a `{% doc %}` tag at the top documenting what it does and what parameters it accepts.

```liquid
{% doc %}
  Renders a product card with image, title, and price.

  @param {product} product - The product to display
  @param {boolean} [show_price] - Whether to show the price

  @example
  {% render 'product-card', product: product, show_price: true %}
{% enddoc %}
```

### Sections

When creating new sections:

- Use `{% content_for 'blocks' %}` with `"blocks": [{ "type": "@theme" }]` in the schema to allow any theme block to be added
- Add `{{ block.shopify_attributes }}` to every block's container element (enables the theme editor to select blocks)
- Include `"presets"` in the schema so the section appears in the theme editor's "Add section" menu
- Use `enabled_on` or `disabled_on` in the schema to control which page types the section can be used on

```liquid
<div class="my-section">
  {% content_for 'blocks' %}
</div>

{% schema %}
{
  "name": "My section",
  "blocks": [{ "type": "@theme" }],
  "presets": [{ "name": "My section" }]
}
{% endschema %}
```

### Scripts

Never use the `script_tag` filter — it is parser-blocking. Use a `<script>` tag with `defer` instead:

```liquid
<!-- Good -->
<script src="{{ 'my-script.js' | asset_url }}" defer></script>

<!-- Bad -->
{{ 'my-script.js' | asset_url | script_tag }}
```

### Accessibility

- All `<img>` tags must have an `alt` attribute
- Interactive elements (buttons, links) must have accessible labels
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<details>`, `<summary>`)
- The theme includes a skip-to-content link — do not remove it
