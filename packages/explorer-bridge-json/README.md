# explorer-bridge-json

Allows inspection of a JSON object, using structural comparison to determine equality.

## Installation

```bash
npm i --save explorer-bridge-json
```

## Usage

```js
import createLocalBridge from 'explorer-bridge-local';
import createJsonBridge from 'explorer-bridge-json';
const bridge = createJsonBridge(createLocalBridge());
```
