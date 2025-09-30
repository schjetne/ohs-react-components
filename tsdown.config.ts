import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssUrl from "postcss-url";
import url from "@rollup/plugin-url";
import copy from "rollup-plugin-copy";
import viteConfig from "./vite.config";

const cfg: any = {
  dts: true,
  exports: true,
  hash: false,
  entry: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name].mjs",
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
    }),
    postcss({
      extract: "index.css",
      minimize: true,
      use: [
        [
          "sass",
          {
            includePaths: ((viteConfig as any).css?.preprocessorOptions as any)
              ?.sass?.includePaths || ["node_modules"],
          },
        ],
      ] as any,
      plugins: [
        postcssUrl({
          url: "rebase",
          useHash: false,
        }),
      ],
    }),
    url({
      include: [
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.gif",
        "**/*.woff",
        "**/*.woff2",
        "**/*.ttf",
        "**/*.eot",
      ],
      limit: 0,
      fileName: "[name][extname]",
    }),
    copy({
      targets: [{ src: "src/assets/*", dest: "dist/assets" }],
      hook: "buildEnd",
    }),
  ],
};

export default cfg;
