import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_URL: process.env.API_URL,
    NRG_LYON_API_KEY: process.env.NRG_LYON_API_KEY,
  },
};

export default nextConfig;