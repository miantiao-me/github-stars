---
project: react-document-picture-in-picture
stars: 47
description: |-
    Feature-packed and optimised React component for Chrome's new Document Picture-in-Picture API
url: https://github.com/martinshaw/react-document-picture-in-picture
---

# react-document-picture-in-picture

Easily and quickly use Chrome's new experimental Document Picture-in-Picture API as a zero-dependency React component.

## Installation

```bash
npm install react-document-picture-in-picture
```

Installs the [`component`](https://github.com/martinshaw/react-document-picture-in-picture/tree/master/packages/component) package from this monorepo project.

## Support 

If you find this package or any of my other open-source packages useful for your projects, please send me a dollar, quid or dinar to help me continue to maintain and develop them. 

[Buy me a coffee](https://www.buymeacoffee.com/lfbehjxudv)

## Usage

```tsx
import ReactDocumentPictureInPicture from "react-document-picture-in-picture";

// Inside your React component ...
<ReactDocumentPictureInPicture
    buttonRenderer={
        ({ open, close, toggle, isOpen }) => 
            <div>
                <b>Is {isOpen ? 'Open' : 'Closed'}</b>
                <button onClick={open}>Open</button>
                <button onClick={close}>Close</button>
                <button onClick={toggle}>Toggle</button>
            </div>
    }
    onOpen={() => console.log('Opened')}
    onClose={() => console.log('Closed')}
    onResize={(w, h) => console.log('Resized to ' + w + 'x' + h)}
>
    This text should be displayed in a Document Picture in Picture in the bottom right of the original window
</ReactDocumentPictureInPicture>

```

There are at least three useful examples demonstrating how to use event props, the ref prop and size props in the [`examples`](https://github.com/martinshaw/react-document-picture-in-picture/tree/master/packages/examples) package of this monorepo.

To quickly take a look at the examples, click here [https://martinshaw.github.io/react-document-picture-in-picture/packages/examples/dist/](https://martinshaw.github.io/react-document-picture-in-picture/packages/examples/dist/).

Or you can build the examples site yourself:

1. Clone the repository

2. Install PNPM

3. Finally, run the following commands:

```bash
pnpm install 
pnpm run --filter react-document-picture-in-picture build
pnpm run --filter examples start
```

The examples will be available at `https://localhost:1234/` in your browser.


