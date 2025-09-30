import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    onClick: () => alert("Button clicked!"),
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
  },
};

export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#">Go to page</a>
    </Button>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "With icon",
    icon: "warning",
  } as any,
};
