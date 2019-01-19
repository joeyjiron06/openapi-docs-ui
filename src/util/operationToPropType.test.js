import operationToPropType, { schemaToParameterTypes } from './operationToPropType';
import { minimalOperation, fullOperation } from '../../fixtures/operations';

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

describe('operationToPropType', () => {
  describe('schemaToParameterTypes', () => {
    describe('oneOf', () => {});
    describe('allOf', () => {});
    describe('anyOf', () => {});

    describe('object', () => {
      /*
        name: {
          headers: [{title, color}],
          subtitles: [{title, color}],
          title: ''
        },
        type: ({
          headers: [{title, color}],
          subtitles: [{title, color}],
          titles: [{title, link}]
        }),
        description: ''

      */

      it('should return a red subtitle called "required" when a value is required', () => {
        expect(
          schemaToParameterTypes({
            type: 'object',
            required: ['age'],
            properties: {
              age: {
                type: 'number',
                description: 'the age of the pet',
              },
            },
          }),
        ).toEqual([
          {
            name: {
              subtitles: [{ title: 'required', color: 'red' }],
              title: 'age',
            },
            type: {
              titles: [{ title: 'number' }],
            },
            description: {
              title: 'the age of the pet',
            },
          },
        ]);
      });

      it('should return a yellow subtitle called "depcreated" when a value is deprecated', () => {
        expect(
          schemaToParameterTypes({
            type: 'object',
            properties: {
              tricks: {
                type: 'string',
                deprecated: true,
              },
            },
          }),
        ).toEqual([
          expect.objectContaining({
            name: expect.objectContaining({
              subtitles: [{ title: 'deprecated', color: 'yellow' }],
            }),
          }),
        ]);
      });

      it.skip('should return a header called "exactly one of" when marked as oneOf and has an inline schema', () => {});

      it('should return a header called "exactly one of" when marked as oneOf ', () => {
        expect(
          schemaToParameterTypes({
            type: 'object',
            properties: {
              pet: {
                oneOf: [
                  {
                    $ref: '#/components/schemas/Cat',
                  },
                  {
                    $ref: '#/components/schemas/Dog',
                  },
                ],
              },
            },
          }),
        ).toEqual([
          expect.objectContaining({
            type: expect.objectContaining({
              headers: [
                {
                  title: 'exactly one of',
                },
              ],
              titles: [
                {
                  title: 'Cat',
                  link: '#/components/schemas/Cat',
                },
                {
                  title: 'Dog',
                  link: '#/components/schemas/Dog',
                },
              ],
            }),
          }),
        ]);
      });

      it('should return a red header called "NOT" when marked as not', () => {
        expect(
          schemaToParameterTypes({
            type: 'object',
            properties: {
              pet: {
                not: {
                  type: 'integer',
                },
              },
            },
          }),
        ).toEqual([
          expect.objectContaining({
            type: expect.objectContaining({
              headers: [
                {
                  title: 'NOT',
                  color: 'red',
                },
              ],
              titles: [
                {
                  title: 'integer',
                },
              ],
            }),
          }),
        ]);
      });

      it.skip('should return a header called "array of" when marked as arrayOf ', () => {});

      it.skip('should add the additional properties when aditionalProperties is an object', () => {});

      it.skip('should add the additional properties when aditionalProperties is a reference to a component', () => {});

      it.skip('should add a description when one is defined', () => {});

      it.skip('should return a subtitle in type when a format is given', () => {});

      it.skip('should return a default object when a defalt is given', () => {});
    });
  });

  it('should convert a minimal operation to an Opertaions propType', () => {
    expect(operationToPropType(minimalOpenapi, '/pets', 'get')).toEqual({
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
                  title: 'firstName',
                },
                type: {
                  titles: [{ title: 'string' }],
                },
                description: {
                  title: 'the name of the pet',
                },
              },
            ],
          },
        },
      ],
    });
  });

  it.skip('should convert responses with body refs', () => {});
  it.skip('should convert requests with refs', () => {});
});
