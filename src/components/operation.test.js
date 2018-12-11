import React from 'react';
import Operation from './operation';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { minimalOperation, fullOperation } from '../../fixtures/operations';

describe('<Operation />', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    cleanup();
  });

  it('should render the title', () => {
    const operation = minimalOperation();
    const { getByText } = render(<Operation operation={operation} />);
    expect(getByText(operation.title)).toBeInTheDocument();
  });

  it('should render the tags', () => {
    const operation = fullOperation('Tag Test');
    const { getByText } = render(<Operation operation={operation} />);

    operation.tags.forEach(tag => {
      expect(getByText(tag)).toBeInTheDocument();
    });
  });

  it('should render the deprecated tag when deprecated is true', () => {
    const operation = fullOperation('Deprecated Test');
    const { getByText } = render(
      <Operation
        operation={{
          ...operation,
          deprecated: true
        }}
      />
    );

    expect(getByText('DEPRECATED')).toBeInTheDocument();
  });

  it('should render the authentication banner with authRequired is true', () => {
    const operation = fullOperation('Auth Test');
    const { getByText } = render(
      <Operation operation={{ ...operation, authRequired: true }} />
    );

    expect(getByText('This api requires authentication')).toBeInTheDocument();
  });

  it('should render the simple text description', () => {
    const operation = fullOperation('Description Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText(operation.description)).toBeInTheDocument();
  });

  it('should render the markdown description', () => {
    const operation = fullOperation('Markdown Description Test');
    const { getByText } = render(
      <Operation operation={{ ...operation, description: `# hello header` }} />
    );

    const descriptionHeaderEl = getByText('hello header');
    expect(descriptionHeaderEl).toBeInTheDocument();
    expect(descriptionHeaderEl.tagName).toBe('H1');
  });

  it('should render the server dropdown when servers are given', () => {
    const operation = fullOperation('Server Test');
    const { queryBySelectText } = render(<Operation operation={operation} />);

    expect(queryBySelectText(operation.servers[0].url)).toBeInTheDocument();
  });

  it('should render the request url and method from the server', () => {
    const operation = fullOperation('Request Url Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText('Request')).toBeInTheDocument();
    expect(
      getByText(`${operation.httpMethod} ${operation.servers[0].url}`)
    ).toBeInTheDocument();
  });

  it('should update the url when a value is selected from the server list', () => {
    const operation = fullOperation('Update Request Url Test');
    const servers = [
      { url: 'https://server1.com' },
      { url: 'https://server2.com' }
    ];
    const { queryBySelectText, getByText } = render(
      <Operation
        operation={{
          ...operation,
          servers
        }}
      />
    );

    fireEvent.change(queryBySelectText(servers[0].url), {
      target: {
        value: servers[1].url
      }
    });

    expect(
      getByText(`${operation.httpMethod} ${servers[1].url}`)
    ).toBeInTheDocument();
  });

  it('should render the path parameters', () => {
    const operation = fullOperation('Path Params Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText('Path Parameters')).toBeInTheDocument();
    operation.parameters.path.forEach(({ name, description }) => {
      expect(getByText(name.title)).toBeInTheDocument();
      expect(getByText(description)).toBeInTheDocument();
    });
  });

  it('should render the query parameters', () => {
    const operation = fullOperation('Query Params Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText('Query Parameters')).toBeInTheDocument();
    operation.parameters.query.forEach(({ name, description }) => {
      expect(getByText(name.title)).toBeInTheDocument();
      expect(getByText(description)).toBeInTheDocument();
    });
  });

  it('should render the header parameters', () => {
    const operation = fullOperation('Header Params Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText('Header Parameters')).toBeInTheDocument();
    operation.parameters.header.forEach(({ name, description }) => {
      expect(getByText(name.title)).toBeInTheDocument();
      expect(getByText(description)).toBeInTheDocument();
    });
  });

  it('should render the coookie parameters', () => {
    const operation = fullOperation('Cookie Params Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText('Cookie Parameters')).toBeInTheDocument();
    operation.parameters.cookie.forEach(({ name, description }) => {
      expect(getByText(name.title)).toBeInTheDocument();
      expect(getByText(description)).toBeInTheDocument();
    });
  });

  it('should render the request body', () => {
    const operation = fullOperation('Request Body Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText('Request Body')).toBeInTheDocument();
    expect(getByText(operation.requestBody.description)).toBeInTheDocument();
    operation.requestBody.content.forEach(({ name, description }) => {
      expect(getByText(name.title)).toBeInTheDocument();
      expect(getByText(description)).toBeInTheDocument();
    });
    operation.requestBody.tags.forEach(({ title }) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });

  it('should not render the request body description when none is given', () => {
    const operation = fullOperation('No Request Body Description Test');
    const { queryByTestId } = render(
      <Operation
        operation={{
          ...operation,
          requestBody: {
            ...operation.requestBody,
            description: undefined
          }
        }}
      />
    );

    expect(
      queryByTestId('operationRequestBodyDescription')
    ).not.toBeInTheDocument();
  });

  it('should not render the request body tags when none is given', () => {
    const operation = fullOperation('No Request Body Description Test');
    const { queryByTestId } = render(
      <Operation
        operation={{
          ...operation,
          requestBody: {
            ...operation.requestBody,
            tags: undefined
          }
        }}
      />
    );

    expect(queryByTestId('operationRequestBodyTags')).not.toBeInTheDocument();
  });

  it('should render the request body when markdown is given', () => {
    const operation = fullOperation('No Request Body Description Test');
    const { getByText } = render(
      <Operation
        operation={{
          ...operation,
          requestBody: {
            ...operation.requestBody,
            description: '# My Markdown'
          }
        }}
      />
    );

    const requestBodyDescriptionEl = getByText('My Markdown');
    expect(requestBodyDescriptionEl).toBeInTheDocument();
    expect(requestBodyDescriptionEl.tagName).toBe('H1');
  });

  it('should render the responses', () => {
    const operation = fullOperation('Responses Test');
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText('Responses')).toBeInTheDocument();
    operation.responses.forEach(({ tag, headers, body }) => {
      expect(getByText(tag.title)).toBeInTheDocument();

      expect(getByText('Headers')).toBeInTheDocument();
      expect(getByText(headers.description)).toBeInTheDocument();

      headers.content.forEach(({ name, type, description }) => {
        expect(getByText(name.title)).toBeInTheDocument();
        expect(getByText(description)).toBeInTheDocument();

        type.titles.forEach(({ title }) => {
          expect(getByText(title)).toBeInTheDocument();
        });
      });

      expect(getByText('Body')).toBeInTheDocument();
      expect(getByText(body.description)).toBeInTheDocument();

      body.content.forEach(({ name, type, description }) => {
        expect(getByText(name.title)).toBeInTheDocument();
        expect(getByText(description)).toBeInTheDocument();

        type.titles.forEach(({ title }) => {
          expect(getByText(title)).toBeInTheDocument();
        });
      });
    });
  });

  it('should NOT render optional operation props', () => {
    const { queryByText, queryByTestId } = render(
      <Operation
        operation={minimalOperation({
          parameters: {}
        })}
      />
    );

    expect(queryByTestId('operationDescription')).not.toBeInTheDocument();
    expect(
      queryByTestId('This api requires authentication')
    ).not.toBeInTheDocument();
    expect(queryByText('DEPRECATED')).not.toBeInTheDocument();

    expect(queryByText('Request Body')).not.toBeInTheDocument();
    expect(queryByTestId('operationRequestBody')).not.toBeInTheDocument();

    expect(queryByText('Path Parameters')).not.toBeInTheDocument();
    expect(queryByText('Query Parameters')).not.toBeInTheDocument();
    expect(queryByText('Header Parameters')).not.toBeInTheDocument();
    expect(queryByText('Cookie Parameters')).not.toBeInTheDocument();
  });
});
