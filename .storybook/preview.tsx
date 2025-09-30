import React from "react";
import "../src/styles.scss";
import type { StoryFn } from "@storybook/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
};

export const decorators = [
  (Story: any) => (
    <div style={{ padding: 20 }}>
      <Story />
    </div>
  ),
];
export const tags = ["autodocs"];
