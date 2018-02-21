import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';
import Caret from './Caret';

Enzyme.configure({adapter: new Adapter()});

describe('Caret', () => {
  it('should render', () => {
    expect(Enzyme.mount(<Caret />)).to.be.ok;
  });
});
