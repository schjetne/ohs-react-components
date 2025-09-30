import { defineConfig } from "vite";
import type { UserConfig } from "vite";

// Centralized, typed Vite config for the package. Keep Sass includePaths here
// so both the library build and Storybook can reference the same settings.
const config: UserConfig = {
  css: {
    preprocessorOptions: {
      // The Vite types don't formally expose `includePaths` on the Sass
      // preprocessor shape; cast only inside this file to keep other places
      // type-clean. This centralizes the weak typing in a single, obvious
      // place.
      sass: {
        // @ts-ignore allow includePaths for the Sass implementation
        includePaths: ["node_modules"],
      } as any,
    },
  },
};

export default defineConfig(config);
