import getHttpMessage from './httpStatusCodes';
import parseParameterTableRow from './parseParameterTableRow';

function getSchema(mediaType, openapi) {
  const schema = mediaType.content
    && mediaType.content['application/json']
    && mediaType.content['application/json'].schema;

  if (schema && schema.$ref) {
    return openapi.components.schemas[schema.$ref.split('/').pop()];
  }

  return schema;
}

function mediaTypeToContent(mediaType, openapi) {
  const { properties, required } = getSchema(mediaType, openapi) || {};
  return Object.keys(properties || {}).map(propName => parseParameterTableRow(properties[propName], propName, required));
}

/**
 * @param {OpenApi} openapi  - the openapi spec
 * @param {string} operationName - the name of the operation to convert
 * @param {string} httpMethod - the http method to choose within the operation
 * @return {PropTypes.Operation}
 */
export default (openapi, operationName, httpMethod) => {
  const rawOperation = openapi.paths[operationName][httpMethod];

  return {
    title: `${httpMethod.toUpperCase()} ${operationName}`,
    httpMethod,
    servers: openapi.servers,
    requestBody: rawOperation.requestBody && {
      tags: rawOperation.requestBody.required && [
        { title: 'Request body is required', color: 'red' },
      ],
      description: rawOperation.requestBody.description,
      content: mediaTypeToContent(rawOperation.requestBody, openapi),
    },

    responses: Object.keys(rawOperation.responses).map((responseCode) => {
      const rawResponse = rawOperation.responses[responseCode];

      return {
        tag: {
          title: `${responseCode} ${getHttpMessage(responseCode)}`,
        },
        body: {
          content: mediaTypeToContent(rawResponse, openapi),
        },
      };
    }),
  };
};
