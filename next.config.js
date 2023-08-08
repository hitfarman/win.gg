/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WP_API_DOMAIN,
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
    ]
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: `https://${process.env.WP_API_DOMAIN}/:path*`,
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
        destination: 'https://spn-v1.revampcdn.com/publishers/win-gg/ads.txt',
        permanent: false,
        basePath: false
      },
    ]
  },
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
};

module.exports = nextConfig;
