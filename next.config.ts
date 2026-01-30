import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.megatone.net" },
      { protocol: "https", hostname: "http2.mlstatic.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      {
        protocol: "https",
        hostname: "tiendaloquieroaca924.vtexassets.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;