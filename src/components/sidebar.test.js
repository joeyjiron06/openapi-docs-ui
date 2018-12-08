import React from 'react';
import { render, cleanup } from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import Sidebar from './sidebar';

afterEach(cleanup);

// const paths = {
//   '/pets': {
//     get: {
//       description:
//         'Returns all pets from the system that the user has access to\nNam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem,ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.\n\nSed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aeneannec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.\n',
//       operationId: 'findPets',
//       parameters: [
//         {
//           name: 'tags',
//           in: 'query',
//           description: 'tags to filter by',
//           required: false,
//           style: 'form',
//           schema: {
//             type: 'array',
//             items: {
//               type: 'string'
//             }
//           }
//         },
//         {
//           name: 'limit',
//           in: 'query',
//           description: 'maximum number of results to return',
//           required: false,
//           schema: {
//             type: 'integer',
//             format: 'int32'
//           }
//         }
//       ],
//       responses: {
//         '200': {
//           description: 'pet response',
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'array',
//                 items: {
//                   $ref: '#/components/schemas/Pet'
//                 }
//               }
//             }
//           }
//         },
//         default: {
//           description: 'unexpected error',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Error'
//               }
//             }
//           }
//         }
//       }
//     },
//     post: {
//       description: 'Creates a new pet in the store.  Duplicates are allowed',
//       operationId: 'addPet',
//       requestBody: {
//         description: 'Pet to add to the store',
//         required: true,
//         content: {
//           'application/json': {
//             schema: {
//               $ref: '#/components/schemas/NewPet'
//             }
//           }
//         }
//       },
//       responses: {
//         '200': {
//           description: 'pet response',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Pet'
//               }
//             }
//           }
//         },
//         default: {
//           description: 'unexpected error',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Error'
//               }
//             }
//           }
//         }
//       }
//     }
//   },
//   '/pets/{id}': {
//     get: {
//       description:
//         'Returns a user based on a single ID, if the user does not have access to the pet',
//       operationId: 'find pet by id',
//       parameters: [
//         {
//           name: 'id',
//           in: 'path',
//           description: 'ID of pet to fetch',
//           required: true,
//           schema: {
//             type: 'integer',
//             format: 'int64'
//           }
//         }
//       ],
//       responses: {
//         '200': {
//           description: 'pet response',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Pet'
//               }
//             }
//           }
//         },
//         default: {
//           description: 'unexpected error',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Error'
//               }
//             }
//           }
//         }
//       }
//     },
//     delete: {
//       description: 'deletes a single pet based on the ID supplied',
//       operationId: 'deletePet',
//       parameters: [
//         {
//           name: 'id',
//           in: 'path',
//           description: 'ID of pet to delete',
//           required: true,
//           schema: {
//             type: 'integer',
//             format: 'int64'
//           }
//         }
//       ],
//       responses: {
//         '204': {
//           description: 'pet deleted'
//         },
//         default: {
//           description: 'unexpected error',
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/Error'
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// };

//   const servers = [
//     {
//       url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
//       description: 'Production server',
//       variables: {
//         username: {
//           default: 'demo',
//           description:
//             'this value is assigned by the service provider, in this example `gigantic-server.com`'
//         },
//         port: {
//           enum: ['8443', '443'],
//           default: '8443'
//         },
//         basePath: {
//           default: 'v2'
//         }
//       }
//     }
//   ];

describe('Sidebar', () => {
  it('should render the title', () => {
    const title = 'Users API';
    const { getByText } = render(<Sidebar title={title} paths={{}} />);

    expect(getByText(title)).toBeInTheDocument();
  });

  it('should render the sections', () => {
    const sections = [
      { title: 'API', items: [{ title: 'Overview' }] },
      {
        title: 'Pets',
        items: [
          { title: 'Get all pets' },
          { title: 'Post a pet' },
          { title: 'Delete a pet' }
        ]
      }
    ];
    const { getByText } = render(<Sidebar title="" sections={sections} />);

    sections.forEach(section => {
      expect(getByText(section.title)).toBeInTheDocument();
      sections.items.forEach(item => {
        expect(getByText(item.title)).toBeInTheDocument();
      });
    });
  });

  // it('should render the api overview', () => {
  //   const { getByText } = render(<Sidebar title="" paths={{}} />);

  //   expect(getByText('API')).toBeInTheDocument();
  //   expect(getByText('Overview')).toBeInTheDocument();
  // });

  // it('should render the http method + pathname when no summary is given', () => {
  //   const paths = {
  //     '/pets/:id': {
  //       get: {},
  //       post: {},
  //       delete: {}
  //     }
  //   };
  //   const { getByText } = render(<Sidebar title="" paths={paths} />);

  //   expect(getByText('GET /pets/:id')).toBeInTheDocument();
  //   expect(getByText('POST /pets/:id')).toBeInTheDocument();
  //   expect(getByText('DELETE /pets/:id')).toBeInTheDocument();
  // });

  // it('should render the open api paths with a summary', () => {
  //   const paths = {
  //     '/pets': {
  //       summary: 'Pets',
  //       get: {
  //         summary: 'Get all pets'
  //       },
  //       put: {
  //         summary: 'Put a pet'
  //       },
  //       options: {
  //         summary: 'Options a pet'
  //       },
  //       head: {
  //         summary: 'Head a pet'
  //       },
  //       patch: {
  //         summary: 'Patch a pet'
  //       },
  //       trace: {
  //         summary: 'Trace a pet'
  //       },
  //       post: {
  //         summary: 'Add a pet'
  //       },
  //       delete: {
  //         summary: 'Delete a pet'
  //       }
  //     },
  //     '/users': {
  //       summary: 'Users',
  //       get: {
  //         summary: 'Get all users'
  //       },
  //       post: {
  //         summary: 'Add a user'
  //       },
  //       delete: {
  //         summary: 'Delete a user'
  //       }
  //     }
  //   };

  //   const { getByText } = render(<Sidebar title="" paths={paths} />);

  //   expect(getByText(paths['/pets'].summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].get.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].put.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].options.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].head.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].patch.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].trace.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].post.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/pets'].delete.summary)).toBeInTheDocument();

  //   expect(getByText(paths['/users'].summary)).toBeInTheDocument();
  //   expect(getByText(paths['/users'].get.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/users'].post.summary)).toBeInTheDocument();
  //   expect(getByText(paths['/users'].delete.summary)).toBeInTheDocument();
  // });
});
