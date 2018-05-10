import React from 'react';
import ObjectPreview from './ObjectPreview';
import ValuePreview from './values/ValuePreview';

function Key({property, ...props}) {
  return (
    <ObjectPreview.Attribute
      {...props}
      name={property.name}
      diff={property.data && property.data.diff}
    />
  );  
}

function ObjectMember({property}) {
  return (
    <ValuePreview
      renderKey={({isOpen, toggleIsOpen}) => (
        <Key property={property} onClick={toggleIsOpen} />
      )}
      renderSummary={() => null}
      renderValue={() => null}
      dimCaret={!property.enumerable}
      isExpandable={property.value !== null}
    />
  );
}

Object.assign(ObjectMember, {Key});

export default ObjectMember;