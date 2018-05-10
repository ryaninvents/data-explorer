import React from 'react';
import {cx} from 'emotion';
import {withTheme, getTheme} from './ThemeContext';

const classnamesByType = {
  comment: 'Comment',
  string: 'String',
  number: 'Number',
  regexp: 'Regexp',
  variable: 'Variable',
  key: 'Key',
  functionName: 'FunctionName',
  tag: 'Tag',
  attributeName: 'AttributeName',
};

export function SimpleValue(props) {
  const {type, children, className, diff, ...rest} = props;
  const theme = getTheme(props);
  let style = theme.Syntax[classnamesByType[type]];
  if (diff) {
    style = cx(style, diff);
  }
  return (
    <span className={cx(theme.Base, className, style)} {...rest}>{children}</span>
  );
}

export default withTheme(SimpleValue);
