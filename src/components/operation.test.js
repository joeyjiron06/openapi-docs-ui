import React from 'react';
import Operation from './operation';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import {
  render,
  within,
  cleanup,
  getByValue,
  getByTestId
} from 'react-testing-library';
import { simpleParameters } from '../../fixtures/parameters';
import { simpleResponses } from '../../fixtures/responses';

// full operation
const operation = {
  title: 'Create User',
  httpMethod: 'POST',
  responses: [],
  tags: ['users', 'create'],
  deprecated: false,
  authRequired: false,
  description:
    'A short description of the api. CommonMark syntax MAY be used for the rich text representation.',
  servers: [
    {
      url: 'https://qa.googleapis.com/gmail/v1/users/{userId}/',
      description: 'QA Server'
    }
  ],
  parameters: {
    path: simpleParameters,
    query: simpleParameters,
    header: simpleParameters
  },
  requestBody: {
    description: '## This is the request body description',
    tags: [{ title: 'Can be null' }],

    // todo figure out multiple content types
    content: simpleParameters
  },
  responses: simpleResponses
};

const simpleOperation = {
  title: 'Create User',
  httpMethod: 'POST',
  servers: [
    {
      url: 'https://qa.googleapis.com/gmail/v1/users/{userId}/'
    }
  ],

  responses: [
    {
      tag: { title: '200 OK' },
      headers: {
        content: [
          {
            name: {
              title: 'bearerTokenInResponseHeader'
            },
            type: {
              titles: [{ title: 'stringInResponseHeader' }]
            }
          }
        ]
      },
      body: {
        content: [
          {
            name: {
              title: 'userEmailNameInBody'
            },
            type: {
              titles: [{ title: 'userEmailTypeInBody' }]
            }
          }
        ]
      }
    }
  ]
};

describe('<Operation />', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    cleanup();
  });

  it('should render the title', () => {
    const { getByText } = render(<Operation operation={operation} />);
    expect(getByText(operation.title)).toBeInTheDocument();
  });

  it('should render the tags', () => {
    const { getByText } = render(<Operation operation={operation} />);

    operation.tags.forEach(tag => {
      expect(getByText(tag)).toBeInTheDocument();
    });
  });

  it('should render the deprecated tag when deprecated is true', () => {
    const { getByText } = render(
      <Operation operation={{ ...operation, deprecated: true }} />
    );

    expect(getByText('DEPRECATED')).toBeInTheDocument();
  });

  it('should render the authentication banner with authRequired is true', () => {
    const { getByText } = render(
      <Operation operation={{ ...operation, authRequired: true }} />
    );

    expect(getByText('This api requires authentication')).toBeInTheDocument();
  });

  it('should render the simple text description', () => {
    const { getByText } = render(<Operation operation={operation} />);

    expect(getByText(operation.description)).toBeInTheDocument();
  });

  it('should render the markdown description', () => {
    const { getByText } = render(
      <Operation operation={{ ...operation, description: `# hello header` }} />
    );

    const descriptionHeaderEl = getByText('hello header');
    expect(descriptionHeaderEl).toBeInTheDocument();
    expect(descriptionHeaderEl.tagName).toBe('H1');
  });

  it('should render the server dropdown when servers are given', () => {
    const { queryBySelectText } = render(
      <Operation operation={{ ...operation }} />
    );

    expect(queryBySelectText(operation.servers[0].url)).toBeInTheDocument();
  });

  it('should render the request url and method from the server', () => {
    const { getByText } = render(<Operation operation={{ ...operation }} />);

    expect(getByText('Request')).toBeInTheDocument();
    expect(
      getByText(`${operation.httpMethod} ${operation.servers[0].url}`)
    ).toBeInTheDocument();
  });

  it.skip('should update the url when a value is selected from the server list', () => {});

  it('should render the path parameters', () => {
    const { getByText } = render(<Operation operation={{ ...operation }} />);

    operation.parameters.path[0].name.title;

    expect(getByText('Path Parameters')).toBeInTheDocument();
    expect(
      getByText(operation.parameters.path[0].name.title)
    ).toBeInTheDocument();
  });

  it('should render the query parameters', () => {
    const opWithQuery = {
      ...operation,
      parameters: {
        query: [
          {
            name: {
              title: 'userEmailInQuery'
            },
            type: {
              titles: [{ title: 'string' }]
            }
          }
        ]
      }
    };
    const { getByText } = render(<Operation operation={opWithQuery} />);

    expect(getByText('Query Parameters')).toBeInTheDocument();
    expect(
      getByText(opWithQuery.parameters.query[0].name.title)
    ).toBeInTheDocument();
  });

  it('should render the header parameters', () => {
    const opWithHeaders = {
      ...operation,
      parameters: {
        header: [
          {
            name: {
              title: 'bearerTokenInHeader'
            },
            type: {
              titles: [{ title: 'string' }]
            }
          }
        ]
      }
    };
    const { getByText } = render(<Operation operation={opWithHeaders} />);

    expect(getByText('Header Parameters')).toBeInTheDocument();
    expect(
      getByText(opWithHeaders.parameters.header[0].name.title)
    ).toBeInTheDocument();
  });

  it('should render the coookie parameters', () => {
    const opWithCookies = {
      ...operation,
      parameters: {
        cookie: [
          {
            name: {
              title: 'bearerTokenInHeader'
            },
            type: {
              titles: [{ title: 'string' }]
            }
          }
        ]
      }
    };
    const { getByText } = render(<Operation operation={opWithCookies} />);

    expect(getByText('Cookie Parameters')).toBeInTheDocument();
    expect(
      getByText(opWithCookies.parameters.cookie[0].name.title)
    ).toBeInTheDocument();
  });

  it('should render the request body', () => {
    const opWithBody = {
      ...operation,
      requestBody: {
        description: '## This is the request body description',
        tags: [{ title: 'Can be null' }],
        content: [
          {
            name: {
              title: 'requestBodyNametitle'
            },
            type: {
              titles: [{ title: 'string' }]
            }
          }
        ]
      }
    };
    const { getByText } = render(<Operation operation={opWithBody} />);

    expect(getByText('Request Body')).toBeInTheDocument();
    opWithBody.requestBody.tags.forEach(({ title }) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });

  it('should render the responses', () => {
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
      <Operation operation={simpleOperation} />
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
