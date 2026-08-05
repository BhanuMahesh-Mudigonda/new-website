PB Photography — Static Site

This repository contains the PB Photography static website (HTML/CSS/JS).

Quick local preview

```bash
# serve from current folder
python3 -m http.server 8000

# (optional) expose publicly with localtunnel or ngrok
# npx localtunnel --port 8000 --subdomain yoursubdomain
# ngrok http 8000
```

Deploy options

- GitHub Pages: push this repo to GitHub, enable Pages or add the provided GitHub Actions workflow.
- Netlify: connect the GitHub repo or drag-and-drop the site folder to Netlify. Use `netlify.toml` if needed.
- Vercel: connect the GitHub repo and deploy as a static site.

Custom domain

- To use `pbphotography.com`, add a `CNAME` record pointing your domain to the host (see host docs). GitHub Pages uses a `CNAME` file included here.

What I added

- `.gitignore` — ignores common files
- `.github/workflows/deploy.yml` — GitHub Actions workflow to publish to GitHub Pages
- `netlify.toml` — Netlify config
- `CNAME` — placeholder for `pbphotography.com` (update only if you control the domain)

Next steps

1. Create a GitHub repository and push these files.
2. Enable GitHub Pages (or connect to Netlify/Vercel).
3. If you own a domain, update DNS to point to your chosen host and enable HTTPS.

If you want, I can push to GitHub for you (you must provide access/token) or start a temporary preview now.
