import React from 'react';
import {storiesOf} from '@storybook/react';
import SimpleValue from './SimpleValue';
import Theme from './themes/default';

storiesOf('react-explorer-components/SimpleValue', module)
  .add('comment', () => <SimpleValue type="comment">{'/* hello world */'}</SimpleValue>)
  .add('string', () => <SimpleValue type="string">&quot;hello&quot;</SimpleValue>)
  .add('number', () => <SimpleValue type="number">{Math.PI}</SimpleValue>)
  .add('regexp', () => <SimpleValue type="regexp">/foo+/</SimpleValue>)
  .add('variable', () => <SimpleValue type="variable">SimpleValue</SimpleValue>)
  .add('functionName', () => (
    <span>
      <SimpleValue type="functionName">confirm</SimpleValue>
      <SimpleValue>()</SimpleValue>
    </span>
  ))
  .add('tag', () => (
    <span>
      <SimpleValue type="bracket" children="<"/>
      <SimpleValue type="tag">SimpleValue</SimpleValue>
      <SimpleValue type="bracket" children="/>"/>
    </span>
  ))
  .add('attribute', () => (
    <SimpleValue>
      <SimpleValue type="bracket" children="<"/>
      <SimpleValue type="tag">SimpleValue</SimpleValue>{' '}
      <SimpleValue type="attributeName">data-attr</SimpleValue>
      =
      <SimpleValue type="string">&quot;value&quot;</SimpleValue>
      <SimpleValue type="bracket" children="/>"/>
    </SimpleValue>
  ));

storiesOf('react-explorer-components/SimpleValue/diff', module)
  .add('value inserted', () => <SimpleValue className={Theme.Diff.Inserted}>Inserted</SimpleValue>)
  .add('value changed', () => <SimpleValue className={Theme.Diff.Changed}>Changed</SimpleValue>)
  .add('value deleted', () => <SimpleValue className={Theme.Diff.Deleted}>Deleted</SimpleValue>);
