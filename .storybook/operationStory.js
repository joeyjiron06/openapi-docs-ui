import React from 'react';
import { storiesOf } from '@storybook/react';
import Operation from '../src/components/operation';
import { fullOperation } from '../fixtures/operations';

storiesOf('Operation', module).add('default', () => (
  <Operation
    operation={{
      ...fullOperation('User'),
      servers: [{ url: 'https://server1.com' }, { url: 'https://server2.com' }]
    }}
  />
));
