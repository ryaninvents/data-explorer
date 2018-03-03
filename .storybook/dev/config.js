import {configure} from '@storybook/react';
import {injectGlobal} from 'emotion';

const req = require.context('../../packages', true, /.*explorer-[a-z]+\/src\/.*\/[A-Za-z-]+\.stories\.js$/);

function loadStories() {
  injectGlobal({
    'html, body': {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      margin: 0,
    },
    'body': {
      padding: '2rem'
    }
  })
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
