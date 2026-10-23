# SwiftBook Brand Logo Assets

Official brand logo assets and favicon suite for SwiftBook.

## Files in this Folder

| File | Variant | Dimensions | Description |
|---|---|---|---|
| `swiftbook-logo.png` | Full Logo (Light Mode) | 589 × 231 px | Charcoal bird emblem + Orange "Swift" + Black "Book" on transparent background. |
| `swiftbook-logo-dark.png` | Full Logo (Dark Mode) | 589 × 231 px | White bird emblem + Orange "Swift" + White "Book" for dark backgrounds. |
| `swiftbook-bird.png` | Bird Emblem (Light Mode) | 247 × 231 px | Charcoal circular swift bird icon emblem only. |
| `swiftbook-bird-dark.png` | Bird Emblem (Dark Mode) | 247 × 231 px | Crisp white circular swift bird icon emblem only for dark backgrounds. |
| `swiftbook-bird-orange.png` | Bird Emblem (Terracotta) | 247 × 231 px | Orange (`#f35921`) brand swift bird icon emblem. |
| `swiftbook-text.png` | Brand Wordmark (Light) | 316 × 56 px | "Swift" (`#f35921`) + "Book" (`#000000`) text wordmark on transparent background. |
| `swiftbook-text-dark.png` | Brand Wordmark (Dark) | 316 × 56 px | "Swift" (`#f35921`) + "Book" (`#FFFFFF`) text wordmark for dark backgrounds. |
| `favicon.png` | Favicon PNG | 256 × 256 px | Centered swift bird emblem with transparent padding for browser tabs and mobile bookmarks. |
| `favicon.svg` | Favicon SVG | 256 × 256 px | Scalable vector wrapper for modern browsers. |
| `original-logo.png` | Original Upload | 1024 × 1024 px | Uncropped master file provided by user. |

## Usage Guide

### React Component
Import the `<Logo />` component from `@/components/common`:

```tsx
import { Logo } from '@/components/common';

// 1. Full Logo (Bird Emblem + SwiftBook text)
<Logo variant="full" size="md" />

// 2. Bird Icon Only (Like the favicon / small avatar marks)
<Logo variant="icon" size="sm" />

// 3. Text Only (SwiftBook typography)
<Logo variant="text" size="lg" />
```

### Static HTML / Meta Tags
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/favicon.png" />
```
