# Dev Store Setup Guide

This guide covers everything needed to get the dev store (`crafters-uk-dev.myshopify.com`) working with full data, so the theme renders the same as the live site.

---

## Quick Start (get unblocked in 10 minutes)

These are the minimum steps to get the theme rendering with navigation and basic structure:

### 1. Create navigation menus

Go to **Shopify Admin > Online Store > Navigation** and create these menus with the same links as the live site:

| Menu handle | Purpose |
|-------------|---------|
| `main-menu` | Primary header navigation |
| `footer-information` | "Useful Information" footer column |
| `footer-company` | "Company" footer column |
| `ctv-nav` | Crafters TV sub-navigation |

### 2. Create essential pages

Go to **Shopify Admin > Online Store > Pages** and create these pages (content can be placeholder for now):

| Page handle | Purpose |
|-------------|---------|
| `club-inspire` | Loyalty program info (linked from header, login, product pages) |
| `crafters-tv` | Crafters TV landing page |
| `delivery-information` | Delivery info (linked from header USPs) |
| `delivery-information-usa-canada` | US/Canada delivery info |
| `email-signup` | Email signup page |
| `privacy-and-cookie-policy` | Privacy policy (linked from cookie bar) |
| `birthday-week-free-shipping` | Promotional page |

### 3. Create blogs

Go to **Shopify Admin > Online Store > Blog posts** and create these blogs:

| Blog handle | Purpose |
|-------------|---------|
| `crafters-tv` | Main Crafters TV content and articles |
| `crafters-tv-schedule` | Broadcast schedule entries |

---

## Full Data Sync (recommended)

For the theme to fully match the live site, sync the following data from the live store (`crafterscompanion.co.uk`). The easiest way is to use **Matrixify** (Shopify app) — install it on both stores, export from live, import to dev.

Alternatively, use **Shopify's built-in CSV export** for products and customers (Admin > Products > Export / Admin > Customers > Export), then import the CSVs on the dev store.

### Products

The theme needs products to populate:
- Collection grids
- Product pages
- Predictive search results
- Featured product sections
- Cart functionality

**Popular products** referenced in search suggestions (these handles must exist):
- `crafters-companion-e-gift-card`
- `gemini-ii-die-cutting-and-embossing-machine`
- `crafters-companion-springtime-collection`
- `violet-studio-8x8-paper-pack-hoppy-easter-30pk`
- `crafters-companion-colour-creation-powder-8pc`
- `crafters-companion-duet-inkpad-sweet-pea`
- `crafters-companion-glitter-paste-fairy-dress`
- `crafters-companion-glitter-sunkissed-blossom`
- `crafters-companion-luxury-gilding-flakes-soft-rose-1pc-50ml`
- `crafters-companion-pearls-sunshine-drops`
- `crafters-companion-sequins-soft-petals`
- `crafters-companion-shimmer-spray-dancing-green`
- `crafters-companion-shimmer-spray-rose-bud`

### Collections

Key collections that are referenced in theme settings and section configs:

| Collection handle | Used for |
|-------------------|----------|
| `outlet-sale` | Header promo, clearance links (referenced 20+ times) |
| `bundle-deals` | Header promo blocks |
| `new-in-papercraft-and-art` | Featured collections |
| `die-cutting` | Featured collections |
| `card-making` | Featured collections |
| `all` | Fallback collection |

Plus all brand, seasonal, and craft-type collections used in template JSON files. A full product/collection sync via Matrixify will cover these automatically.

### Images and media

The theme references 100+ images stored in Shopify's file system. These include:
- Logo and favicon (configured in theme settings)
- Header promo block images
- USP icons (`icon-discount.svg`, `icon-delivery.svg`)
- Customer login/register background images
- Collection hero banner images (stored in collection metafields)

**To sync:** Export files from the live store via **Shopify Admin > Settings > Files** and upload them to the dev store. Matrixify can also handle file migration.

---

## Metafields and Metaobjects

The theme uses metafields extensively. Without these, product badges, brand content, and CTV features won't render.

