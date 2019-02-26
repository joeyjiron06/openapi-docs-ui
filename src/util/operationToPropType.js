import getHttpMessage from './httpStatusCodes';

function parseNameTableCell({ propName, isRequired, rawProperty }) {
  const subtitles = [];
  const titles = [];

  titles.push({
    title: propName,
  });

  if (isRequired) {
    subtitles.push({
      title: 'required',
      color: 'red',
    });
  }

  if (rawProperty.deprecated) {
    subtitles.push({ title: 'deprecated', color: 'yellow' });
  }

  return {
    titles,
    subtitles: subtitles.length ? subtitles : undefined,
  };
}

function parseTypeTableCell(rawProperty) {
  const typeHeaders = [];
  const typeTitles = [];
  const typeSubtitles = [];

  if (Array.isArray(rawProperty.oneOf)) {
    typeHeaders.push({
      title: 'exactly one of',
    });

    rawProperty.oneOf.forEach((oneOfSchema) => {
      if (oneOfSchema.$ref) {
        typeTitles.push({
          title: oneOfSchema.$ref.split('/').pop(),
          link: oneOfSchema.$ref,
        });
      } else {
        throw new TypeError(
          'inline schemas for used with "oneOf" is not currently supported. Please use component references only with "oneOf"',
        );
      }
    });
  } else if (rawProperty.not) {
    typeHeaders.push({
      title: 'NOT',
      color: 'red',
    });
    typeTitles.push({
      title: rawProperty.not.type,
    });
  } else if (rawProperty.type === 'array') {
    typeHeaders.push({
      title: 'array of',
    });

    if (rawProperty.items.$ref) {
      const paths = rawProperty.items.$ref.split('/');
      typeTitles.push({
        title: paths[paths.length - 1],
        link: rawProperty.items.$ref,
      });
    } else {
      typeTitles.push({
        title: rawProperty.items.type,
      });
    }
  } else {
    typeTitles.push({
      title: rawProperty.type,
    });

    if (rawProperty.format) {
      typeSubtitles.push({
        title: rawProperty.format,
      });
    }
  }

  return {
    headers: typeHeaders.length ? typeHeaders : undefined,
    titles: typeTitles,
    subtitles: typeSubtitles.length ? typeSubtitles : undefined,
  };
}

/**
 *
 * @param {Object} rawProperty - the raw property from the schema
 * @param {String} propName - the name of the proptery
 * @param {Array[String]} requiredProps - array of required props
 * @return {PropTypes.ParameterTableRow}
 */
export function schemaPropToParameterTableRow(rawProperty, propName, requiredProps = []) {
  return {
    name: parseNameTableCell({
      propName,
      isRequired: requiredProps.includes(propName),
      rawProperty,
    }),
    type: parseTypeTableCell(rawProperty),
    description: rawProperty.description,
  };
}

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
  return Object.keys(properties || {}).map(propName => schemaPropToParameterTableRow(properties[propName], propName, required));
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
