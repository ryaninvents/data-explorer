import React from 'react';
import {storiesOf} from '@storybook/react';
import Caret from './Caret';

class Toggle extends React.Component {
  static defaultProps = {defaultToggle: false};
  state = {isToggled: this.props.defaultToggle};
  handleToggle = () => {
    this.setState((state) => ({
      isToggled: !state.isToggled,
    }));
  }
  render() {
    const {handleToggle: onToggle, state: {isToggled}} = this;
    return this.props.children({onToggle, isToggled});
  }
}

storiesOf('react-explorer-components/Caret', module)
  .add('plain', () => <Caret />)
  .add('toggling', () => (
    <Toggle>
      {({isToggled, onToggle}) => (
        <Caret onClick={onToggle} isOpen={isToggled} />
      )}
    </Toggle>
  ))
  .add('dimmed', () => (
    <Toggle>
      {({isToggled, onToggle}) => (
        <Caret onClick={onToggle} isOpen={isToggled} isDim />
      )}
    </Toggle>
  ));
