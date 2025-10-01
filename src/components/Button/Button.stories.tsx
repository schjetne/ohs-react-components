import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    skin: {
      control: { type: "select" },
      options: ["transparent", "solid", "danger"],
    },
    fullWidth: { control: { type: "boolean" } },
    uppercase: { control: { type: "boolean" } },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    skin: "transparent",
    onClick: () => alert("Button clicked!"),
    uppercase: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    skin: "transparent",
    uppercase: false,
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
    skin: "transparent",
  } as any,
};
