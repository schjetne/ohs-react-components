import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    title: "Section title",
  },
};

export const WithPrefixAndIcon: Story = {
  args: {
    title: "Map",
    prefix: "01",
    icon: "warning",
    headingLevel: "h3",
  },
};

export const SmallCentered: Story = {
  args: {
    title: "Centered",
    size: "small",
    centered: true,
  },
};

export const WithSecondIcon: Story = {
  args: {
    title: "Dual icon",
    prefix: "02",
    icon: "info",
    secondIcon: "warning",
    headingLevel: "h3",
  },
};
