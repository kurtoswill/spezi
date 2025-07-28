import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config: any, { isServer }: { isServer: boolean }) => {
  //   // If you have custom CSS handling, make sure you include the plugin
  //   if (!isServer) {
  //     const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  //     config.plugins = config.plugins || [];
  //     config.plugins.push(new MiniCssExtractPlugin());
  //   }
  //   return config;
  // },
};

export default nextConfig;
