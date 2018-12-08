import React from 'react';
import { storiesOf } from '@storybook/react';
import Sidebar from '../src/components/sidebar';

storiesOf('Sidebar', module).add('with summaries', () => (
  <Sidebar
    title="User API"
    paths={{
      '/pets': {
        summary: 'Pets',
        get: {
          summary: 'Get all pets'
        },
        put: {
          summary: 'Put a pet'
        },
        options: {
          summary: 'Options a pet'
        },
        head: {
          summary: 'Head a pet'
        },
        patch: {
          summary: 'Patch a pet'
        },
        trace: {
          summary: 'Trace a pet'
        },
        post: {
          summary: 'Add a pet'
        },
        delete: {
          summary: 'Delete a pet'
        }
      },
      '/users': {
        summary: 'Users',
        get: {
          summary: 'Get all users'
        },
        post: {
          summary: 'Add a user'
        },
        delete: {
          summary: 'Delete a user'
        }
      }
    }}
  />
));
