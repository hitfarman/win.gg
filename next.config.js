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
    ]
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: `https://${process.env.WP_API_DOMAIN}/:path*`
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
            value: "*"
          }
        ]
      }
    ];
  },
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined
};

module.exports = nextConfig;
