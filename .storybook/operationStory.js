import React from 'react';
import { storiesOf } from '@storybook/react';
import Operation from '../src/components/operation';
import { fullOperation } from '../fixtures/operations';
import { fullParameter } from '../fixtures/parameters';

storiesOf('Operation', module).add('default', () => {
  const operation = {
    ...fullOperation('User'),
    servers: [{ url: 'https://server1.com' }, { url: 'https://server2.com' }]
  };
  operation.responses.push({
    tag: { title: '400 BAD REQUEST', color: 'red' },
    headers: {
      description: `response header description.`,
      content: [
        fullParameter(`response header1`),
        fullParameter(`response header2`)
      ]
    },
    body: {
      description: 'This is the description of the response body.',
      content: [
        fullParameter(`response body param1`),
        fullParameter(`response body param2`)
      ]
    }
  });

  return <Operation operation={operation} />;
});
