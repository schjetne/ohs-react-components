import { defineConfig } from "vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  css: {
    preprocessorOptions: {
      sass: {
        // @ts-ignore allow includePaths for the Sass implementation
        includePaths: ["node_modules"],
      } as any,
    },
  },
};

export default defineConfig(config);
