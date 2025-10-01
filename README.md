# OhS React Components

Hitman themed React 19 components by OhS.

## Install

Install from npm:

```bash
npm install @ohshitman/ohs-react-components
# or
yarn add @ohshitman/ohs-react-components
```

## Usage

```tsx
import React from 'react'
import { Button, Link } from '@ohshitman/ohs-react-components'

export default function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Link href="#">Learn more</Link>
      <Icon name="warning" />
    </div>
  )
}
```

## Styles

Component styles are emitted to `styles.css`. Consumers can opt into the global stylesheet in a few ways:

- JavaScript import (will be processed by bundlers like Vite/webpack):

```js
import '@ohshitman/ohs-react-components/styles.css'
```

- CSS @import (in your app-level stylesheet):

```css
@import '@ohshitman/ohs-react-components/styles.css';
```

- Classic HTML link (for static pages):

```html
<link rel="stylesheet" href="/node_modules/@ohshitman/ohs-react-components/styles.css" />
```

Importing the package root (e.g. `import { Button } from "@ohshitman/ohs-react-components"`) will give you the JS components but will not automatically inject the stylesheet — import the stylesheet explicitly using one of the options above to get the global styles.

## Components

<!-- The list below is automatically generated during the build. Do not edit between the markers. -->
<!-- COMPONENTS:START -->

### Button

Button component with optional icon support.

```tsx
import { Button } from '@ohshitman/ohs-react-components';

<Button>Click me</Button>
<Button asChild>
  <a href="#">Link text</a>
</Button>
```

### Heading

Styled heading component with optional icon and prefix support.

```tsx
import { Heading } from '@ohshitman/ohs-react-components';

<Heading title="Section title" />
<Heading title="Map" prefix="01" icon="warning" headingLevel="h3" />
<Heading title="Centered" size="small" centered />
```

### Icon

Inline SVG icon component powered by generated path data.

```tsx
import { Icon } from '@ohshitman/ohs-react-components';

<Icon name="warning" color="#e74c3c" />
<Icon name="versus" variant="normal" />
```

### ImageTile

A tile component that displays an image with an optional aspect ratio and content overlay.

```tsx
import { ImageTile } from '@ohshitman/ohs-react-components'
;<ImageTile imageUrl="https://example.com/image.jpg" aspect="landscape">
  <div>Overlay Content</div>
</ImageTile>
```

### Link

A styled anchor component.

```tsx
import { Link } from '@ohshitman/ohs-react-components';

<Link href="/about">About</Link>
<Link asChild>
  <a href="#">Wrapped</a>
</Link>
```

### Modal

- A composable modal component built on top of Radix Dialog.

```tsx
import { Modal } from '@ohshitman/ohs-react-components'

const [open, setOpen] = React.useState(false)
;<>
  <Button onClick={() => setOpen(true)}>Open modal</Button>
  <Modal open={open} onOpenChange={setOpen} title="Example">
    <div>Modal body</div>
  </Modal>
</>
```

<!-- COMPONENTS:END -->
<!-- Note: To regenerate this list manually run `npm run generate:readme`. -->
