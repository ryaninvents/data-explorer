# explorer-bridge-diff

Allows comparison of two JSON objects.

## Installation

```bash
npm i --save explorer-bridge-diff
```

## Usage

```js
import createDiffBridge from 'explorer-bridge-diff';
import createLocalBridge from 'explorer-bridge-local';
import createJsonBridge from 'explorer-bridge-json';
const bridge = createDiffBridge(createJsonBridge(createLocalBridge()));
```
