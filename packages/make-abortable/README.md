# @ryaninvents/make-abortable

Wrap any Promise to allow you to abort it later.

## Installation

```bash
npm i --save @ryaninvents/make-abortable
```

## Usage

```js
const promise = makeAbortable(someOtherPromise);

// then, if you need to cancel...
promise.controller.abort();
```
