import React from 'react';
import get from 'lodash/get';
import WithProperties from './WithProperties';

const LENGTH_PROP_KEY = ['length'];

export function IterableProperties({requestedProperties, children, ...props}) {
  return (
    <WithProperties
      {...props}
      requestedProperties={LENGTH_PROP_KEY}
    >
      {(values) => (
        <WithProperties
          {...props}
          requestedProperties={[
            ...requestedProperties,
            ...Array.from(
              Array(Number(get(values.get('length'), 'description', 0))),
              (_, i) => i
            ),
          ]}
        >
          {children}
        </WithProperties>
      )}
    </WithProperties>
  );
}

IterableProperties.propTypes = {
  ...WithProperties.propTypes,
};
