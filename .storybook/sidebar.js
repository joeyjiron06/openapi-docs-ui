import React from 'react';
import { storiesOf } from '@storybook/react';
import Sidebar from '../src/components/sidebar';

storiesOf('Sidebar', module).add('with summaries', () => (
  <Sidebar
    sections={[
      { title: 'API', items: [{ title: 'Overview' }] },
      {
        title: 'Pets',
        items: [
          { title: 'Get all pets' },
          { title: 'Post a pet' },
          { title: 'Delete a pet' }
        ]
      },
      {
        title: 'Users',
        items: [
          { title: 'Get users' },
          { title: 'Add a user' },
          { title: 'Delete users' }
        ]
      }
    ]}
  />
));
