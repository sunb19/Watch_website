
# LKS Timepieces — Modern Bold Showroom (Static Site)

This is a lightweight, static website for showcasing watch inventory (no checkout).
Built with HTML/CSS/JS and driven by a JSON file for easy updates.

## Files
- `index.html` — Homepage with hero and featured pieces
- `inventory.html` — Grid catalog
- `watch.html` — Dynamic watch detail page (uses `?id=` query parameter)
- `about.html`, `contact.html`
- `assets/style.css` — Theme (dark / gold / green)
- `assets/script.js` — Logic to load JSON and render pages
- `data/inventory.json` — Your inventory. Add/edit watches here.
- `assets/placeholders/*.png` — Replace with real photos (same filenames or update JSON)
- `assets/logo.svg` — Simple logo (replace with your own)

## How to Update Inventory
1. Edit `data/inventory.json`
2. Add new object under `"items"` with fields:
```json
{
  "id": "unique-id",
  "title": "Rolex Datejust 41 Blue Diamond • Fluted Bezel • Oyster",
  "model": "Datejust 41",
  "reference": "126334",
  "year": 2023,
  "size": "41mm",
  "bracelet": "Oyster",
  "condition": "Unworn",
  "box_papers": "Full Set",
  "location": "USA",
  "price": 15200,
  "featured": true,
  "images": ["assets/your-photo-1.jpg", "assets/your-photo-2.jpg"],
  "description": "Short description."
}
```
3. Use the `"featured": true` flag to surface pieces on the home page.

## Replace Contact Info
- In `assets/script.js`, search for `wa.me/1234567890` and `hello@lkstimepieces.com` and replace.
- In `contact.html`, update WeChat/handles.

## Local Preview
You need a local server (because browsers block `fetch` from local files).
- **Python 3**: `cd` into the folder, then:
  - `python -m http.server 8080`
  - Open `http://localhost:8080`
- Or use VS Code's Live Server extension.

## Deploy (Free)
### Vercel
1. Create a GitHub repo and push this folder.
2. In Vercel, **New Project** → Import the repo → Framework = **Other** → Deploy.
3. Set the project as a static site (no build step needed).

### Netlify
1. Drag-and-drop the folder into Netlify, or connect Git.
2. No build command; publish directory is the project root.

### Custom Domain
- Buy a domain (Namecheap/GoDaddy/Cloudflare).
- Point DNS to Vercel/Netlify per their docs.
- Set `www` and apex records.

## Tips
- Replace placeholder images with your watch photos (ideally 1400×900+).
- Keep filenames web-friendly (no spaces).
- For each watch, provide 2–5 images for a nicer gallery.
- If inventory is large, we can add search/filters later.

— Built for a modern, bold presentation.
