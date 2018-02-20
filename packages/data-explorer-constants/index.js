/** Specially handled JS value subtypes. */
exports.JS_SUBTYPES = [
  'array',
  'null',
  'node',
  'regexp',
  'date',
  'map',
  'set',
  'weakmap',
  'weakset',
  'iterator',
  'generator',
  'error',
  'proxy',
  'promise',
  'typedarray',
];

/** Possible results of `typeof`. */
exports.JsType = {
  Object: 'object',
  Function: 'function',
  Undefined: 'undefined',
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Symbol: 'symbol',
};

exports.DiffMarker = {
  Added: 'Added',
  Removed: 'Removed',
  Changed: 'Changed',
  Same: 'Same',
};
