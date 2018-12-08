import React from 'react';
import ParameterTable from './parameterTable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import { render, within, cleanup } from 'react-testing-library';

describe('<ParameterTable />', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    cleanup();
  });

  it('should render the table headers', () => {
    const parameters = [
      {
        name: { title: '' },
        type: { titles: [{ title: '' }] }
      }
    ];
    const { getByText } = render(<ParameterTable parameters={parameters} />);

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Type')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
  });

  it('should render the parameters with subtitles and headers', () => {
    const parameters = [
      {
        name: {
          title: 'userEmail',
          subtitles: [{ title: 'required', color: 'red' }]
        },
        type: {
          titles: [{ title: 'string' }],
          subtitles: [{ title: 'email', color: 'default' }],
          headers: [{ title: 'exactly', color: 'default' }]
        }
      }
    ];

    const { getByText } = render(<ParameterTable parameters={parameters} />);

    parameters.forEach(parameter => {
      expect(getByText(parameter.name.title)).toBeInTheDocument();

      parameter.name.subtitles.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });

      parameter.type.titles.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });

      parameter.type.subtitles.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });

      parameter.type.headers.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });
    });
  });

  it('should render a simple text description', () => {
    const parameters = [
      {
        name: { title: 'email' },
        type: {
          titles: [{ title: 'string' }]
        },
        description: 'This is the email of the user'
      }
    ];

    const { getByText } = render(<ParameterTable parameters={parameters} />);

    parameters.forEach(parameter => {
      expect(getByText(parameter.description)).toBeInTheDocument();
    });
  });

  it('should render a markdown description', () => {
    const parameters = [
      {
        name: { title: 'email' },
        type: {
          titles: [{ title: 'string' }]
        },
        description: `
          # Header1
          Some text here

          **bold text**

          - listItem1
          - listItem2
        `
          .split('\n')
          .map(line => line.trim())
          .join('\n')
      }
    ];

    const { getByText } = render(<ParameterTable parameters={parameters} />);

    expect(getByText('Header1')).toContainHTML('<h1>Header1</h1>');
    expect(getByText('Some text here')).toContainHTML('<p>Some text here</p>');
    expect(getByText('listItem1')).toContainHTML('<li>listItem1</li>');
    expect(getByText('listItem2')).toContainHTML('<li>listItem2</li>');
  });

  it('should render links when a parameter has a link', () => {
    const parameters = [
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
    ];

    const { getByTestId } = render(<ParameterTable parameters={parameters} />);

    const parameterTypeContainer = getByTestId('parameter-type');

    expect(within(parameterTypeContainer).getByText('User')).toHaveAttribute(
      'href',
      '/models/user'
    );
    expect(within(parameterTypeContainer).getByText('Person')).toHaveAttribute(
      'href',
      '/models/person'
    );
  });
});
