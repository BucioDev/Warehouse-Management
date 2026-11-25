import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"https://s3-warehouse-management-607063196079-us-east-2-an.s3.us-east-2.amazonaws.com",
        port:"",
        pathname:"/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
