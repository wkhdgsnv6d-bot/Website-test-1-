# Acacia Kitchens — Website

A complete, production-ready website for **Acacia Kitchens**, cabinet makers in
Aitkenvale, Townsville.

It is built as a plain static site: hand-written HTML, one CSS file and one
JavaScript file. There is no build step, no framework and no database. If you
can edit a text file, you can edit this website.

---

## 1. What's in the box

```
/
├── index.html               Home
├── about.html               About
├── services.html            All 17 services
├── projects.html            Portfolio + project detail
├── process.html             7-step process + FAQs
├── awards.html              Awards
├── testimonials.html        Reviews
├── contact.html             Contact details + map + short form
├── quote.html               Full quote request form
├── thank-you.html           Shown after a form is submitted
├── 404.html                 Page-not-found
├── privacy-policy.html      Privacy Policy (template)
├── terms-conditions.html    Terms & Conditions (template)
├── robots.txt               Search engine instructions
├── sitemap.xml              Page list for search engines
├── assets/
│   ├── css/styles.css       All styling
│   ├── js/main.js           All interactivity
│   └── img/                 All imagery
│       ├── brand/           Favicon + logo placeholder
│       ├── services/        One image per service
│       ├── projects/        Three images per project
│       └── instagram/       Instagram grid tiles
└── tools/
    └── generate-placeholders.py   Regenerates the placeholder images
```

To preview the site locally, open `index.html` in a browser. For an exact
preview (forms and the map behave better over HTTP), run a local server from
this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 2. Before the site goes live — the checklist

Everything below is a placeholder that needs a real value.

| # | What to change | Where |
|---|---|---|
| 1 | **All photography.** Every image is a generated placeholder marked "PLACEHOLDER". | `assets/img/` — see §4 |
| 2 | **The logo.** Currently a text wordmark. | See §4.3 |
| 3 | **The domain.** `https://www.acaciakitchens.com.au` appears in every page's canonical, Open Graph and schema tags. | See §3.3 |
| 4 | **Form delivery.** Forms currently validate but do not send. | See §5 |
| 5 | **Testimonials.** All reviews are labelled "Sample review". | `testimonials.html`, `index.html` |
| 6 | **Project details.** Names, locations, materials and finishes are examples. | `projects.html` |
| 7 | **Opening hours.** Marked "to be confirmed". | `contact.html` |
| 8 | **Legal pages.** Templates, not legal advice — have them reviewed. | `privacy-policy.html`, `terms-conditions.html` |
| 9 | **HIA finalist details.** Listed as recognition only, with no invented specifics. | `awards.html` |
| 10 | **Social preview image.** `og-image.svg` should become a real photo. | See §4.4 |

**Nothing has been invented.** No awards, licences, guarantees, certifications,
customer reviews or business history appear anywhere beyond the information
supplied. Where a fact was not available, the page says so plainly rather than
filling the gap.

---

## 3. How to publish the website

The site is static files, so almost any host will run it. Three good options,
easiest first.

### 3.1 Netlify (recommended — free, drag and drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag this entire folder onto the page.
3. The site is live in seconds on a temporary `.netlify.app` address.
4. To use the real domain: **Site configuration → Domain management → Add a
   domain**, then follow the DNS instructions at your domain registrar.

Netlify also handles the enquiry forms for you — see §5.2.

### 3.2 Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
   Git**, and select the repository.
3. Leave the build command **empty** and set the output directory to `/`.
4. Add your domain under **Custom domains**.

### 3.3 Traditional web hosting (cPanel, FTP)

1. Connect to the host with FTP or the cPanel File Manager.
2. Upload the **contents** of this folder (not the folder itself) into
   `public_html/`.
3. Confirm `index.html` sits directly in `public_html/`.
4. For the 404 page to work, add a file named `.htaccess` in `public_html/`
   containing:

   ```apache
   ErrorDocument 404 /404.html
   ```

### 3.4 Point the site at the real domain

Once the domain is confirmed, update it everywhere in one pass. From this
folder:

```bash
grep -rl "www.acaciakitchens.com.au" . --include=*.html --include=*.xml --include=*.txt \
  | xargs sed -i 's|www\.acaciakitchens\.com\.au|YOUR-REAL-DOMAIN.com.au|g'
```

On macOS, use `sed -i ''` instead of `sed -i`.

