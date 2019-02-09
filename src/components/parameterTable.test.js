import React from 'react';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import ParameterTable from './parameterTable';
import { fullParameter } from '../../fixtures/parameters';

describe('<ParameterTable />', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    cleanup();
  });

  it('should render the table headers', () => {
    const parameters = [fullParameter('Table Header Test')];
    const { getByText } = render(<ParameterTable rows={parameters} />);

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Type')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
  });

  it('should render the parameters with subtitles and headers', () => {
    const parameters = [fullParameter('param1'), fullParameter('param2'), fullParameter('param3')];

    const { getByText } = render(<ParameterTable rows={parameters} />);

    parameters.forEach((parameter) => {
      parameter.name.titles.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });

      parameter.name.headers.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });

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
    const parameters = [fullParameter('param1'), fullParameter('param2'), fullParameter('param3')];

    const { getByText } = render(<ParameterTable rows={parameters} />);

    parameters.forEach((parameter) => {
      expect(getByText(parameter.description)).toBeInTheDocument();
    });
  });

  it('should render a markdown description', () => {
    const parameters = [
      {
        ...fullParameter('param1'),
        description: `
        # Header1
        Some text here

        **bold text**

        - listItem1
        - listItem2
      `
          .split('\n')
          .map(line => line.trim())
          .join('\n'),
      },
    ];

    const { getByText } = render(<ParameterTable rows={parameters} />);

    expect(getByText('Header1')).toContainHTML('<h1>Header1</h1>');
    expect(getByText('Some text here')).toContainHTML('<p>Some text here</p>');
    expect(getByText('listItem1')).toContainHTML('<li>listItem1</li>');
    expect(getByText('listItem2')).toContainHTML('<li>listItem2</li>');
  });

  it('should render links when a parameter has a link', () => {
    const param1 = fullParameter('param1');
    const param2 = fullParameter('param2');
    const parameters = [param1, param2];
    const { getByText } = render(<ParameterTable rows={parameters} />);

    expect(getByText(param1.type.titles[0].title)).toBeInTheDocument();
    expect(getByText(param1.type.titles[0].title)).toHaveAttribute(
      'href',
      param1.type.titles[0].link,
    );

    expect(getByText(param2.type.titles[0].title)).toBeInTheDocument();
    expect(getByText(param2.type.titles[0].title)).toHaveAttribute(
      'href',
      param2.type.titles[0].link,
    );
  });
});
