import React from 'react'
import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders the title text', () => {
    render(<Heading title="Hello world" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders a prefix when provided', () => {
    render(<Heading title="Main" prefix="01" />)
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('renders the icon element', () => {
    render(<Heading title="With icon" icon="warning" />)
    expect(document.querySelector('.icon')).toBeTruthy()
  })

  it('uses the provided heading level', () => {
    render(<Heading title="Level test" headingLevel="h2" />)
    const h2 = document.querySelector('h2.title')
    expect(h2).toBeTruthy()
    expect(h2?.textContent).toBe('Level test')
  })
})
