import React from 'react';
import { storiesOf } from '@storybook/react';
import ParameterTable from '../src/components/parameterTable';

storiesOf('ParameterTable', module).add('default', () => (
  <ParameterTable
    parameters={[
      {
        name: { title: 'email' },
        type: {
          subtitles: [{ title: 'email', color: 'default' }],
          headers: [{ title: 'exactly', color: 'default' }],
          titles: [{ title: 'string' }]
        },
        description: 'This is a users email'
      },
      {
        name: { title: 'User' },
        type: {
          titles: [
            {
              title: 'string'
            },
            {
              title: 'User',
              link: '/models/user'
            },
            {
              title: 'Person',
              link: '/models/person'
            }
          ]
        }
      }
    ]}
  />
));
