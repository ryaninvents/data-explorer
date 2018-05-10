import React from 'react';
import {storiesOf} from '@storybook/react';
import ObjectMember from './ObjectMember';

storiesOf('react-explorer-components/ObjectMember', module)
  .add('plain', () => (
    <ObjectMember
      property={{
        name: 'foo',
        enumerable: true,
        value: {},
      }}
    />
  ));
