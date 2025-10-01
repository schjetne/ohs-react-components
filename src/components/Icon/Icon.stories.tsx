import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import { IconName, solidIconData } from './iconData'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(solidIconData) as IconName[],
    },
    variant: { control: { type: 'radio' }, options: ['solid', 'normal'] },
    color: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Playground: Story = {
  args: {
    name: 'warning',
    variant: 'solid',
    color: 'currentColor',
  },
}

export const Gallery: Story = {
  render: () => {
    const data = solidIconData as Record<string, string>
    const names = Object.keys(data)
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {names.map((n) => (
          <div key={n} style={{ width: 80, textAlign: 'center', fontSize: 32 }}>
            <Icon name={n as IconName} />
            <div style={{ fontSize: 16, marginTop: 6 }}>{n}</div>
          </div>
        ))}
      </div>
    )
  },
}
