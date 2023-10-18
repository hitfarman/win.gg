/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_WP_API_DOMAIN,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "steamcdn-a.akamaihd.net",
        port: "",
        pathname: "/**",
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: `https://${process.env.NEXT_PUBLIC_WP_API_DOMAIN}/:path*`,
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/proxy/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/35051/win.gg',
        permanent: false,
        basePath: false
      },
      {
      	source: '/feed/',
      	destination: 'https://api.win.gg/feed/',
      	permanent: true,
      	basePath: false
      },
      {
      	source: '/news/(\\d+)/:slug',
      	destination: '/news/:slug',
      	permanent: true
      },
      {
      	source: '/news/author/:slug',
      	destination: '/author/:slug',
      	permanent: true
      }
    ]
  },
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
};

module.exports = nextConfig;
