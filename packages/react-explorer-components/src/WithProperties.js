import React from 'react';
import PropTypes from 'prop-types';
import makeAbortable from 'make-abortable';
import AbortController from 'abort-controller';

/**
 * Render-prop component which loads values for the specified properties.
 * 
 * @example
 *     <WithProperties
 *       identifier={this.props.value.identifier}
 *       properties={this.props.properties}
 *       runtimeBridge={this.props.runtimeBridge}
 *       requestedProperties={['innerText', 'className']}
 *     >
 *       {(values) => (
 *         <div>
 *           <div>innerText = {values.getValue('innerText')}</div>
 *           <div>className = {values.getValue('className')}</div>
 *         </div>
 *       )}
 *     </WithProperties>
 */
export default class WithProperties extends React.Component {
  static propTypes = {
    /** Value identifier as returned by the runtime bridge. */
    identifier: PropTypes.any,
    /** Array of property descriptors. */
    properties: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** List of keys for which the property values are required. */
    requestedProperties: PropTypes.arrayOf(PropTypes.string).isRequired,

    runtimeBridge: PropTypes.object.isRequired,

    /** Function that gets called with `valuesInterface` as its only argument. */
    children: PropTypes.func.isRequired,
  }

  /** Stores the reported value of requested props. */
  propValues = new Map();

  /** Stores any errors returned while fetching a prop. */
  propErrors = new Map();

  /** Stores the `propName` of any props for which we're awaiting a response. */
  pendingPropFetches = new Set();

  /** Cancel outstanding promises, e.g. when component unmounts or identifier changes. */
  abortController = new AbortController();

  /** Interface passed as argument to render prop. */
  valuesInterface = {
    getValue: (key) => this.propValues.get(key),
    getError: (key) => this.propErrors.get(key),
    hasValue: (key) => this.propValues.has(key),
    hasError: (key) => this.propErrors.has(key),
    isLoading: (key) => this.pendingPropFetches.has(key),
    invalidate: (key) => {
      this.propValues.delete(key);
      this.propErrors.delete(key);
      if (this.props.requestedProperties.includes(key)) {
        this.fetchProperties();
      }
    },
  };

  componentDidMount() {
    this.fetchProperties();
  }

  componentWillReceiveProps(nextProps) {
    const propsHaveChanged = nextProps.properties !== this.props.properties;
    const identHasChanged = nextProps.identifier !== this.props.identifier;

    if (identHasChanged) {
      this.clearLocalState();
      this.forceUpdate();
    }
    
    if (propsHaveChanged || identHasChanged) {
      this.fetchProperties(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearLocalState();
  }

  fetchProperties({identifier, runtimeBridge, properties, requestedProperties} = this.props) {
    requestedProperties.forEach((propName) => {
      if (
        this.propValues.has(propName) ||
        this.propErrors.has(propName) ||
        this.pendingPropFetches.has(propName)
      ) return;

      const matchingDescriptor = properties.find((p) => p.name === propName);
      if (!matchingDescriptor) return;

      this.pendingPropFetches.add(propName);
      this.abortController.abort();
      this.abortController = new AbortController();

      // Aborting the promise is an easy way to avoid certain edge cases,
      // such as when a promise returns after unmount, or after the
      // `identifier` has changed.
      makeAbortable(
        runtimeBridge.getPropertyValue(identifier, matchingDescriptor),
        {signal: this.abortController.signal}
      ).then((value) => {
        this.propValues.set(propName, value);
        this.pendingPropFetches.delete(propName);

        this.forceUpdate();
      }).catch((err) => {
        this.pendingPropFetches.delete(propName);

        if (err.name !== 'AbortError') {
          this.propErrors.set(propName, err);
        }

        this.forceUpdate();
      });
    });

    // Immediately force update so that children can take advantage of
    // loading state (e.g. display a spinner).
    this.forceUpdate();
  }

  clearLocalState() {
    this.abortController.abort();
    this.pendingPropFetches.clear();
    this.propValues.clear();
    this.propErrors.clear();
  }

  render() {
    return this.props.children(this.valuesInterface);
  }
}