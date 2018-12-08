import React from 'react';
import PropTypes from 'prop-types';
import { ParameterType, ColoredTitleType } from '../types';

const Operation = ({}) => <div>hello</div>;

const ResponseType = PropTypes.shape({
  tag: PropTypes.shape(ColoredTitleType).isRequired,
  headers: PropTypes.shape({
    description: PropTypes.string,
    content: PropTypes.arrayOf(ParameterType)
  }),
  body: PropTypes.shape({
    description: PropTypes.string,
    content: PropTypes.arrayOf(ParameterType)
  }).isRequired
});

Operation.propTypes = {
  operation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    httpMethod: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    authRequired: PropTypes.bool,
    requestBody: PropTypes.shape({
      description: PropTypes.string,
      tags: PropTypes.arrayOf(ColoredTitleType),

      // todo figure out multiple content types
      content: PropTypes.arrayOf(ParameterType)
    }),
    responses: PropTypes.arrayOf(ResponseType).isRequired,
    parameters: PropTypes.shape({
      path: PropTypes.arrayOf(ParameterType),
      query: PropTypes.arrayOf(ParameterType),
      headers: PropTypes.arrayOf(ParameterType),
      cookie: PropTypes.arrayOf(ParameterType)
    })
  }).isRequired
};

export default Operation;
