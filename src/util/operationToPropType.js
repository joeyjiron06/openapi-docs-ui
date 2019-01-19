/**
 * @return {PropTypes.ParameterType}
 * */
export function schemaToParameterTypes(schema) {
  const rawProperties = schema.properties;

  function isRequired(propName) {
    return Array.isArray(schema.required) && schema.required.includes(propName);
  }

  return Object.keys(rawProperties).map((propName) => {
    const rawProperty = rawProperties[propName];

    const subtitles = [];

    if (isRequired(propName)) {
      subtitles.push({
        title: 'required',
        color: 'red',
      });
    }

    if (rawProperty.deprecated) {
      subtitles.push({ title: 'deprecated', color: 'yellow' });
    }

    const typeHeaders = [];
    const typeTitles = [];

    if (Array.isArray(rawProperty.oneOf)) {
      typeHeaders.push({
        title: 'exactly one of',
      });

      rawProperty.oneOf
        .map(oneOfSchema => ({
          title: oneOfSchema.$ref.split('/').pop(),
          link: oneOfSchema.$ref,
        }))
        .forEach((title) => {
          typeTitles.push(title);
        });
    } else if (rawProperty.not) {
      typeHeaders.push({
        title: 'NOT',
        color: 'red',
      });
      typeTitles.push({
        title: rawProperty.not.type,
      });
    } else {
      typeTitles.push({
        title: rawProperty.type,
      });
    }

    return {
      name: {
        title: propName,
        subtitles: subtitles.length ? subtitles : undefined,
      },
      type: {
        headers: typeHeaders.length ? typeHeaders : undefined,
        titles: typeTitles,
      },
      description: {
        title: rawProperty.description,
      },
    };
  });
}

/**
 * @return {PropTypes.ResponseType}
 */
function repsonseToReponseType(rawResponse, responseCode) {
  return {
    tag: {
      title: `${responseCode} OK`,
    },
    body: {
      // TODO parse other types besides application/json
      content: schemaToParameterTypes(rawResponse.content['application/json'].schema),
    },
  };
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
    responses: Object.keys(rawOperation.responses).map((responseCode) => {
      const response = rawOperation.responses[responseCode];
      return repsonseToReponseType(response, responseCode);
    }),
  };
};