### Product metafields

| Namespace | Key | Purpose |
|-----------|-----|---------|
| `reviews` | `rating`, `rating_count`, `author`, `body` | Product reviews (JSON-LD) |
| `custom` | `parent_brand` | Brand association |
| `custom` | `features` | Product feature list |
| `custom` | `experience_level` | Skill level badge |
| `custom` | `crafters_tv_video` | Associated CTV video |
| `custom` | `external_video` | External video URL |
| `custom` | `key_features` | Key features list |
| `custom` | `product_card_image` | Custom card image |
| `brand` | `content_points_header`, `content_points`, `content_sections`, `parent_brand` | Brand content sections |

### Collection metafields

| Namespace | Key | Purpose |
|-----------|-----|---------|
| `custom` | `brand` | Brand metaobject reference |
| `custom` | `hero_banner_image` | Collection hero image |
| `custom` | `primary_color`, `secondary_color` | Theme colours per collection |
| `custom` | `quick_collection_cards` | Quick links card data |
| `custom` | `hide_newsletter_section` | Toggle newsletter visibility |
| `custom` | `linked_ctv_article_url`, `linked_ctv_collection` | CTV links |
| `custom` | `excluded_filters` | Filter exclusions |
| `promotion` | `text`, `terms`, `lozenge_text` | Promotional content |
| `filter` | `seo_overrides` | SEO metadata by tag |
| `filters` | `allow_list`, `disallow_list` | Filter control |

### Article metafields

| Namespace | Key | Purpose |
|-----------|-----|---------|
| `custom` | `craft_area` | Craft category |
| `custom` | `author` | Author info |
| `custom` | `video_id` | YouTube video ID |
| `custom` | `start_time`, `end_time` | Broadcast times |
| `custom` | `shop_the_day_collection`, `shop_the_show_collection` | Associated collections |

### Shop-level metafields

| Namespace | Key | Purpose |
|-----------|-----|---------|
| `swym` | `app`, `pid` | Wishlist app configuration |
| `filters` | `allow_list`, `disallow_list` | Global filter settings |
| `ctv` | `live_show` | Current live show data |

### Metaobjects

| Type | Purpose |
|------|---------|
| `lozenge_types` | Custom product badge definitions (sale, new, offer, etc.) |
| Brand metaobjects | Brand pages with logo, description, linked collections |

**To sync metafield definitions:** Use `shopify theme metafields pull` to export definitions from the live store, or use Matrixify.

---

## Apps and Integrations

These apps need to be installed on the dev store for their features to work. Install them as you get to testing those features — they're not needed for basic theme development.

| App | Purpose | Priority |
|-----|---------|----------|
| **Swym Wishlist** | Wishlist/save for later | High — visible in header |
| **Yotpo Loyalty** | Loyalty program, points, tiers | Medium — customer account feature |
| **Klaviyo** | Email signup forms | Medium — newsletter sections |
| **AIOD (All Automatic Discount)** | Volume/bundle discounts | Low — only affects cart |
| **Clearpay** | Payment messaging on product pages | Low — only affects PDP |
| **Restock Rooster** | Back-in-stock notifications | Low |
| **SellEasy** | Multi-channel selling | Low |

---

## Theme Settings

Most theme settings are stored in `config/settings_data.json` and come through Git automatically. However, some settings reference store-specific resources (collection IDs, page URLs) that may not resolve on the dev store until the data above has been synced.

After syncing data, you may need to re-assign some settings in the theme editor:
- Header menu assignment
- Footer menu assignments
- Featured collection selections
- Logo and favicon images
- USP icon images

---

## What you can skip

These don't affect theme development and can be ignored on the dev store:

- **Google Tag Manager / Hotjar** — analytics, not needed for dev
- **Social media links** — footer links to Facebook, Instagram, etc.
- **Company legal info** — VAT number, company registration, address in footer
- **Customer order history** — only visible on live customer accounts
- **Payment gateway configuration** — use Shopify's test gateway for dev
