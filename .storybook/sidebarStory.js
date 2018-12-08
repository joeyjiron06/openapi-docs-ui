import React from 'react';
import { storiesOf } from '@storybook/react';
import Sidebar from '../src/components/sidebar';

storiesOf('Sidebar', module).add('default', () => (
  <Sidebar
    title="User API"
    version="6.0.2"
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
