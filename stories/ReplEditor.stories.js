import React from 'react';
import { storiesOf } from '@storybook/react';

import ReplEditor from '../src/ReplEditor';

storiesOf('ReplEditor')
    .add('plain', () => (
        <div>
            <ReplEditor />
            <hr />
        </div>
    ));
