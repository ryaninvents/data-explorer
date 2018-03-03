import {configure} from '@storybook/react';
import {injectGlobal} from 'emotion';
import importAll from 'import-all.macro';

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
  importAll.sync('../../packages/*/src/**/*.stories.js');
}

configure(loadStories, module);
