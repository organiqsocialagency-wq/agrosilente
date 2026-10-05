# Third-party notices

## React Bits — BlurText and Magnet

This website includes code copied from the official React Bits TypeScript + Tailwind variants by David Haz.

- Documentation: https://reactbits.dev/get-started/index
- Repository: https://github.com/DavidHDev/react-bits
- Upstream commit: `ca44b3f9ee180676a06d7de8ec6bea84cddff85b`
- Retrieved: 2026-10-04
- BlurText source: https://github.com/DavidHDev/react-bits/blob/ca44b3f9ee180676a06d7de8ec6bea84cddff85b/src/ts-tailwind/TextAnimations/BlurText/BlurText.tsx
- Magnet source: https://github.com/DavidHDev/react-bits/blob/ca44b3f9ee180676a06d7de8ec6bea84cddff85b/src/ts-tailwind/Animations/Magnet/Magnet.tsx
- License source: https://github.com/DavidHDev/react-bits/blob/ca44b3f9ee180676a06d7de8ec6bea84cddff85b/LICENSE.md

### Local adaptations

Both files retain the upstream client-component directive and animation logic. Props types are exported for reuse.

- `BlurText`: changed the Motion import from `motion/react` to the requested `framer-motion` package; added an optional semantic `as` prop (`span`, `p`, `h1`, `h2`, `h3`); respect reduced-motion preferences by showing the final text without movement; capture the observed element for reliable observer cleanup.
- `Magnet`: preserve the upstream proximity calculation and CSS transform; disable animation for reduced-motion preferences and ignore magnetic pointer tracking on devices without a fine pointer and hover; reset pointer displacement when pointer capabilities change or the window loses focus. The `disabled` prop suppresses transforms immediately.

The components are integrated into the Trullo Natalino website. They are not offered as a standalone component product.

### Upstream license (verbatim)

MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

## No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Additional React Bits components supplied by the user — 2026-10-05

Dock, SpecularButton, DepthCarousel, MaskedHeading and ScrollExpand were supplied as complete React Bits JavaScript + CSS source in the user's attachments. They are integrated into this website under the upstream React Bits license reproduced above; the attachments do not identify an upstream commit for these versions.

Local adaptations:
- All five components are typed in TypeScript and styled with Trullo Natalino's palette.
- Dock preserves proximity magnification and spring sizing; uses the installed Framer Motion package, native links/buttons, top-header tooltips and stable touch controls.
- SpecularButton preserves the supplied OGL fragment shader and pointer-driven specular lighting; adds native anchor support, reduced-motion/WebGL fallback, capped pixel density, offscreen/hidden-tab suspension and GPU cleanup.
- DepthCarousel preserves the GSAP depth-rail positioning and drag navigation; uses local photographs through Next Image, larger indicator hit areas, Italian labels, native page scrolling, initial-photo selection and corrected drag-click suppression.
- MaskedHeading preserves the SVG glyph mask, image drift and wipe reveal; adds Next Image, fallback text and reduced-motion/offscreen suspension.
- ScrollExpand preserves the clip-path expansion, zoom, sticky track and overlay transitions; adds Next Image, responsive framing, a persistent CTA area and a static reduced-motion layout.
- BlurText additionally accepts an animation gate to coordinate with the opening sequence.

The Trullo Natalino SVG mark is a local vector reconstruction of the logo shown in the user's supplied moodboard. The opening sequence follows the public Organiq reference's build → wordmark → progress completion → upward curtain structure, implemented locally without copying its branding or assets.

Additional Trullo Natalino adaptations: Dock renders text-only controls while retaining the proximity spring. BlurText preserves rich text markup, repeats on viewport re-entry, adds scroll-linked exit blur/opacity, and respects reduced motion. Form controls and persistent navigation remain legible during interaction.


## AccordionGallery — source supplied by the user, 2026-10-05

Adapted from the supplied React Bits AccordionGallery (GSAP) under the React Bits license above. Local adaptations: TypeScript, local Next Image assets, native buttons with keyboard focus navigation, responsive vertical mode, automatic progression with pause, offscreen suspension, and reduced motion. The continuous events marquee is a local component.

## Locorotondo photography

All five photographs are attributed individually in public/crediti-fotografici.html and public/images/locorotondo/source.json. Resizing, WebP conversion and display crops retain the respective CC BY-SA 3.0 or 4.0 license. Property and event images were supplied by the user.
