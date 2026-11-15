# Briauna Renee: UGC portfolio

A plain static site with no build step: `index.html`, `styles.css`, `script.js`.
Every spot you need to edit is marked with ✏️ in `index.html`. Search the file for ✏️ to find them.

---

## Your "add my content" day

### 1. Videos (routine slots)
Videos live in `assets/videos/`, cover images in `assets/images/`.

| Slot | Video | Cover |
|---|---|---|
| Morning (7:00 am) | `morning-cleanser.mp4` | `morning-cleanser.jpg` |
| Midday (1:00 pm) | `midday-app.mp4` (not filmed yet) | `midday-app.jpg` |
| Evening (8:30 pm) | `evening-body-butter.mp4` | `evening-body-butter.jpg` |
| Any day | `anyday-flex-disc.mp4` | `anyday-flex-disc.jpg` |
| 3-hook demo | `hook-1.mp4`, `hook-2.mp4`, `hook-3.mp4` (not filmed yet) | `hook-1.jpg` etc. |

The top of the page reuses the morning, evening and any-day videos.
Ask Claude to convert new phone videos. iPhone .mov files are too big; each should be under 8 MB.

### 2. Change the text in a slot
In `index.html`, search for ✏️. Each routine slot has a time, a block name, a title, a product line,
format chips and an "Actually worth it?" card. Quotes in that card must be your real words.

### 3. Your portrait
Save it as `assets/images/portrait.jpg` (portrait shape, about 1000×1250, under 400 KB). It replaces the placeholder automatically.

### 4. Share image
Replace `assets/og-image.jpg` with your own 1200×630 image if you like. This is the preview people see when your link is shared in texts and social apps. A branded placeholder is already there.

### 5. Links and email
- **Email:** search for `✏️ EMAIL` and change it in both places on that line.
- **Socials:** under `✏️ SOCIAL LINKS`. These are already filled in for @briaunarenee and @bybriaunarenee. Click each one to check it.
- **Web address:** at the top of the file, under `✏️ EDIT`, replace `https://briaunarenee.pages.dev` (3 lines) with your real address once you know it.

### 6. Kind words (only when real)
This section is hidden. When a client gives you a quote and permission to use it, search for `✏️ KIND WORDS`, delete the word `hidden`, and fill in the quote, name and brand. Never use made-up quotes.

---

## Deploy on Cloudflare Pages (one-time setup)
1. Create a new GitHub repo, for example `briauna-renee-ugc`, and upload everything in this folder (keep the folder structure).
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Build settings: **Framework preset: None**, **Build command: leave empty**, **Build output directory: `/`**.
4. Click **Save and Deploy**. Cloudflare gives you a `*.pages.dev` address. Add a custom domain later under **Custom domains** if you want one.

After that, every change you push to GitHub (or upload on github.com) goes live by itself in about a minute.

## Folder map
```
index.html          the page (all text and slots)
styles.css          colors, fonts, layout
script.js           videos, filters, copy-email button (no need to edit)
favicon.svg / favicon-32.png / apple-touch-icon.png   "BR" icons
assets/og-image.jpg share preview image
assets/videos/      hero-1..3.mp4, work-1..6.mp4
assets/images/      portrait.jpg (+ optional posters)
```
