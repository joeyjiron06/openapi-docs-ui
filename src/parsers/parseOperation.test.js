import getHttpMessage from './httpStatusCodes';
import parseOperation from './parseOperation';

const minimalOpenapi = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Swagger Petstore',
    description:
      'A sample API that uses a petstore as an example to demonstrate features in the OpenAPI 3.0 specification',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      name: 'Swagger API Team',
      email: 'apiteam@swagger.io',
      url: 'http://swagger.io',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://petstore.swagger.io/api',
    },
  ],
  paths: {
    '/pets': {
      get: {
        description:
          'Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo.In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittislibero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n',
        responses: {
          200: {
            description: 'pet response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: {
                      type: 'string',
                      description: 'the name of the pet',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

describe('parseOperation', () => {
  it('should convert a minimal operation to an Opertaions propType', () => {
    expect(parseOperation(minimalOpenapi, '/pets', 'get')).toEqual({
      title: 'GET /pets',
      httpMethod: 'get',
      servers: [
        {
          url: 'http://petstore.swagger.io/api',
        },
      ],

      responses: [
        {
          tag: { title: '200 OK' },
          body: {
            content: [
              {
                name: {
                  titles: [{ title: 'firstName' }],
                },
                type: {
                  titles: [{ title: 'string' }],
                },
                description: 'the name of the pet',
              },
            ],
          },
        },
      ],
    });
  });

  it('should map all response codes to a propert http title', () => {
    const responseCodes = [
      100,
      101,
      200,
      201,
      202,
      203,
      204,
      205,
      206,
      300,
      301,
      302,
      303,
      304,
      305,
      306,
      307,
      400,
      401,
      402,
      403,
      404,
      405,
      406,
      407,
      408,
      409,
      410,
      411,
      412,
      413,
      414,
      415,
      416,
      417,
      426,
      428,
      429,
      431,
      500,
      501,
      502,
      503,
      504,
      505,
      511,
    ];

    responseCodes.forEach((responseCode) => {
      const openapi = {
        ...minimalOpenapi,
        paths: {
          '/pets': {
            get: {
              responses: {
                [responseCode]: {
                  description: 'pet response',
                },
              },
            },
          },
        },
      };

      expect(parseOperation(openapi, '/pets', 'get')).toEqual(
        expect.objectContaining({
          responses: [
            expect.objectContaining({
              tag: {
                title: `${responseCode} ${getHttpMessage(responseCode)}`,
              },
            }),
          ],
        }),
      );
    });
  });

  describe('oneOf', () => {
    it.skip('should throw an error if a $ref is not used for the schema', () => {});
    it.skip('should render oneOf as a list of links when request body marked as oneOf', () => {});
  });

  describe('anyOf', () => {
    it.skip('should throw an unsupported error when anyof is used in request body', () => {});
  });

  describe('allOf', () => {
    it.skip('should use the reference properties to fill out the table and combine the inline schemas', () => {});
  });

  it('should convert responses with body refs', () => {
    const openapi = {
      ...minimalOpenapi,
      paths: {
        '/pets': {
          get: {
            description:
              'Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo.In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittislibero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n',
            responses: {
              200: {
                description: 'Updated',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Dog',
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Dog: {
            type: 'object',
            properties: {
              bark: {
                type: 'boolean',
              },
            },
          },
        },
      },
    };

    expect(parseOperation(openapi, '/pets', 'get')).toEqual(
      expect.objectContaining({
        responses: [
          expect.objectContaining({
            body: {
              content: [
                {
                  name: {
                    titles: [
                      {
                        title: 'bark',
                      },
                    ],
                  },
                  type: {
                    titles: [
                      {
                        title: 'boolean',
                      },
                    ],
                  },
                  description: undefined,
                },
              ],
            },
          }),
        ],
      }),
    );
  });

  it('should convert requests with refs', () => {
    const openapi = {
      ...minimalOpenapi,
      paths: {
        '/pets': {
          post: {
            description: 'Returns all ',
            responses: {},
            requestBody: {
              description: 'Pet to add to the store',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Dog',
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Dog: {
            type: 'object',
            properties: {
              bark: {
                type: 'boolean',
              },
            },
          },
        },
      },
    };

    expect(parseOperation(openapi, '/pets', 'post')).toEqual(
      expect.objectContaining({
        requestBody: {
          description: 'Pet to add to the store',
          tags: [{ title: 'Request body is required', color: 'red' }],
          content: [
            {
              name: {
                titles: [{ title: 'bark' }],
              },
              type: {
                titles: [{ title: 'boolean' }],
              },
              description: undefined,
            },
          ],
        },
      }),
    );
  });
  it.skip('should convert enum to title with subtitles of the values', () => {});
});