Then submit `https://YOUR-DOMAIN/sitemap.xml` to
[Google Search Console](https://search.google.com/search-console).

---

## 4. How to edit the website

### 4.1 Editing text

Open any `.html` file in a plain-text editor (VS Code, Notepad++, TextEdit in
plain-text mode). Text lives between tags:

```html
<h2>Award-winning outdoor kitchens</h2>
<p class="lede">Acacia Kitchens won the 2023 HIA…</p>
```

Change the words **between** `>` and `<`. Leave the tags themselves alone.
Save, refresh the browser, done.

Three things to know:

- **Special characters.** Write `&amp;` for `&`, `&rsquo;` for a curly
  apostrophe, and `&mdash;` for an em dash.
- **The header, footer and menu are repeated in every page.** If you change a
  navigation link, change it in all 13 HTML files. A find-and-replace across
  the folder does this in one step.
- **Phone and email appear in several places** per page — header, footer,
  mobile menu, call bar. Use find-and-replace so none are missed.

### 4.2 Replacing images

Every image is a placeholder. To swap one in, **give the new photo the same
filename** as the placeholder and drop it into the same folder. No HTML changes
are needed at all.

| Placeholder | Replace with | Suggested size |
|---|---|---|
| `assets/img/hero-kitchen.svg` | The best kitchen photo you have | 2000 × 1125 px |
| `assets/img/about-workshop.svg` | Workshop interior | 1200 × 900 px |
| `assets/img/about-team.svg` | The team | 1200 × 900 px |
| `assets/img/awards-feature.svg` | The award-winning outdoor kitchen | 1400 × 900 px |
| `assets/img/services/<name>.svg` | That service | 1200 × 900 px |
| `assets/img/projects/<name>-1..3.svg` | That project, 3 shots | 1600 × 1100 px |
| `assets/img/instagram/post-1..6.svg` | Recent Instagram posts | 800 × 800 px |

If you use `.jpg` files instead of `.svg` (recommended for photographs), you
must also update the filename in the HTML. Find `hero-kitchen.svg` and change
it to `hero-kitchen.jpg`.

**Two rules that matter:**

1. **Resize before uploading.** A photo straight off a camera can be 8 MB and
   will make the site slow. Save JPEGs at roughly the sizes above, quality
   ~80%. [Squoosh.app](https://squoosh.app) does this free in the browser.
2. **Update the alt text.** Next to every image is `alt="…"`. Describe what is
   actually in the new photo. This is what screen-reader users hear, and Google
   reads it too:

   ```html
   <img src="assets/img/projects/riverside-entertainer-1.jpg"
        alt="Two-tone kitchen with timber island and stone benchtop in Idalia">
   ```

To regenerate the placeholder set at any time:
`python3 tools/generate-placeholders.py`

### 4.3 Adding the logo

The header currently shows a styled text wordmark (the letter "A" in a circle
plus "ACACIA"). To use a real logo file, replace this block — it appears in the
header **and** footer of all 13 pages:

```html
<span class="brand__mark" aria-hidden="true">A</span>
<span class="brand__text">
  <span class="brand__name">Acacia</span>
  <span class="brand__tag">Kitchens &amp; Joinery</span>
</span>
```

with:

```html
<img src="assets/img/brand/logo.svg" alt="Acacia Kitchens" style="height:42px;width:auto">
```

Note the header sits over a dark hero on the home page, so a logo that works on
both dark and light backgrounds (or a white version) is worth having.

Also replace `assets/img/brand/favicon.svg` with the real icon.

### 4.4 The social preview image

`assets/img/og-image.svg` is what appears when someone shares a link on
Facebook, Instagram or in a message. Replace it with a real photo at
**1200 × 630 px**, saved as `og-image.jpg`, then find-and-replace
`og-image.svg` → `og-image.jpg` across the HTML files.

### 4.5 Adding a new project

In `projects.html` a project appears in two places. Copy an existing one of
each and edit it.

**First**, the portfolio card — copy any block starting `<a class="project-card"`:

```html
<a class="project-card" href="#my-new-project" data-category="Custom Kitchens" data-reveal>
  <div class="project-card__media">
    <img src="assets/img/projects/my-new-project-1.jpg" alt="Describe the kitchen">
  </div>
  <div class="project-card__body">
    <span class="project-card__cat">Custom Kitchens</span>
    <h3>My New Project</h3>
    <p class="project-card__loc">Suburb, Townsville</p>
  </div>
</a>
```

**Second**, the detail entry — copy any block starting
`<article class="project-entry"`, and set `id="my-new-project"` to match the
`href` above. Fill in the three gallery images and the specification table
(category, location, materials, cabinet finish, benchtop).

The `data-category` value controls the filter buttons. Use one of the existing
categories, or add a new filter button in the `.filter-bar` block to introduce
a new one.

### 4.6 Adding a testimonial

In `testimonials.html`, copy any `<figure class="quote-card">` block. When you
publish a real review, **delete the sample tag line**:

```html
<span class="sample-tag">Sample review</span>
```

That tag exists so nobody mistakes placeholder copy for a genuine customer
review. Once a review is real, the tag must go.

### 4.7 Adding an award

In `awards.html`, the three dashed "Reserved" cards are ready to fill. Replace
one with a copy of the real award card above it, and change
`award-card--placeholder` to `award-card--feature`.

### 4.8 Changing colours or fonts

Everything is defined once at the top of `assets/css/styles.css`:

```css
:root {
  --ink: #101113;      /* near-black — headings, buttons */
  --charcoal: #1c1e21; /* body text */
  --mist: #f6f4f0;     /* off-white section backgrounds */
  --timber: #b9895a;   /* natural timber */
  --gold: #c7a15a;     /* gold accent */
}
```

Change a value there and it updates across all 13 pages. If you change the
gold, check text still reads clearly against its background — see §7.

---

## 5. Connecting the enquiry forms

**As shipped, the forms validate every field and then show the thank-you page
without sending anything.** This is deliberate, so the site can be reviewed
safely. Choose one of the options below before launch, then test it by
submitting a real enquiry.

### 5.1 Formspree (works on any host)

1. Create a free account at [formspree.io](https://formspree.io) and add a form
   pointed at `acaciakitchenstsv@gmail.com`.
2. Copy the endpoint it gives you, e.g. `https://formspree.io/f/abcdwxyz`.
3. Open `assets/js/main.js`, find this line near the top, and paste it in:

   ```js
   var FORM_ENDPOINT = "";
   ```
   becomes
   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
   ```

That is the only change needed. Both forms will post to it, uploads included,
and visitors still land on `thank-you.html`.

### 5.2 Netlify Forms (only if hosting on Netlify)

Add `netlify` and a name to the two `<form>` tags in `quote.html` and
`contact.html`:

```html
<form class="form-shell" data-validate data-redirect="thank-you.html" novalidate
      netlify name="quote">
```

Netlify then captures submissions in its dashboard and can email them on.

### 5.3 What the forms already do

Whichever option you pick, the following is already handled and needs no work:

- Required fields flagged individually with a message, not one generic error
- Australian phone number and email format checking
- A minimum message length so enquiries arrive with useful detail
- Upload size checking (10 MB per file) with a plain-English message
- The consent checkbox is mandatory and cannot be bypassed
- Errors are announced to screen readers, and focus jumps to the first problem
- The submit button locks and shows "Sending…" so nothing is sent twice
- If sending fails, the visitor is shown the phone number and email instead

### 5.4 Where enquiries go

Form submissions are emailed to `acaciakitchenstsv@gmail.com`. Uploads arrive
as attachments or as download links, depending on which service you chose.
**Test this before launch** — send a real enquiry with a photo attached and
confirm it arrives.

---

## 6. How the site is built (for whoever maintains it next)

- **No build step.** The `.html` files are the real files. Edit and upload.
- **One stylesheet**, `assets/css/styles.css`, organised into 15 numbered
  sections with a table of contents at the top.
- **One script**, `assets/js/main.js`. Each feature is a separate function that
  does nothing if its markup is absent, so pages only run what they need.
- **Design tokens** (colour, type scale, spacing, shadows) are CSS custom
  properties in `:root`. Type sizes use `clamp()`, so they scale smoothly
  between phone and desktop without breakpoint jumps.
- **Animations** are CSS transitions triggered by adding a class. Elements
  marked `data-reveal` fade up as they scroll into view; a parent marked
  `data-reveal-group` staggers its children.
- **Scroll reveal degrades safely.** The hiding CSS is scoped to `.has-js`,
  added by a one-line script in each page's `<head>`. If JavaScript fails to
  load, everything is simply visible.
- **`prefers-reduced-motion` is respected** — animation is switched off
  entirely for visitors who ask for that in their operating system.

---

## 7. Accessibility

The site was built to meet WCAG 2.1 AA, and this should be maintained when
content changes:

- Every image has descriptive alt text (decorative images are hidden from
  screen readers instead).
- All text meets or exceeds a 4.5:1 contrast ratio. The hero uses two layered
  scrims so headline contrast holds regardless of the photo behind it.
- The site is fully keyboard navigable, with a visible gold focus ring and a
  "Skip to main content" link.
- Menus, accordions, the image viewer and form errors all announce their state
  to screen readers.
- Headings run in order, one `<h1>` per page.

**When adding content:** keep the alt text meaningful, do not put gold text on
white (it is an accent colour, not a text colour), and do not skip heading
levels.

---

## 8. Search engine optimisation

Already in place:

- Unique title and meta description per page, written around the target terms:
  cabinet maker Townsville, custom kitchens Townsville, kitchen renovations
  Townsville, kitchen cabinets Townsville, joinery Townsville, bathroom
  vanities Townsville, wardrobes Townsville, commercial cabinetry Townsville,
  outdoor kitchens Townsville, North Queensland cabinet maker.
- `LocalBusiness` schema on the home page with the address, phone, service
  area, the 2023 HIA award and the service catalogue; `HowTo` schema on the
  process page; `BreadcrumbList` on services.
- Open Graph and Twitter Card tags on every page.
- Canonical URLs, `robots.txt` and `sitemap.xml`.
- Australian English throughout ("customise", "colour", "specialised").
- Suburb names used naturally in the copy rather than stuffed into lists.

**After launch:**

1. Update the domain (§3.4).
2. Submit the sitemap to Google Search Console.
3. Claim and complete the Google Business Profile — for a local trade business
   this drives more enquiries than anything on the website itself. Use exactly
   the same business name, address and phone as appear here.
4. Add real project photos. Original photography of local work outperforms
   stock imagery for local search.

---

## 9. Support notes

- The Google Map on the contact page loads only when scrolled into view, so it
  does not slow down the rest of the page.
- The mobile call bar (Call Us / Free Quote) appears below 960 px wide.
- The site has been checked at 390 px, 768 px, 1024 px, 1440 px and 1920 px.
- Tested in current Chrome, Safari, Firefox and Edge. Internet Explorer is not
  supported.
