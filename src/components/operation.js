import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ParameterType, ColoredTitleType, ResponseType } from '../types';
import Markdown from './markdown';
import ParameterTable from './parameterTable';

const Operation = ({ operation }) => (
  <div>
    <h1>{operation.title}</h1>

    <div>
      {(operation.tags || []).map(tag => (
        <div key={tag}>{tag}</div>
      ))}
    </div>

    {operation.deprecated && <div>DEPRECATED</div>}

    {operation.authRequired && <div>This api requires authentication</div>}

    {operation.description && (
      <Markdown
        text={operation.description}
        data-testid="operationDescription"
      />
    )}

    <select>
      {(operation.servers || []).map(server => (
        <option key={server.url} value={server.url}>
          {server.url}
        </option>
      ))}
    </select>

    <h2>Request</h2>
    <div>{`${operation.httpMethod} ${operation.servers[0].url}`}</div>

    {operation.parameters && (
      <Fragment>
        {operation.parameters.path && (
          <Fragment>
            <h2>Path Parameters</h2>
            <ParameterTable parameters={operation.parameters.path} />
          </Fragment>
        )}

        {operation.parameters.query && (
          <Fragment>
            <h2>Query Parameters</h2>
            <ParameterTable parameters={operation.parameters.query} />
          </Fragment>
        )}

        {operation.parameters.header && (
          <Fragment>
            <h2>Header Parameters</h2>
            <ParameterTable parameters={operation.parameters.header} />
          </Fragment>
        )}

        {operation.parameters.cookie && (
          <Fragment>
            <h2>Cookie Parameters</h2>
            <ParameterTable parameters={operation.parameters.cookie} />
          </Fragment>
        )}
      </Fragment>
    )}

    {operation.requestBody && (
      <Fragment>
        <h2>Request Body</h2>

        {operation.requestBody.description && (
          <Markdown
            text={operation.requestBody.description}
            data-testid="operationRequestBodyDescription"
          />
        )}

        {operation.requestBody.tags && (
          <div data-testid="operationRequestBodyTags">
            {operation.requestBody.tags.map(({ title }) => (
              <div key={title}>{title}</div>
            ))}
          </div>
        )}

        <ParameterTable parameters={operation.requestBody.content} />
      </Fragment>
    )}

    <h2>Responses</h2>
    {operation.responses.map(({ tag, headers, body }) => (
      <div key={tag.title}>
        <div>{tag.title}</div>

        <div>Headers</div>
        <div>{headers.description}</div>
        <ParameterTable parameters={headers.content} />

        <div>Body</div>
        <div>{body.description}</div>
        <ParameterTable parameters={body.content} />
      </div>
    ))}
  </div>
);

Operation.propTypes = {
  operation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    httpMethod: PropTypes.string.isRequired,
    authRequired: PropTypes.bool,
    servers: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        description: PropTypes.string
      })
    ).isRequired,
    deprecated: PropTypes.bool,
    requestBody: PropTypes.shape({
      description: PropTypes.string,
      tags: PropTypes.arrayOf(ColoredTitleType),

      // todo figure out multiple content types
      content: PropTypes.arrayOf(ParameterType).isRequired
    }),
    responses: PropTypes.arrayOf(ResponseType).isRequired,
    parameters: PropTypes.shape({
      path: PropTypes.arrayOf(ParameterType),
      query: PropTypes.arrayOf(ParameterType),
      header: PropTypes.arrayOf(ParameterType),
      cookie: PropTypes.arrayOf(ParameterType)
    })
  }).isRequired
};

export default Operation;
