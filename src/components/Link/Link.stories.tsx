import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'
import { Heading } from '../Heading/Heading'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
}

export default meta

type Story = StoryObj<typeof Link>

export const Primary: Story = {
  args: {
    children: 'Primary Link',
    href: '#',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Link',
    href: '#',
  },
}

export const AsChildWithHeading: Story = {
  render: () => (
    <Link asChild>
      <a href="#">
        <Heading title="Clickable heading" headingLevel="h4" />
      </a>
    </Link>
  ),
}
