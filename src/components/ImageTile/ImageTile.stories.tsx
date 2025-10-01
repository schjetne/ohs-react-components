import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ImageTile } from './ImageTile'

const meta: Meta<typeof ImageTile> = {
  title: 'Components/ImageTile',
  component: ImageTile,
}

export default meta

type Story = StoryObj<typeof ImageTile>

const landscape =
  'https://media.hitmaps.com/img/hitman3/unlockables/outfit_1fdc259e-b96a-47f2-bbd8-e86e78d6df70_0.jpg'
const portrait = 'https://media.hitmaps.com/img/hitman3/contracts/novikov_and_magolis/tile.jpg'

export const Landscape: Story = {
  args: {
    imageUrl: landscape,
    aspect: 'landscape',
    children: <div style={{ color: 'white', padding: 12 }}>Landscape tile</div>,
  },
}

export const Portrait: Story = {
  args: {
    imageUrl: portrait,
    aspect: 'portrait',
    children: <div style={{ color: 'white', padding: 12 }}>Portrait tile</div>,
  },
}

export const SquareWithOverlay: Story = {
  args: {
    imageUrl: landscape,
    aspect: 'square',
    children: (
      <div style={{ color: 'white', padding: 12 }}>
        <strong>Overlay</strong>
      </div>
    ),
  },
}
