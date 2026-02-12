/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      // Cache static assets aggressively (JS, CSS, fonts, images)
      source: "/:path*.(js|css|woff|woff2|ttf|eot|ico|svg|png|jpg|jpeg|webp|avif|gif)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      // Cache the main page for 60s, serve stale while revalidating
      source: "/",
      headers: [
        { key: "Cache-Control", value: "public, s-maxage=60, stale-while-revalidate=300" },
      ],
    },
  ],
}

export default nextConfig
