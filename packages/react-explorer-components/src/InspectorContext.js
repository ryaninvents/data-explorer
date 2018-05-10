import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withContext from 'recompose/withContext';
import getContext from 'recompose/getContext';

export const InspectorPropTypes = {
  runtimeBridge: PropTypes.object.isRequired,
};

export const connect = getContext(InspectorPropTypes);

export default compose(
  withContext(
    InspectorPropTypes,
    ({runtimeBridge}) => ({runtimeBridge})
  )
)(({children}) => children);
