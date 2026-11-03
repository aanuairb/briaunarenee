# Briauna Renee: UGC portfolio

A plain static site with no build step: `index.html`, `styles.css`, `script.js`.
Every spot you need to edit is marked with ✏️ in `index.html`. Search the file for ✏️ to find them.

---

## Your "add my content" day

### 1. Videos (just drop them in)
Put your files in `assets/videos/` with these exact names:

| File name | Where it shows |
|---|---|
| `hero-1.mp4` | Hero, left frame |
| `hero-2.mp4` | Hero, middle (raised) frame |
| `hero-3.mp4` | Hero, right frame |
| `work-1.mp4` to `work-6.mp4` | Selected work cards, in order |

That's all. Each placeholder is replaced automatically once its file exists.
Hero videos and work videos autoplay muted and loop while on screen. Tapping a video plays it with sound.

**Video tips**
- Vertical 9:16, MP4 (H.264), ideally **under 8 MB each**. CapCut's "1080p, recommended" export works well.
- Keep clips short. A 10–20 second cut works best for the hero.
- Cloudflare Pages has a **25 MB limit per file**.

### 2. Change the text on each work card
In `index.html`, find `✏️ WORK SLOT 1` through `WORK SLOT 6`. On each one, change:
- the **title** `<h3>…</h3>`
- the **one-line description** `<p>…</p>`
- the **format chips** `<li>…</li>`
- `data-category`: one of `skin`, `body`, `hair`, `life`, `tech` (used by the filter buttons)
- For paid work, change the tag to `<span class="tag client">Client project</span>`

To add a 7th or 8th video, copy a whole `<article> … </article>` block, paste it below, and name the video `work-7.mp4`.
To remove one, delete its whole block.

Optional cover image (shown before a video loads): add `data-poster="assets/images/work-1.jpg"` next to `data-video`.

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
