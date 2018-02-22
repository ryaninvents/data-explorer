import React from 'react';
import SimpleValue from './SimpleValue';
import {HORIZONTAL_ELLIPSIS} from './constants';

function Attribute({name, separator, children}) {
  return (
    <SimpleValue>
      {name ? <SimpleValue type="attributeName">{name}</SimpleValue> : null}
      {(name && children && separator) ? separator : null}
      {children}
    </SimpleValue>
  );
}
Attribute.defaultProps = {
  separator: ': ',
};

function ObjectPreview({brackets, hasMore, separator, children}) {
  const attrs = [];
  children.forEach((child, index, list) => {
    attrs.push(child);
    if (hasMore || index < (list.length - 1)) {
      attrs.push(separator);
    }
  });
  if (hasMore) {
    attrs.push(HORIZONTAL_ELLIPSIS);
  }
  return (
    <SimpleValue>
      {brackets[0]}
      {attrs}
      {brackets[1]}
    </SimpleValue>
  );
}

ObjectPreview.defaultProps = {
  brackets: '{}',
  hasMore: false,
  separator: ', ',
};

ObjectPreview.Attribute = Attribute;

export default ObjectPreview;
