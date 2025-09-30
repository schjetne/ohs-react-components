import type { StorybookConfig } from "@storybook/react-vite";
import viteConfig from "../vite.config";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;

// Merge the typed Vite config's CSS preprocessor options into Storybook's
// vite server configuration. This lets us keep includePaths centralized in
// `vite.config.ts` while keeping this file strictly typed.
config.viteFinal = async (viteFinalConfig) => {
  viteFinalConfig.css = viteFinalConfig.css || {};
  viteFinalConfig.css.preprocessorOptions =
    viteFinalConfig.css.preprocessorOptions || {};

  // shallow-merge any preprocessor options from the canonical vite config
  if (
    viteConfig &&
    (viteConfig as any).css &&
    (viteConfig as any).css.preprocessorOptions
  ) {
    viteFinalConfig.css.preprocessorOptions = {
      ...viteFinalConfig.css.preprocessorOptions,
      ...(viteConfig as any).css.preprocessorOptions,
    } as any;
  }

  return viteFinalConfig;
};
