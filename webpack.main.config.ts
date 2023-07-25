import type { Configuration } from "webpack";

//eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require("copy-webpack-plugin");

import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    // FIXME: Not sure how else to bundle this with the app
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/@trustwallet/wallet-core/dist/lib/wallet-core.wasm",
          to: "[name][ext]",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
