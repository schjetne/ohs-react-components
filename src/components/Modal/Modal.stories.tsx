import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    showCloseIcon: { control: { type: 'boolean' } },
    childBg: { control: { type: 'boolean' } },
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    size: 'medium',
    title: 'Replan mission',
    showCloseIcon: false,
    childBg: false,
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          <p>Are you sure you want to replan the mission?</p>
        </Modal>
      </div>
    )
  },
}

export const WithTrigger: Story = {
  args: {
    size: 'medium',
    title: 'Modal title',
    showCloseIcon: false,
    childBg: false,
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          <div style={{ padding: 12 }}>Modal content</div>
        </Modal>
      </div>
    )
  },
}

export const WithDescription: Story = {
  args: {
    size: 'medium',
    title: 'Modal with description',
    description:
      'This modal demonstrates the optional description prop which is used for screen readers.',
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open modal with description</Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          <p>Modal content that supplements the description.</p>
        </Modal>
      </div>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [submitted, setSubmitted] = React.useState(false)

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open form modal</Button>
        {submitted && <div style={{ marginTop: 8 }}>Form submitted ✓</div>}
        <Modal open={open} onOpenChange={setOpen} title="Form modal" childBg>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
              setOpen(false)
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: 16,
                color: 'var(--text-color)',
                backgroundColor: 'var(--background-color)',
              }}
            >
              Name
              <input name="name" />
            </label>

            <div style={{ fontSize: '1.25em' }}>
              <Button
                onClick={() => setOpen(false)}
                uppercase
                skin="solid"
                icon="arrow-right"
                fullWidth
              >
                OK
              </Button>
            </div>
            <div style={{ fontSize: '1.25em' }}>
              <Button type="submit" uppercase skin="solid" icon="difficulty-casual" fullWidth>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    )
  },
}
