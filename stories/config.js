import { configure } from '@storybook/react';

function loadStories() {
    // Add `require()` calls here to load all stories.
    require('./ReplEditor.stories');
}

configure(loadStories, module);
