import React from 'react';
import { storiesOf } from '@storybook/react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ParameterTable from '../src/components/parameterTable';

storiesOf('ParameterTable', module).add('default', () => {
  const styles = StyleSheet.create({
    root: {
      minWidth: 700,
      margin: 10
    }
  });

  return (
    <ParameterTable
      className={styles.root}
      parameters={[
        {
          name: {
            title: 'email',
            subtitles: [
              { title: 'required', color: 'red' },
              {
                title: 'deprecated',
                color: 'yellow'
              }
            ]
          },
          type: {
            subtitles: [{ title: 'email', color: 'default' }],
            titles: [{ title: 'string' }, { title: 'integer' }]
          },
          description: 'This is a users email'
        },
        {
          name: { title: 'user' },
          type: {
            headers: [{ title: 'array of any of' }],
            subtitles: [
              { title: 'email' },
              { title: 'user' },
              { title: 'person' }
            ],
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
          },
          description: `
            **User Type**

            Can be one of the following
          `
            .split('\n')
            .map(line => line.trim())
            .join('\n')
        }
      ]}
    />
  );
});
