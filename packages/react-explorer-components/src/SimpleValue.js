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
  const {type, children, className, ...rest} = props;
  const theme = getTheme(props);
  const style = theme.Syntax[classnamesByType[type]];
  return (
    <span className={cx(theme.Base, className, style)} {...rest}>{children}</span>
  );
}

export default withTheme(SimpleValue);
