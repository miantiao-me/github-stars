---
project: is-identifier
stars: 27
description: |-
    Check if a string is a valid JavaScript identifier
url: https://github.com/sindresorhus/is-identifier
---

# is-identifier

> Check if a string is a valid [JavaScript identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)

## Install

```sh
npm install is-identifier
```

## Usage

```js
import isIdentifier from 'is-identifier';

isIdentifier('foo');
//=> true

isIdentifier('1kg');
//=> false

isIdentifier('await'); // Reserved identifier
//=> false
```

> [!NOTE]
> Although `globalThis`, `Infinity`, `NaN`, and `undefined` are [properties of the global object](https://tc39.es/ecma262/#sec-value-properties-of-the-global-object) and not identifiers, they are treated as reserved here because they should generally not be used as identifiers.

## API

### isIdentifier(value, options?)

Returns a boolean for whether the given value is a valid JavaScript identifier.

#### options

Type: `object`

##### checkReserved

Type: `boolean`\
Default: `true`

Reject reserved words and global properties like `if`, `await`, and `undefined`.

These are valid identifier syntax but should not be used as variable names, so they are rejected by default. Disable this when you only care about the syntax, such as for property keys (`{if: 1}`) or dot notation (`foo.for`), where they are allowed.

```js
import isIdentifier from 'is-identifier';

isIdentifier('for', {checkReserved: false});
//=> true
```

## Related

- [to-valid-identifier](https://github.com/sindresorhus/to-valid-identifier) - Convert a string to a valid JavaScript identifier
- [identifier-regex](https://github.com/sindresorhus/identifier-regex) - Regular expression for matching valid JavaScript identifiers
- [reserved-identifiers](https://github.com/sindresorhus/reserved-identifiers) - Provides a list of reserved identifiers for JavaScript

