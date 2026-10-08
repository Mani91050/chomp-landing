/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Images are pre-optimized assets. Leaving optimization off keeps the build
  // light and lets the site deploy anywhere (Vercel, Netlify, GitHub Pages, VPS).
  images: { unoptimized: true },

  // `npm run build:static` sets NEXT_OUTPUT=export, which produces a plain
  // HTML/CSS/JS folder in ./out that can be dropped on any static host.
  // `npm run build` stays a normal Next.js build for Vercel.
  output: process.env.NEXT_OUTPUT === 'export' ? 'export' : undefined,
};

export default nextConfig;
