---
project: react-ink-textarea
stars: 27
description: |-
    A full-featured CLI textarea component for React Ink — Implement beautiful multi-line text input on the CLI
url: https://github.com/omranjamal/react-ink-textarea
---

# react-ink-textarea
> A multiline textarea component for [Ink](https://github.com/vadimdemedes/ink)

[<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/omranjamal/react-ink-textarea">](https://github.com/omranjamal/react-ink-textarea/issues) [<img alt="NPM Downloads" src="https://img.shields.io/npm/dw/react-ink-textarea">](https://www.npmjs.com/package/react-ink-textarea) [<img alt="NPM Version" src="https://img.shields.io/npm/v/react-ink-textarea">](https://www.npmjs.com/package/react-ink-textarea) [<img alt="NPM License" src="https://img.shields.io/npm/l/react-ink-textarea">](https://github.com/omranjamal/react-ink-textarea/blob/main/LICENSE) [<img alt="GitHub forks" src="https://img.shields.io/github/forks/omranjamal/react-ink-textarea?style=flat">](https://github.com/omranjamal/react-ink-textarea/network/members)

Build rich CLI forms with a full-featured textarea that supports multi-line editing, cursor navigation, undo, and customizable line prefixes.

<img width="580" alt="react-ink-textarea demo" src="https://github.com/user-attachments/assets/fbd7325e-4b16-4fde-96f6-e02a1b839cb9" />

<br/>
<br/>

**Sponsored By**  

[<img width="248" height="104" alt="sponsor (1)" src="https://github.com/user-attachments/assets/f3fc6625-af38-435e-acf9-09b9cbc7a98c" />](https://dbctx.io?utm_source=readme&utm_campaign=react-ink-textarea)

## Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
  - [1. Basic](#1-basic)
  - [2. Controlled mode with cursor labels](#2-controlled-mode-with-cursor-labels)
  - [3. Line numbers and active-line highlight](#3-line-numbers-and-active-line-highlight)
  - [4. Inline syntax highlighting](#4-inline-syntax-highlighting)
  - [5. Multi-field form with focus chaining](#5-multi-field-form-with-focus-chaining)
  - [6. Slash-command picker (arrow + tab handoff)](#6-slash-command-picker-arrow--tab-handoff)
  - [7. Code-editor preset](#7-code-editor-preset)
- [Props](#props)
- [Imperative API (ref)](#imperative-api-ref)
- [Keybindings](#keybindings)
  - [Keybinding Toggles](#keybinding-toggles)
- [Caveats & limitations](#caveats--limitations)
- [Development](#development)
- [License](#license)

## Features

- 🎨 Polished feel — blinking cursor that pauses while typing, active-line highlight, multi-line placeholder, optional whitespace glyphs.
- 🪪 Custom gutter via `linePrefix` render-prop, plus a drop-in `<LineNumberPrefix />`.
- 🌈 Regex (or function) labels with per-label styles; cursor reports the label under it.
- ⌨️ Readline keybindings, configurable per chord. `Tab` is a callback. Grouped undo and bracketed paste.
- 🌐 Unicode-correct: grapheme cursor, visual-width wrapping, real tab expansion, CRLF normalized.
- 📐 Built-in viewport virtualization; auto-scroll; resize-aware.
- 🧭 Boundary callbacks (`onFirstLineUp`, `onLastLineDown`, `onFirstCharacterLeft`, `onLastCharacterRight`) for parent-owned focus chaining.
- ⚛️ Controlled, uncontrolled, or mixed. Imperative `ref.insert(text)` for autocomplete pickers.
- 🧷 Strict TypeScript, tree-shakable.
- 🧪 Works with [`ink-testing-library`](https://github.com/vadimdemedes/ink-testing-library); 250+ tests in-repo.

## Install

Install [react-ink-textarea](https://www.npmjs.com/package/react-ink-textarea) via your JS package manager of choice.

```bash
npm install react-ink-textarea

# or
pnpm add react-ink-textarea
```

## Usage

### 1. Basic

Uncontrolled mode. Submit on Enter, freeze on submit.

```tsx
import { render } from "ink";
import { useState } from "react";
import { TextArea } from "react-ink-textarea";

const App = () => {
  const [submitted, setSubmitted] = useState("");
  const [focus, setFocus] = useState(true);

  return (
    <TextArea
      focus={focus}
      placeholder="Type your message here..."
      onSubmit={(value) => {
        setSubmitted(value);
        setFocus(false);
      }}
    />
  );
};

render(<App />);
```

### 2. Controlled mode with cursor labels

Own `value` and `cursorPosition` externally. `onCursorChange` reports the label and chunk index under the cursor — drive a status line, hover-card, or autocomplete from it.

```tsx
import { Box, Text } from "ink";
import { useState } from "react";
import { TextArea, type TLabels } from "react-ink-textarea";

const labels: TLabels = [{ pattern: /#\w+/g, label: "tag" }];
const styles = { tag: { color: "magenta" } };

const Editor = () => {
  const [value, setValue] = useState("hello #world");
  const [cursor, setCursor] = useState<[number, number]>([0, 0]);
  const [info, setInfo] = useState("text");

  return (
    <Box flexDirection="column">
      <TextArea
        focus
        value={value}
        cursorPosition={cursor}
        labels={labels}
        styles={styles}
        onChange={setValue}
        // (pos, labelType, chunkIndex) — labelType is "text" outside any match
        onCursorChange={(pos, type, idx) => {
          setCursor(pos);
          setInfo(type === "text" ? "text" : `${type}#${idx}`);
        }}
        onSubmit={() => {}}
      />
      <Text dimColor>under cursor: {info}</Text>
    </Box>
  );
};
```

### 3. Line numbers and active-line highlight

Drop-in: pass the bundled `LineNumberPrefix` straight to `linePrefix`.

```tsx
import { TextArea, LineNumberPrefix } from "react-ink-textarea";

<TextArea
  focus
  highlightActiveLine
  activeLineColor="#222"
  initialLineCount={6}
  onSubmit={() => {}}
  linePrefix={LineNumberPrefix}
/>;
```

Custom: `linePrefix` is a render prop. Handle `isContinuationLine` and `isVirtualLine` to draw clean gutters when wrapping or padding. Compose with the bundled `LineNumber` for the digits.

```tsx
import { Text } from "ink";
import { TextArea, LineNumber } from "react-ink-textarea";

<TextArea
  focus
  highlightActiveLine
  initialLineCount={6}
  onSubmit={() => {}}
  linePrefix={({
    lineNumber,
    totalLines,
    isActiveLine,
    isContinuationLine,
    isVirtualLine,
  }) =>
    isContinuationLine ? (
      <Text color="gray">  ↳ </Text>
    ) : (
      <Text>
        <LineNumber
          lineNumber={lineNumber}
          totalLines={totalLines}
          isActive={isActiveLine}
          padChar=" "
          activeColor="cyan"
        />
        <Text color={isVirtualLine ? "gray" : "white"}> │ </Text>
      </Text>
    )
  }
/>;
```

### 4. Inline syntax highlighting

`labels` mixes regex rules with function-form rules for allowlists. First rule wins on overlap. `styles.text` and `styles.invisibleCharacter` are reserved keys; everything else maps to a label name.

```tsx
import { useMemo } from "react";
import { TextArea, type TLabels } from "react-ink-textarea";

const KNOWN_USERS = new Set(["alice", "bob", "carol"]);

const Editor = () => {
  const labels = useMemo<TLabels>(
    () => [
      { pattern: /https?:\/\/\S+/g, label: "url" },
      { pattern: /#\w+/g, label: "tag" },
      // function form: leave unknown @handles unstyled by returning undefined
      {
        pattern: /@(\w+)/g,
        label: (m) => (KNOWN_USERS.has(m[1]) ? "mention" : undefined),
      },
    ],
    [],
  );

  return (
    <TextArea
      focus
      onSubmit={() => {}}
      showInvisibles={{ space: false, tab: true, newline: false }}
      labels={labels}
      styles={{
        text: { color: "white" },
        invisibleCharacter: { color: "gray", dim: true },
        url: { color: "blue", underline: true },
        tag: { color: "magenta" },
        mention: { color: "green", bold: true },
      }}
    />
  );
};
```

### 5. Multi-field form with focus chaining

Boundary callbacks let you escape the textarea cleanly: ↑ on the first row jumps to the field above, ↓ past the last line jumps below, and ←/→ at the absolute ends do the same horizontally.

```tsx
import { Box, useFocusManager, useFocus } from "ink";
import { useState } from "react";
import { TextArea } from "react-ink-textarea";
import TextInput from "ink-text-input";

const Form = () => {
  const { focusNext, focusPrevious } = useFocusManager();
  const subject = useFocus({ id: "subject" });
  const body = useFocus({ id: "body" });
  const tags = useFocus({ id: "tags" });
  const [s, setS] = useState("");
  const [b, setB] = useState("");
  const [t, setT] = useState("");

  return (
    <Box flexDirection="column" gap={1}>
      <TextInput value={s} onChange={setS} focus={subject.isFocused} />
      <TextArea
        focus={body.isFocused}
        value={b}
        onChange={setB}
        onSubmit={() => {}}
        onFirstLineUp={focusPrevious}
        onLastLineDown={focusNext}
        onFirstCharacterLeft={focusPrevious}
        onLastCharacterRight={focusNext}
      />
      <TextInput value={t} onChange={setT} focus={tags.isFocused} />
    </Box>
  );
};
```

### 6. Slash-command picker (arrow + tab handoff)

When a menu opens, suspend cursor navigation with `disableArrowNavigation` and disable `Enter` so the picker — not the textarea — handles them. Re-enable on close.

```tsx
import { Box, Text } from "ink";
import { useState } from "react";
import { TextArea } from "react-ink-textarea";

const COMMANDS = ["/help", "/quit", "/train"];

const Composer = () => {
  const [value, setValue] = useState("");
  const [sel, setSel] = useState(0);
  const open = value.startsWith("/");

  return (
    <Box flexDirection="column">
      <TextArea
        focus
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          if (!open) console.log(v);
        }}
        // While the picker is open, give it the arrows + Enter; typing still flows.
        disableArrowNavigation={open}
        keybindings={open ? { Enter: false } : undefined}
        onTab={(shift) =>
          setSel((i) => (i + (shift ? -1 : 1) + COMMANDS.length) % COMMANDS.length)
        }
      />
      {open && (
        <Box flexDirection="column">
          {COMMANDS.map((c, i) => (
            <Text key={c} color={i === sel ? "cyan" : undefined}>
              {i === sel ? "▸ " : "  "}
              {c}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
```

### 7. Code-editor preset

Override the viewport explicitly, expand tabs, lock down ergonomic chords, and surface the measured content width to a status bar.

```tsx
import { Box, Text } from "ink";
import { useState } from "react";
import { TextArea } from "react-ink-textarea";

const CodeEditor = () => {
  const [width, setWidth] = useState(0);

  return (
    <Box flexDirection="column">
      <TextArea
        focus
        onSubmit={() => {}}
        viewportLines={20}
        tabWidth={2}
        autoNewLineLimit={1}
        showInvisibles
        keybindings={{
          // Single-undo-stack ergonomics: defer undo to the host (e.g. file-level)
          "Ctrl+Z": false,
          // Keep Shift+Enter free for the parent's "submit-with-newline" gesture
          "Shift+Enter": false,
        }}
        onDimensions={setWidth}
      />
      <Text dimColor>width: {width} cols</Text>
    </Box>
  );
};
```

## Props

| Prop                    | Type                                                                                        | Description                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `focus`                 | `boolean`                                                                                   | Whether the textarea is focused and receiving keyboard input.                                                                             |
| `onSubmit`              | `(value: string) => void`                                                                   | Called when the user presses **Enter**. Receives the full text.                                                                           |
| `placeholder`           | `string`                                                                                    | Placeholder text shown when the textarea is empty.                                                                                        |
| `linePrefix`            | `ReactNode \| (props: TLinePrefixProps) => ReactNode`                                       | Optional prefix rendered before each line. The function form receives `{ lineNumber, totalLines, isActiveLine, isVirtualLine, isContinuationLine, continuationIndex }`. Use for line numbers, gutters, borders, etc. |
| `highlightActiveLine`   | `boolean`                                                                                   | When `true`, the active line is highlighted with a subtle background color. Defaults to `false`.                                          |
| `activeLineColor`       | `string`                                                                                    | Background color for the active line highlight. Defaults to no color.                                                                     |
| `cursorInterval`        | `number`                                                                                    | Cursor blink interval in milliseconds. Defaults to `500`.                                                                                 |
| `typingPause`           | `number`                                                                                    | Milliseconds to wait after typing before resuming cursor blink. Defaults to `450`.                                                        |
| `disableCursorBlink`    | `boolean`                                                                                   | When `true`, fully disables cursor blinking — no blink timer runs and the cursor renders as a steady block. Defaults to `false`.          |
| `maxUndo`               | `number`                                                                                    | Maximum number of undo steps to retain. Defaults to `128`.                                                                                |
| `undoGroupDelay`        | `number`                                                                                    | Milliseconds to group consecutive edits into a single undo step. Defaults to `750`.                                                       |
| `autoNewLineLimit`      | `number`                                                                                    | Maximum number of empty lines allowed after the last line with content. Only applies to Down arrow navigation. Defaults to `3`.           |
| `disableArrowNavigation` | `boolean`                                                                                  | When `true`, disables cursor movement via arrow keys (and word/line jumps). Useful for implementing suggestion pickers. Defaults to `false`.                    |
| `keybindings`           | `Partial<Record<TKeybinding, boolean>>`                                                     | Per-chord enable/disable map. Merged over defaults (all `true`). Set a chord to `false` to swallow it. `disableArrowNavigation: true` additionally forces all nav chords off. See **Keybinding Toggles** below.        |
| `initialLineCount`      | `number`                                                                                    | Number of lines to display initially. The textarea will maintain at least this many lines. Defaults to `2`.                               |
| `viewportLines`         | `number`                                                                                    | Maximum number of visual rows rendered at once. The textarea virtualizes rendering and auto-scrolls to keep the cursor visible. Defaults to `floor(stdout.rows * 0.5)` so blink re-renders don't scroll-jank tall buffers when the frame exceeds the terminal viewport. Pass an explicit number to override; `Infinity` renders every row. |
| `tabWidth`              | `number`                                                                                    | Visual width of `\t` characters in cells. Tabs render as `tabWidth` spaces (or `→` + spaces with `showInvisibles.tab`). The stored value keeps `\t`. Defaults to `4`. |
| `value`                 | `string`                                                                                    | **Controlled mode**: The current value of the textarea. When provided, component operates in controlled mode.                             |
| `cursorPosition`        | `[line: number, column: number]`                                                            | **Controlled mode**: The current cursor position as a `[line, column]` tuple. Use with `value` for full control.                          |
| `onChange`              | `(value: string) => void`                                                                   | **Controlled mode**: Called when the value changes.                                                                                       |
| `onCursorChange`        | `(position: [line, column], type: string, chunkIndex: number) => void`                      | **Controlled mode**: Called when the cursor moves. `type` is the label at the cursor (`"text"` if no label matches); `chunkIndex` is the zero-based index of the labeled segment the cursor is in. |
| `onFirstLineUp`         | `() => void`                                                                                | Called when Up arrow is pressed on the first visual row. Useful for moving focus out of the textarea.                                     |
| `onLastLineDown`        | `() => void`                                                                                | Called when Down arrow is pressed on the last line and trailing-empty-line limit is reached. Useful for moving focus out.                 |
| `onFirstCharacterLeft`  | `() => void`                                                                                | Called when Left arrow is pressed at the very start of the value (`cursor === 0`). Useful for moving focus to a previous field.            |
| `onLastCharacterRight`  | `() => void`                                                                                | Called when Right arrow is pressed at the very end of the value (`cursor === value.length`). Useful for moving focus to a next field.       |
| `onTab`                 | `(shift: boolean) => void`                                                                  | Called when Tab is pressed. `shift` is `true` for Shift+Tab. Without this prop, Tab is silently swallowed (no value mutation).            |
| `onDimensions`          | `(width: number) => void`                                                                   | Called with the measured content width whenever it changes.                                                                               |
| `showInvisibles`        | `boolean \| { space?: boolean; tab?: boolean; newline?: boolean }`                          | Render whitespace glyphs (`·` for space, `→` for tab, `↵` for newline). Defaults to `false`.                                              |
| `styles`                | `{ text?, invisibleCharacter?, [labelName]? }` of `TStyleProps`                             | Style overrides for the default text run, invisible glyphs, and any user-defined labels. `color` and `bgColor` accept any value Ink's `<Text>` accepts — see the [Ink color reference](https://github.com/vadimdemedes/ink#color). |
| `labels`                | `readonly { pattern: RegExp; label: string \| ((match: RegExpMatchArray) => string \| undefined) }[]` | Array of label rules. Each rule's `pattern` is matched against the value; matches receive the rule's `label`. Use a function form to allowlist matches — return `undefined` to leave a match unlabeled. First rule wins on overlap. |

## Imperative API (ref)

Pass a `ref` of type `TextAreaHandle` to insert text programmatically — typically from an autocomplete picker. Insertion happens at the current cursor and advances it. Works in both controlled and uncontrolled modes.

```tsx
import { useRef } from "react";
import { TextArea, type TextAreaHandle } from "react-ink-textarea";

const Composer = () => {
  const ref = useRef<TextAreaHandle>(null);
  return (
    <TextArea
      ref={ref}
      focus
      onSubmit={() => {}}
      onTab={() => ref.current?.insert("/help ")}
    />
  );
};
```

| Method                  | Description                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `insert(text: string)`  | Insert `text` at the current cursor and advance it past the inserted text. Empty string is a no-op. |

## Keybindings

| Key             | Action                         |
| --------------- | ------------------------------ |
| `Ctrl+J`        | Insert newline                 |
| `Ctrl+Enter`    | Insert newline                 |
| `Shift+Enter`   | Insert newline                 |
| `Alt+Enter`     | Insert newline (Option+Enter)  |
| `Enter`         | Submit                         |
| `↑` / `↓`       | Move cursor between lines      |
| `←` / `→`       | Move cursor left / right       |
| `Opt+←`         | Jump to previous word          |
| `Opt+→`         | Jump to next word              |
| `Ctrl+A`        | Start of current line          |
| `Ctrl+E`        | End of current line            |
| `Ctrl+W`        | Delete word before cursor      |
| `Ctrl+U`        | Delete to start of line. At column 0, joins with previous line (matches Cmd+Backspace mapping in iTerm2/ghostty). |
| `Ctrl+K`        | Delete to end of line          |
| `Backspace`     | Delete character before cursor |
| `Delete`        | Delete character before cursor (same as `Backspace`) |
| `Opt+Backspace` | Delete word before cursor      |
| `Cmd+Backspace` | Delete to start of line (same as `Ctrl+U`; gated by the `Ctrl+U` toggle) |
| `Ctrl+Z`        | Undo (up to 128 steps)         |
| `Ctrl+Y`        | Redo                           |

> On macOS, `Alt` chords are pressed via the **Option** (`⌥`) key.

### Keybinding Toggles

Pass a `keybindings` map to disable individual chords. Keys are the chord strings themselves; values are `true` (enabled) or `false` (disabled). Anything you don't list defaults to enabled.

```tsx
<TextArea
  focus
  onSubmit={onSubmit}
  keybindings={{
    "Ctrl+Z": false,      // disable undo
    "Shift+Enter": false, // disable Shift+Enter newline (other newline chords still work)
    "Alt+B": false,       // disable previous-word jump
  }}
/>
```

The full chord catalog (every key is a `TKeybinding`):

| Chord            | Action                            |
| ---------------- | --------------------------------- |
| `Enter`          | Submit                            |
| `Ctrl+J`         | Insert newline                    |
| `Ctrl+Enter`     | Insert newline                    |
| `Shift+Enter`    | Insert newline                    |
| `Alt+Enter`      | Insert newline                    |
| `Up`             | Cursor up                         |
| `Down`           | Cursor down                       |
| `Left`           | Cursor left                       |
| `Right`          | Cursor right                      |
| `Alt+B`          | Previous word                     |
| `Alt+F`          | Next word                         |
| `Ctrl+A`         | Start of line                     |
| `Ctrl+E`         | End of line                       |
| `Ctrl+W`         | Delete word before cursor         |
| `Ctrl+U`         | Delete to start of line           |
| `Ctrl+K`         | Delete to end of line             |
| `Backspace`      | Delete grapheme before cursor     |
| `Delete`         | Delete grapheme before cursor     |
| `Alt+Backspace`  | Delete word before cursor         |
| `Ctrl+Z`         | Undo                              |
| `Ctrl+Y`         | Redo                              |

`disableArrowNavigation: true` additionally forces all nav chords (`Up`, `Down`, `Left`, `Right`, `Alt+B`, `Alt+F`, `Ctrl+A`, `Ctrl+E`) off regardless of the map.

## Caveats & limitations

Things to know before shipping. Most are intrinsic to running a rich editor inside a terminal.

<details>
<summary><b>Environment</b></summary>

- **Terminal-only.** Built on Ink — won't render in a browser. Requires Node 18+ for `Intl.Segmenter`. Peer deps: `ink ^7`, `react ^18 || ^19`.
- **Monospace assumption.** Layout assumes every cell is one column wide and CJK / wide chars take two. Variable-width fonts in some emulators (rare) will break alignment.
- **Visual width via `string-width`.** Emoji + ZWJ widths follow Unicode tables; some terminals (notably older macOS Terminal, tmux without `set -g escape-time 0`) render the same glyph at a different cell count and produce off-by-one cursor placement.

</details>

<details>
<summary><b>Keybinding edge cases</b></summary>

- **Modifier+Enter detection is terminal-dependent.** `Ctrl+Enter`, `Shift+Enter`, `Alt+Enter` rely on `modifyOtherKeys` / CSI-u sequences. macOS Terminal.app and Windows console don't emit them by default — use iTerm2, WezTerm, Kitty, or Alacritty, or fall back to `Ctrl+J` for newline.
- **`Alt` on macOS.** Option key inserts special chars (`Opt+B` → `∫`) unless the terminal is set to "Use Option as Meta" (iTerm2: *Profiles → Keys*; Terminal.app: *Profiles → Keyboard → Use Option as Meta key*).
- **`Tab` is silently swallowed without `onTab`.** No newline, no insert, no error. Provide the handler if you want any Tab behavior.
- **`disableArrowNavigation` is not read-only.** Typing still mutates the buffer. Use `focus={false}` for true read-only.
- **Multiple focused TextAreas race.** Ink's `useInput` delivers keys to every active hook; two textareas with `focus={true}` will both mutate. Gate via `focus` per instance.

</details>

<details>
<summary><b>Paste & clipboard</b></summary>

- **Bracketed paste required for one-step paste.** Terminals that don't emit `\x1b[200~` (Windows cmd, very old emulators) deliver pastes as individual keystrokes — slow, and each char becomes its own undo step (effectively breaking `Ctrl+Z` for the paste).
- **No programmatic clipboard.** No copy API; no setter for paste content. Anything the terminal doesn't deliver, the textarea can't see.
- **No mouse.** Click-to-position, drag-select, scroll wheel — none of it. Cursor moves only via keys.

</details>

<details>
<summary><b>Selection & search</b></summary>

- **No selection.** Point cursor only. No range, no shift+arrow extension, no copy of a range.
- **No find/replace.** Build it on top via controlled mode if you need it.

</details>

<details>
<summary><b>Undo</b></summary>

- **Time-grouped, not semantic.** Edits within `undoGroupDelay` (default 2.5 s) collapse into one step. On a slow machine the boundary may land mid-word.
- **Bounded by `maxUndo`** (default 128). Older history is dropped silently.
- **Redo is `Ctrl+Y`.** `Ctrl+Shift+Z` is not bound — terminals can't distinguish it from `Ctrl+Z` (control chars carry no shift bit). Any fresh edit after an undo clears the redo history.

</details>

<details>
<summary><b>Labels & styles</b></summary>

- **Regex runs on every value change.** O(value × rules). Heavy patterns on 100k+ char buffers will lag — debounce externally or scope rules.
- **Flat ranges, no nesting.** A label can't contain another label. First rule wins on overlap; later rules silently lose.
- **Function-form `undefined` ≠ "fall through".** Returning `undefined` leaves the match unlabeled (renders with `text` style). It does not let the next rule try.
- **`color` / `bgColor` strings are passed straight to Ink's `<Text>`.** Invalid values fail silently — the terminal renders default. See the [Ink color reference](https://github.com/vadimdemedes/ink#color).

</details>

<details>
<summary><b>Performance</b></summary>

- **Cursor blink causes re-renders every `cursorInterval` ms (default 500).** Tall frames + slow terminals can flicker. Bump `cursorInterval` or set it high to effectively disable.
- **`viewportLines` defaults to `floor(stdout.rows * 0.5)`.** Without virtualization, frames taller than the terminal trigger scroll-jank on every blink. The default trades render area for stability — override explicitly if you have height to spare.
- **Visual-row recompute is O(value)** per keystroke. Acceptable for chat/comment buffers; pathological for full-file editing of large source files.
- **Resize listener is global.** Every TextArea instance subscribes to `stdout.resize`. Dozens of simultaneous instances will fan out resize events.

</details>

<details>
<summary><b>Data model</b></summary>

- **CRLF/CR normalized to LF on paste and controlled values.** `onChange` always reports LF. If your storage layer needs CRLF, convert on save.
- **`value.length` ≠ visual length.** Tabs count as 1 char regardless of `tabWidth`; emoji count as their UTF-16 code-unit length, not 1 grapheme. Use `Intl.Segmenter` if you need grapheme counts externally.
- **Out-of-bounds `cursorPosition` is clamped silently.** No throw, no warning — `onCursorChange` reports the clamped value.
- **Boundary callbacks fire on exact bounds only.** `onFirstLineUp` only fires when the cursor is *on* row 0 and ↑ is pressed; not "the cursor moved past the top." Same for the other three.
- **`onSubmit` is sync.** No promise return contract — coordinate async validation in your parent component.

</details>

<details>
<summary><b>Virtualization gotchas</b></summary>

- **Rows outside `viewportLines` are not rendered.** Any consumer-side measurement on hidden rows (`useBoxMetrics`, refs in `linePrefix`) won't fire until the row scrolls in.
- **Wrapping happens at the measured content width.** Constrain via a parent `<Box width={...}>` to wrap at a fixed column; otherwise wraps at `stdout.columns`.

</details>

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm run build

# Watch mode
pnpm run dev

# Run tests
pnpm test

# Format code
pnpm run format
```

## License

MIT

