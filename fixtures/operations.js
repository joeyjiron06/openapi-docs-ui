import { fullParameter } from './parameters';

// full operation
export const fullOperation = (operationName, overrides) => ({
  title: operationName,
  httpMethod: 'POST',
  responses: [
    {
      tag: { title: '200 OK', color: 'green' },
      headers: {
        description: `${operationName} response header description.`,
        content: [
          fullParameter(`${operationName} response header1`),
          fullParameter(`${operationName} response header2`),
        ],
      },
      body: {
        description: 'This is the description of the response body.',
        content: [
          fullParameter(`${operationName} response body param1`),
          fullParameter(`${operationName} response body param2`),
        ],
      },
    },
  ],
  tags: ['users', 'create'],
  deprecated: true,
  authRequired: true,
  description:
    'A short description of the api. CommonMark syntax MAY be used for the rich text representation.',
  servers: [
    {
      url: 'https://qa.googleapis.com/gmail/v1/users/{userId}/',
      description: 'QA Server',
    },
  ],
  parameters: {
    path: [
      fullParameter(`${operationName} path parameter 1`),
      fullParameter(`${operationName} path parameter 2`),
    ],
    query: [
      fullParameter(`${operationName} query parameter 1`),
      fullParameter(`${operationName} query parameter 2`),
    ],
    header: [
      fullParameter(`${operationName} header parameter 1`),
      fullParameter(`${operationName} header parameter 2`),
    ],
    cookie: [
      fullParameter(`${operationName} cookie parameter 1`),
      fullParameter(`${operationName} cookie parameter 2`),
    ],
  },
  requestBody: {
    description: 'This is the request body description',
    tags: [{ title: 'Can be null', color: 'green' }],

    content: [
      fullParameter(`${operationName} request body param1`),
      fullParameter(`${operationName} request body param2`),
    ],
  },
  ...overrides,
});

// mininum values needed to render an operation
export const minimalOperation = overrides => ({
  title: 'Create User',
  httpMethod: 'POST',
  servers: [
    {
      url: 'https://qa.googleapis.com/gmail/v1/users/{userId}/',
    },
  ],

  responses: [
    {
      tag: { title: '200 OK' },
      headers: {
        content: [
          {
            name: {
              titles: [{ title: 'bearerTokenInResponseHeader' }],
            },
            type: {
              titles: [{ title: 'stringInResponseHeader' }],
            },
          },
        ],
      },
      body: {
        content: [
          {
            name: {
              titles: [{ title: 'userEmailNameInBody' }],
            },
            type: {
              titles: [{ title: 'userEmailTypeInBody' }],
            },
          },
        ],
      },
    },
  ],
  ...overrides,
});
