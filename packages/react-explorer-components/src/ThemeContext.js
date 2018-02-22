import PropTypes from 'prop-types';
import withContext from 'recompose/withContext';
import getContext from 'recompose/getContext';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import setStatic from 'recompose/setStatic';
import compose from 'recompose/compose';
import defaultTheme from './themes/default';
import {THEME_CONTEXT_KEY} from './constants';

export const ThemePropTypes = {
  [THEME_CONTEXT_KEY]: PropTypes.object.isRequired,
};

const defaultProps = {theme: defaultTheme};

export const withTheme = compose(
  setStatic('defaultProps', defaultProps),
  getContext(ThemePropTypes)
);

export const getTheme = (props) => props[THEME_CONTEXT_KEY] || defaultTheme;

const ThemeContext = compose(
  setDisplayName('ThemeContext'),
  setPropTypes(ThemePropTypes),
  setStatic('defaultProps', defaultProps),
  setStatic('getTheme', getTheme),
  withContext(
    ThemePropTypes,
    ({theme}) => ({[THEME_CONTEXT_KEY]: theme})
  )
)(({children}) => children);

export default ThemeContext;
