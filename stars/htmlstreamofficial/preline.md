---
project: preline
stars: 6532
description: |-
    Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.
url: https://github.com/htmlstreamofficial/preline
---

[![Hero Image](https://preline.co/hero-image-2.jpg)](https://preline.co)

<a href="https://preline.co"><img src="https://preline.co/preline-logo.svg" alt="Preline UI logo" width="200" height="auto"></a>

Preline UI is an open-source Tailwind CSS UI component library for building modern websites and apps. It includes UI blocks, templates, plugins, a Figma design system, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ About Preline

Preline helps teams build modern websites and web apps faster with reusable [Tailwind CSS components](https://preline.co/docs/), interactive [headless Tailwind CSS plugins](https://preline.co/plugins/), [Tailwind CSS templates](https://preline.co/templates/), and production-ready [Tailwind CSS examples](https://preline.co/blocks/). It is designed for developers who want flexible markup, scalable design systems, and polished UI patterns without rebuilding everything from scratch.

- [204 free Tailwind CSS blocks and sections](https://preline.co/blocks/)
- [5 free Tailwind CSS templates](https://preline.co/templates/)
- [27 headless Tailwind CSS plugins](https://preline.co/plugins/)
- [Full documentation](https://preline.co/docs/), [Figma](https://preline.co/figma/), [themes](https://preline.co/docs/themes.html), and [agent skills](https://preline.co/docs/agent-skills.html)

## ⚡ Getting Started

Start with any working [Tailwind CSS](https://tailwindcss.com/) project and make sure [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) are installed.

### Install via npm

1. Install `preline`:

```bash
npm i preline
```

2. Import the Preline CSS variants file into your Tailwind CSS file after the `tailwindcss` import:

```css
@import "tailwindcss";

/* Preline UI */
@source "./node_modules/preline/dist/*.js";
@import "./node_modules/preline/variants.css";

/* Preline Themes */
@import "./themes/theme.css";
```

3. Add the Preline JavaScript file near the end of your `<body>` tag:

```html
<script src="./node_modules/preline/dist/preline.js"></script>
```

For setup details, framework integration, and configuration guides, visit the [Preline documentation](https://preline.co/docs/).

## 🤖 Agent Skills

Preline UI includes [Agent Skills](https://preline.co/docs/agent-skills.html) for agentic coding tools such as Cursor, Claude Code, and Gemini CLI, making it easier to automate theme generation and UI workflows.

Install via CLI:

```bash
npx skills add htmlstreamofficial/preline
```

## ♿ Accessibility

Preline UI includes enterprise-grade accessibility built into its components, helping teams create more inclusive interfaces with accessible Tailwind CSS components, keyboard-friendly interactions, proper focus management, and stronger support for assistive technologies. Learn more in the dedicated [Accessibility documentation](https://preline.co/docs/accessibility.html).

## 🧩 Headless Tailwind CSS Plugins

Explore [headless Tailwind CSS plugins](https://preline.co/plugins/) for accessible UI behavior, interactions, forms, navigation, overlays, and productivity workflows.

| Category | Plugin Pages |
| --- | --- |
| Disclosure | [Accordion](https://preline.co/plugins/accordion.html), [Collapse](https://preline.co/plugins/collapse.html), [Tree View](https://preline.co/plugins/tree-view.html) |
| Navigations | [Tabs](https://preline.co/plugins/tabs.html), [Scrollspy](https://preline.co/plugins/scrollspy.html), [Scroll Nav](https://preline.co/plugins/scroll-nav.html), [Stepper](https://preline.co/plugins/stepper.html) |
| Overlays | [Dropdown](https://preline.co/plugins/dropdown.html), [Overlay](https://preline.co/plugins/overlay.html), [Tooltip](https://preline.co/plugins/tooltip.html) |
| Forms | [Select](https://preline.co/plugins/advanced-select.html), [ComboBox](https://preline.co/plugins/combobox.html), [Datepicker](https://preline.co/plugins/advanced-datepicker.html), [Range Slider](https://preline.co/plugins/advanced-range-slider.html), [Input Number](https://preline.co/plugins/input-number.html), [File Upload](https://preline.co/plugins/file-upload.html), [Strong Password](https://preline.co/plugins/strong-password.html), [Toggle Password](https://preline.co/plugins/toggle-password.html), [Toggle Count](https://preline.co/plugins/toggle-count.html), [Copy Markup](https://preline.co/plugins/copy-markup.html), [PIN Input](https://preline.co/plugins/pin-input.html), [Textarea Auto Height](https://preline.co/plugins/textarea-autoheight.html) |
| Miscellaneous | [DataTable](https://preline.co/plugins/datatables.html), [Carousel](https://preline.co/plugins/carousel.html), [Layout Splitter](https://preline.co/plugins/layout-splitter.html), [Remove Element](https://preline.co/plugins/remove-element.html), [Theme Switch](https://preline.co/plugins/theme-switch.html) |

## 🧱 Tailwind CSS Components

Browse [Tailwind CSS component docs](https://preline.co/docs/) across layout, base UI, forms, navigation, overlays, tables, and advanced integrations.

| Category | Component Pages |
| --- | --- |
| Layout & Content | [Container](https://preline.co/docs/components/container.html), [Columns](https://preline.co/docs/components/columns.html), [Grid](https://preline.co/docs/components/grid.html), [Layout Splitter](https://preline.co/docs/components/layout-splitter.html), [Typography](https://preline.co/docs/components/typography.html), [Images](https://preline.co/docs/components/images.html), [Links](https://preline.co/docs/components/links.html), [Dividers & HR](https://preline.co/docs/components/dividers.html), [KBD](https://preline.co/docs/components/kbd.html), [Custom Scrollbar](https://preline.co/docs/components/custom-scrollbar.html) |
| Base Components | [Accordion](https://preline.co/docs/components/accordion.html), [Alerts](https://preline.co/docs/components/alerts.html), [Avatar](https://preline.co/docs/components/avatar.html), [Avatar Group](https://preline.co/docs/components/avatar-group.html), [Badge](https://preline.co/docs/components/badge.html), [Blockquote](https://preline.co/docs/components/blockquote.html), [Buttons](https://preline.co/docs/components/buttons.html), [Button Group](https://preline.co/docs/components/button-group.html), [Card](https://preline.co/docs/components/card.html), [Chat Bubbles](https://preline.co/docs/components/chat-bubbles.html), [Carousel](https://preline.co/docs/components/carousel.html), [Collapse](https://preline.co/docs/components/collapse.html), [Datepicker](https://preline.co/docs/components/datepicker.html), [Devices](https://preline.co/docs/components/devices.html), [Lists](https://preline.co/docs/components/lists.html), [List Group](https://preline.co/docs/components/list-group.html), [Legend Indicator](https://preline.co/docs/components/legend-indicator.html), [Progress](https://preline.co/docs/components/progress.html), [File Uploading Progress](https://preline.co/docs/components/file-uploading-progress-form.html), [Ratings](https://preline.co/docs/components/ratings.html), [Skeleton](https://preline.co/docs/components/skeleton.html), [Spinners](https://preline.co/docs/components/spinners.html), [Styled Icons](https://preline.co/docs/components/static-icons.html), [Toasts](https://preline.co/docs/components/toasts.html), [Timeline](https://preline.co/docs/components/timeline.html), [Tree View](https://preline.co/docs/components/tree-view.html) |
| Navigations | [Navbar](https://preline.co/docs/components/navbar.html), [Mega Menu](https://preline.co/docs/components/mega-menu.html), [Navs](https://preline.co/docs/components/navs.html), [Tabs](https://preline.co/docs/components/tabs.html), [Sidebar](https://preline.co/docs/components/sidebar.html), [Scrollspy](https://preline.co/docs/components/scrollspy.html), [Breadcrumb](https://preline.co/docs/components/breadcrumb.html), [Pagination](https://preline.co/docs/components/pagination.html), [Stepper](https://preline.co/docs/components/stepper.html) |
| Basic Forms | [Input](https://preline.co/docs/components/input.html), [Input Group](https://preline.co/docs/components/input-group.html), [Textarea](https://preline.co/docs/components/textarea.html), [File Input](https://preline.co/docs/components/file-input.html), [Checkbox](https://preline.co/docs/components/checkbox.html), [Radio](https://preline.co/docs/components/radio.html), [Switch](https://preline.co/docs/components/switch.html), [Select](https://preline.co/docs/components/select.html), [Range Slider](https://preline.co/docs/components/range-slider.html), [Color Picker](https://preline.co/docs/components/color-picker.html), [Time Picker](https://preline.co/docs/components/time-picker.html) |
| Advanced Forms | [Advanced Select](https://preline.co/docs/components/advanced-select.html), [ComboBox](https://preline.co/docs/components/combobox.html), [SearchBox](https://preline.co/docs/components/searchbox.html), [Input Number](https://preline.co/docs/components/input-number.html), [Strong Password](https://preline.co/docs/components/strong-password.html), [Toggle Password](https://preline.co/docs/components/toggle-password.html), [Toggle Count](https://preline.co/docs/components/toggle-count.html), [Copy Markup](https://preline.co/docs/components/copy-markup.html), [PIN Input](https://preline.co/docs/components/pin-input.html) |
| Overlays | [Dropdown](https://preline.co/docs/components/dropdown.html), [Context Menu](https://preline.co/docs/components/context-menu.html), [Modal](https://preline.co/docs/components/modal.html), [Offcanvas](https://preline.co/docs/components/offcanvas.html), [Popover](https://preline.co/docs/components/popover.html), [Tooltip](https://preline.co/docs/components/tooltip.html) |
| Tables | [Tables](https://preline.co/docs/components/tables.html) |
| Third-Party Plugins | [Advanced Range Slider](https://preline.co/docs/components/advanced-range-slider.html), [Advanced Datepicker](https://preline.co/docs/components/advanced-datepicker.html), [Charts](https://preline.co/docs/components/charts.html), [Clipboard](https://preline.co/docs/components/clipboard.html), [Confetti Animation](https://preline.co/docs/components/confetti.html), [Datamaps](https://preline.co/docs/components/datamaps.html), [Datatables](https://preline.co/docs/components/datatables.html), [Drag and Drop](https://preline.co/docs/components/drag-and-drop.html), [File Upload](https://preline.co/docs/components/file-upload.html), [Maps](https://preline.co/docs/components/maps.html), [Toast Notifications](https://preline.co/docs/components/toast-notifications.html), [WYSIWYG Editor](https://preline.co/docs/components/text-editor.html) |

## 🎨 Templates and Examples

Explore free and premium layouts for landing pages, dashboards, SaaS apps, ecommerce stores, CMS products, portfolios, and more.

### Free Tailwind CSS Templates

| Template | Template | Template | Template | Template |
| --- | --- | --- | --- | --- |
| [Agency](https://preline.co/templates/websites/digital-agency/) | [AI Chat](https://preline.co/templates/ai/ai-chat-interface/) | [CMS](https://preline.co/templates/dashboards/cms-admin/) | [Coffee Shop](https://preline.co/templates/ecommerce/coffee-shop/) | [Personal](https://preline.co/templates/websites/personal-portfolio/) |

### Explore More

- [Free Tailwind CSS Blocks and Sections](https://preline.co/blocks/)
- [Free Tailwind CSS Templates](https://preline.co/templates/)

## 🚀 Preline Pro

[Preline Pro](https://preline.co/pro/) extends the free library with premium UI for serious product teams and commercial apps. It includes [740 premium Tailwind CSS blocks and sections](https://preline.co/blocks/), [21 premium Tailwind CSS templates](https://preline.co/templates/), and 207 pages for admin dashboards, SaaS products, ecommerce, CMS, CRM, analytics, finance, chat, startup, and marketing use cases.

- [Preline Pro overview](https://preline.co/pro/)
- [Premium Tailwind CSS Blocks and Sections](https://preline.co/blocks/)
- [Premium Tailwind CSS Templates](https://preline.co/templates/)

## 📚 Documentation and Resources

- [Preline UI documentation](https://preline.co/docs/)
- [Preline JavaScript](https://preline.co/docs/preline-javascript.html)
- [Framework guides](https://preline.co/docs/frameworks.html)
- [Accessibility](https://preline.co/docs/accessibility.html)
- [Themes](https://preline.co/docs/themes.html)
- [Resources](https://preline.co/docs/resources.html)
- [Figma UI kit](https://preline.co/figma/)

## 🤝 Community

For help, best practices, and product discussions, use [GitHub Discussions](https://github.com/htmlstreamofficial/preline/discussions).

Follow Preline UI [on X (Twitter)](https://x.com/prelineUI) for the latest updates.

## 📄 License

Preline UI is free for personal and commercial projects under the [MIT License](https://preline.co/docs/license.html) and the [Preline UI Fair Use License](https://preline.co/docs/license.html). Copyright 2026 by Preline Labs Ltd.

The [Preline UI Figma](https://preline.co/figma/) resources are also available for personal and commercial use. All brand icons are trademarks of their respective owners, and their use does not imply endorsement.

## A Product of Htmlstream

Preline UI is built by the [Htmlstream](https://htmlstream.com) team, crafting UI components and templates since 2013—helping teams ship faster with scalable, flexible design systems for real-world products.

Share your thoughts about Preline UI on [X (Twitter)](https://x.com/prelineUI).

