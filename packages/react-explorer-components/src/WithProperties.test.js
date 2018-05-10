/* eslint no-unused-expressions: off */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';
import anticipated from 'anticipated-call';
import {WithProperties} from './WithProperties';

Enzyme.configure({adapter: new Adapter()});

describe('WithProperties', () => {
  let mockBridge = null;
  let values = null;
  let renderProp = null;
  function setup() {
    values = new Map();
    mockBridge = {
      getPropertyValue: jest.fn((identifier, descriptor) => {
        const value = values.get(descriptor);
        if (!value) {
          return Promise.reject(new Error('Value not available'));
        }
        return Promise.resolve(value);
      }),
    };
    renderProp = anticipated(jest.fn(() => null));
  }
  
  it('should fetch properties at mount time', async () => {
    setup();
    const descriptors = {
      foo: {name: 'foo'},
      bar: {name: 'bar'},
      baz: {name: 'baz'},
    };
    const ident = {};
    values.set(descriptors.foo, 42);
    const barValue = {};
    values.set(descriptors.bar, barValue);

    // Wait for the 5th render: initial empty mount, first rerender where values are in a
    // "pending" state, and one rerender for each requested property.
    await renderProp.nthCallDuring(5, () => {
      Enzyme.mount(
        <WithProperties
          identifier={ident}
          properties={[descriptors.foo, descriptors.bar, descriptors.baz]}
          runtimeBridge={mockBridge}
          requestedProperties={['foo', 'bar', 'baz']}
        >{renderProp}</WithProperties>
      );
    });

    expect(mockBridge.getPropertyValue.mock.calls.length).to.equal(3);
    expect(mockBridge.getPropertyValue.mock.calls.some(
      ([identifier, descriptor]) => descriptor.name === 'foo')
    ).to.be.true;
    expect(mockBridge.getPropertyValue.mock.calls.some(
      ([identifier, descriptor]) => descriptor.name === 'bar')
    ).to.be.true;
    expect(mockBridge.getPropertyValue.mock.calls.every(
      ([identifier]) => identifier === ident)
    ).to.be.true;

    const valuesInterface = renderProp.mock.calls[renderProp.mock.calls.length - 1][0];
    expect(valuesInterface.getValue('foo')).to.equal(42);
    expect(valuesInterface.getValue('bar')).to.equal(barValue);
    expect(valuesInterface.getValue('baz')).to.equal(undefined);
    expect(valuesInterface.hasError('foo')).to.be.false;
    expect(valuesInterface.hasError('bar')).to.be.false;
    expect(valuesInterface.hasError('baz')).to.be.true;
  });
  it('should fetch new properties as they are added to `requestedProperties`', async () => {
    setup();
    const descriptors = {
      foo: {name: 'foo'},
      bar: {name: 'bar'},
      baz: {name: 'baz'},
    };
    const ident = {};
    values.set(descriptors.foo, 42);
    const barValue = {};
    values.set(descriptors.bar, barValue);
    values.set(descriptors.baz, 'blue');

    let props = {
      identifier: ident,
      properties: [descriptors.foo, descriptors.bar, descriptors.baz],
      runtimeBridge: mockBridge,
      requestedProperties: ['foo', 'bar'],
    };

    let app;

    // Wait for the 4th render: initial empty mount, first rerender where values are in a
    // "pending" state, and one rerender for each requested property.
    await renderProp.nthCallDuring(4, () => {
      app = Enzyme.mount(
        <WithProperties
          {...props}
        >{renderProp}</WithProperties>
      );
    });

    let valuesInterface = renderProp.mock.calls[renderProp.mock.calls.length - 1][0];
    expect(valuesInterface.hasError('baz')).to.be.false;

    mockBridge.getPropertyValue.mockClear();

    props = {
      ...props,
      requestedProperties: ['foo', 'bar', 'baz'],
    };
    
    await renderProp.nthCallDuring(1, () => {
      app.setProps(props);
    });

    expect(mockBridge.getPropertyValue.mock.calls.length).to.equal(1);
    const [, lastCallDescriptor] = mockBridge.getPropertyValue.mock.calls[0];
    expect(lastCallDescriptor).to.equal(descriptors.baz);
    expect(mockBridge.getPropertyValue.mock.calls.every(
      ([identifier]) => identifier === ident)
    ).to.be.true;

    valuesInterface = renderProp.mock.calls[renderProp.mock.calls.length - 1][0];
    expect(valuesInterface.getValue('baz')).to.equal('blue');
    expect(valuesInterface.hasError('baz')).to.be.false;
  });
  it('should store fetch errors');
  describe('should abort fetch', () => {
    it('when `identifier` changes');
    it('on unmount');
  });
});