import React from 'react';
import {withTheme, getTheme} from '../ThemeContext';
import toggleOpen from '../toggleOpen';
import Caret from '../Caret';

// TODO: handle open/close via inspector context rather than local state
const ValuePreview = toggleOpen(function ValuePreview(props) {
  const {
    renderKey,
    renderSummary,
    renderValue,
    isOpen,
    toggleIsOpen,
    dimCaret,
    isExpandable,
  } = props;
  const theme = getTheme(props);
  return (
    <div className={theme.Layout.PreviewRow}>
      <div className={theme.Layout.PreviewSummary}>
        <Caret
          isDim={dimCaret}
          isOpen={isOpen}
          isHidden={!isExpandable}
          onClick={toggleIsOpen}
        />{' '}
        {renderKey({isOpen, toggleIsOpen})} {renderSummary({isOpen, toggleIsOpen})}
      </div>
      {renderValue({isOpen, toggleIsOpen})}
    </div>
  );
});

ValuePreview.defaultProps = {
  isExpandable: true,
  renderKey: () => null,
};
export default withTheme(ValuePreview);