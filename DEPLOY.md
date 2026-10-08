# Deploying CHOMP

Two routes. **Route A** gets you a live URL in about 2 minutes. **Route B** is the proper
setup you'll want for every future project (auto-deploys when you push to GitHub).

Everything is already prepared — no configuration needed on your side.

---

## Route A — Netlify Drop (fastest, ~2 minutes)

Good for: getting a URL into your email **today**.

1. **Download** `chomp-site.zip` from this workspace to your computer.
2. **Unzip it.** You should get a folder containing `index.html`, `_next/`, `images/`, and
   `404.html` directly inside it. *(Important: unzip it — don't drag the `.zip` itself.)*
3. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**
4. **Drag the unzipped folder** onto the drop zone.
5. Wait ~15 seconds. You'll get a live URL like `https://sparkly-cake-123abc.netlify.app`.
6. **Rename it** (optional but do it): *Site configuration → Change site name* →
   `chomp-abdulrehman` → your URL becomes `https://chomp-abdulrehman.netlify.app`.

Sign in with GitHub/Google when prompted so the site stays yours (free tier is fine).

> ⚠️ **Netlify Drop does not auto-update.** If you change the code, re-run
> `npm run build:static`, re-zip, and drop again. For ongoing work use Route B.

---

## Route B — GitHub + Vercel (recommended)

Good for: automatic deployments, custom domains, and a repo that proves you wrote this.

### 1. Get the source onto your computer

1. **Download `chomp-source.zip`** from this workspace (this is the *full source*, not the
   static export).
2. **Extract it.** You'll get a `chomp-landing` folder containing `app/`, `components/`,
   `data/`, `public/`, `README.md`, `package.json`, etc.

> Put it somewhere simple like `C:\Users\YourName\Projects\chomp-landing`.

### 2. Push to GitHub

Your repo `github.com/Mani91050/chomp-landing` already exists and is empty — perfect.

Open **Git Bash** (or any terminal) and run:

```bash
cd /c/Users/YourName/Projects/chomp-landing

git init
git add .
git commit -m "CHOMP — Next.js e-commerce landing page concept"
git branch -M main
git remote add origin https://github.com/Mani91050/chomp-landing.git
git push -u origin main
```

**If git complains about your identity** (first time using git on this PC):

```bash
git config --global user.name "Abdulrehman"
git config --global user.email "rehmanishtiaq9105@gmail.com"
```

Then re-run the `git commit` and `git push` commands.

**When GitHub asks for a password**, pasting your account password won't work. Use a
**Personal Access Token** instead:
*GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) →
Generate new token → tick `repo`* → copy it → paste it as the password.
(Or install **GitHub Desktop** and click "Publish" — no tokens needed.)

### 3. Verify it worked

Refresh `github.com/Mani91050/chomp-landing`. You should see:
- All 49 files (NOT `node_modules` — the `.gitignore` handles that)
- The **README rendering with the CHOMP screenshot at the top**
- Green "MIT license" badge

### 4. Deploy on Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. **Import** the `chomp-landing` repository.
3. Vercel detects Next.js automatically. **Change nothing.** Click **Deploy**.
4. ~60 seconds later you get `https://chomp-landing-xxx.vercel.app`.

Every future `git push` redeploys automatically. 🎉

### 5. Custom domain (optional, later)

Buy something like `abdulrehman.dev`, then in Vercel: *Settings → Domains → Add*. Vercel
gives you the DNS records to paste into your registrar. Free HTTPS is automatic.

---

## After you have your URL — 2 final steps

### 1. Put the URL in the site's metadata

So social-share previews (LinkedIn, WhatsApp, Twitter) resolve to your real domain.

Open `app/layout.jsx` and change:

```js
metadataBase: new URL('https://chomp-demo.vercel.app'),
```

to your actual URL, e.g.:

```js
metadataBase: new URL('https://chomp-abdulrehman.netlify.app'),
```

> This is **cosmetic only** — it affects link previews, not whether the site works. If you
> deployed via Route A, tick "Clean & redeploy" in Netlify after pushing the change.

### 2. Put the URL in your pitch email

In `mrbeast-outreach-kit.md`, replace **`[paste your live URL here]`** with your live URL.
Then delete the `**[paste your live URL here]**` brackets so the raw link is clickable.

---

## Verification checklist

Run through this the first time the site is live:

- [ ] Homepage loads and the hero image appears
- [ ] Click **Add to box** → cart drawer slides out from the right
- [ ] Press **+** in the cart → subtotal updates
- [ ] Refresh the page → **cart contents are still there**
- [ ] Click **Checkout** → demo notice appears (no real payment — by design)
- [ ] Open the **FAQ** section → accordion expands
- [ ] Resize the window to phone width → mobile burger menu appears
- [ ] Scroll to the footer → your name, GitHub link, and email are all clickable

If all eight pass, you're done.

---

## Local development commands

```bash
npm install          # first time only
npm run dev          # dev server → http://localhost:3000
npm run build        # normal Next.js production build
npm run build:static # static export → ./out (what Netlify Drop needs)
npm run start        # serve the production build locally
npm run preview:static  # serve the static export locally
```

---

## Troubleshooting

**Netlify shows a blank page or directory listing**
→ You dragged the `.zip` instead of the *unzipped folder*, or you zipped the parent folder
so `index.html` is nested one level too deep. The folder you drag must contain `index.html`
at its top level.

**Images don't appear after deploying**
→ Only happens if `images.unoptimized` was removed from `next.config.mjs`. It's set — leave
it set. Static hosts can't run Next's image optimizer.

**Vercel build fails**
→ Make sure you didn't commit `node_modules` or `.next`. The `.gitignore` handles this;
verify it came along if you copied files manually.

**I want to change the price/text**
→ All product data lives in `data/flavors.js`. Rebuild and redeploy.
