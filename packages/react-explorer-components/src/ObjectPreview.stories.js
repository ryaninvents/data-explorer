import React from 'react';
import {storiesOf} from '@storybook/react';
import ObjectPreview from './ObjectPreview';
import SimpleValue from './SimpleValue';
import ThemeContext from './ThemeContext';
import monoTheme from './themes/mono';

storiesOf('react-explorer-components/ObjectPreview', module)
  .add('object', () => (
    <ObjectPreview>
      <ObjectPreview.Attribute name="stringValue">
        <SimpleValue type="string">"bar"</SimpleValue>
      </ObjectPreview.Attribute>
      <ObjectPreview.Attribute name="pi">
        <SimpleValue type="number">{Math.PI}</SimpleValue>
      </ObjectPreview.Attribute>
    </ObjectPreview>
  ))
  .add('has more', () => (
    <ObjectPreview hasMore>
      <ObjectPreview.Attribute name="stringValue">
        <SimpleValue type="string">"bar"</SimpleValue>
      </ObjectPreview.Attribute>
      <ObjectPreview.Attribute name="pi">
        <SimpleValue type="number">{Math.PI}</SimpleValue>
      </ObjectPreview.Attribute>
    </ObjectPreview>
  ))
  .add('array', () => (
    <ObjectPreview brackets="[]" hasMore>
      <ObjectPreview.Attribute>
        <SimpleValue type="string">"value"</SimpleValue>
      </ObjectPreview.Attribute>
      <ObjectPreview.Attribute>
        <SimpleValue type="number">{Math.E}</SimpleValue>
      </ObjectPreview.Attribute>
      <ObjectPreview.Attribute>
        <SimpleValue type="regexp">/foo+/</SimpleValue>
      </ObjectPreview.Attribute>
    </ObjectPreview>
  ))
  .add('tag', () => (
    <ObjectPreview
      brackets={[
        <span>{'<'}<SimpleValue type="variable">div</SimpleValue>{' '}</span>,
        ' />',
      ]}
      separator=" "
    >
      <ObjectPreview.Attribute name="className" separator="=">
        <SimpleValue type="string">"foo bar"</SimpleValue>
      </ObjectPreview.Attribute>
      <ObjectPreview.Attribute name="id" separator="=">
        <SimpleValue type="string">"root"</SimpleValue>
      </ObjectPreview.Attribute>
      <ObjectPreview.Attribute name="data-reactroot" />
    </ObjectPreview>
  ))
  .add('with theming', () => (
    <ThemeContext theme={monoTheme}>
      <ObjectPreview
        brackets={[
          <span>{'<'}<SimpleValue type="variable">div</SimpleValue>{' '}</span>,
          ' />',
        ]}
        separator=" "
      >
        <ObjectPreview.Attribute name="className" separator="=">
          <SimpleValue type="string">"foo bar"</SimpleValue>
        </ObjectPreview.Attribute>
        <ObjectPreview.Attribute name="id" separator="=">
          <SimpleValue type="string">"root"</SimpleValue>
        </ObjectPreview.Attribute>
        <ObjectPreview.Attribute name="data-reactroot" />
      </ObjectPreview>
    </ThemeContext>
  ));
