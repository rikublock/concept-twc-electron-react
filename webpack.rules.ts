import type { ModuleOptions } from "webpack";

export const rules: Required<ModuleOptions>["rules"] = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader",
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.[jt]sx?$/,
    loader: "esbuild-loader",
  },
  {
    test: /\.(png|jpg|jpeg|gif|ico)$/i,
    type: "asset/resource",
  },
  {
    test: /\.svg$/i,
    type: "asset/resource",
    resourceQuery: /url/, // *.svg?url
  },
  {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/i,
    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
    use: ["@svgr/webpack"],
  },
];
