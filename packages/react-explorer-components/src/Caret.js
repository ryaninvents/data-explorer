import React from 'react';
import PropTypes from 'prop-types';
import {css, cx} from 'emotion';

import Icon from '@fortawesome/react-fontawesome';
import {faCaretRight} from '@fortawesome/fontawesome-free-solid';

const caretStyle = css({
  label: 'Caret',
  color: 'gray',
  cursor: 'pointer',
  display: 'inline-block',
  transform: 'rotate(0deg)',
  transition: 'transform 200ms, opacity 200ms',
  '&[data-is-open=true]': {
    transform: 'rotate(90deg)',
  },
  '&[data-hide=true]': {
    pointerEvents: 'none',
    '&, &[data-dim=true]': {
      opacity: 0,
    },
  },
  '&[data-dim=true]': {
    opacity: 0.3,
  },
});

function Caret({
  isOpen, isDim, isHidden, className, caretClassName, ...rest
}) {
  return (
    <span
      className={cx(caretClassName, className)}
      data-is-open={isOpen}
      data-dim={isDim}
      data-hide={isHidden}
      {...rest}
    >
      <Icon icon={faCaretRight} />
    </span>
  );
};

Caret.propTypes = {
  isOpen: PropTypes.bool,
  isDim: PropTypes.bool,
  isHidden: PropTypes.bool,
  className: PropTypes.string,
  caretClassName: PropTypes.string,
};

Caret.defaultProps = {
  isOpen: false,
  isDim: false,
  isHidden: false,
  className: '',
  caretClassName: caretStyle,
};

export default Caret;
