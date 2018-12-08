import React from 'react';
import { storiesOf } from '@storybook/react';
import ParameterTable from '../src/components/parameterTable';

storiesOf('ParameterTable', module).add('default', () => (
  <ParameterTable
    parameters={[
      {
        name: { title: 'email' },
        type: [
          {
            title: 'string',
            subtitles: [{ title: 'email', color: 'default' }],
            headers: [{ title: 'exactly', color: 'default' }]
          }
        ],
        description: 'This is a users email'
      }
    ]}
  />
));
