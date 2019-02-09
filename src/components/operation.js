import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ParameterTableRow, ColoredTitleType, ResponseType } from '../types';
import Markdown from './markdown';
import ParameterTable from './parameterTable';
import theme from '../util/theme';

class Operation extends Component {
  state = {
    selectedUrl: null,
  };

  serverUrlClicked = (e) => {
    this.setState({
      selectedUrl: e.target.value,
    });
  };

  render() {
    const { operation } = this.props;
    const { selectedUrl } = this.state;
    const serverUrl = selectedUrl || operation.servers[0].url;

    return (
      <div className={css(styles.root)}>
        <h1>{operation.title}</h1>

        <div className={css(styles.tags)}>
          {(operation.tags || []).map(tag => (
            <div className={css(styles.tag)} key={tag}>
              {tag}
            </div>
          ))}
        </div>

        {operation.deprecated && <div className={css(styles.deprecatedTag)}>DEPRECATED</div>}

        {operation.authRequired && (
          <div className={css(styles.authRequired)}>This api requires authentication</div>
        )}

        {operation.description && (
          <Markdown text={operation.description} data-testid="operationDescription" />
        )}

        <select onChange={this.serverUrlClicked}>
          {operation.servers.map(server => (
            <option key={server.url} value={server.url}>
              {server.url}
            </option>
          ))}
        </select>

        <h2>Request</h2>
        <div data-testid="operationRequestUrl" className={css(styles.requestUrl)}>
          <span className={css(styles.httpMethod)}>{operation.httpMethod}</span>
          <span>{serverUrl}</span>
        </div>

        {operation.parameters && (
          <Fragment>
            {operation.parameters.path && (
              <Fragment>
                <h2>Path Parameters</h2>
                <ParameterTable rows={operation.parameters.path} />
              </Fragment>
            )}

            {operation.parameters.query && (
              <Fragment>
                <h2>Query Parameters</h2>
                <ParameterTable rows={operation.parameters.query} />
              </Fragment>
            )}

            {operation.parameters.header && (
              <Fragment>
                <h2>Header Parameters</h2>
                <ParameterTable rows={operation.parameters.header} />
              </Fragment>
            )}

            {operation.parameters.cookie && (
              <Fragment>
                <h2>Cookie Parameters</h2>
                <ParameterTable rows={operation.parameters.cookie} />
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
              <div className={css(styles.requestBodyTags)} data-testid="operationRequestBodyTags">
                {operation.requestBody.tags.map(({ title, color = 'default' }) => (
                  <div key={title} style={{ color: theme.colors[color] }}>
                    {title}
                  </div>
                ))}
              </div>
            )}

            <ParameterTable rows={operation.requestBody.content} />
          </Fragment>
        )}

        <h2>Responses</h2>
        {operation.responses.map(({ tag, headers, body }) => (
          <div className={css(styles.response)} key={tag.title}>
            <div
              style={{
                backgroundColor: theme.colors[tag.color || 'default'],
              }}
              className={css(styles.responseTag)}
            >
              {tag.title}
            </div>

            <h3>Headers</h3>
            <Markdown text={headers.description} />
            <ParameterTable rows={headers.content} />

            <h3>Body</h3>
            <Markdown text={body.description} />
            <ParameterTable rows={body.content} />
          </div>
        ))}
      </div>
    );
  }
}

Operation.propTypes = {
  operation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    httpMethod: PropTypes.string.isRequired,
    authRequired: PropTypes.bool,
    // path: PropTypes.string.isRequired,
    servers: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        description: PropTypes.string,
      }),
    ).isRequired,
    deprecated: PropTypes.bool,
    requestBody: PropTypes.shape({
      description: PropTypes.string,
      tags: PropTypes.arrayOf(ColoredTitleType),

      // todo figure out multiple content types
      content: PropTypes.arrayOf(ParameterTableRow).isRequired,
    }),
    responses: PropTypes.arrayOf(ResponseType).isRequired,
    parameters: PropTypes.shape({
      path: PropTypes.arrayOf(ParameterTableRow),
      query: PropTypes.arrayOf(ParameterTableRow),
      header: PropTypes.arrayOf(ParameterTableRow),
      cookie: PropTypes.arrayOf(ParameterTableRow),
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  root: {},
  tags: {
    display: 'flex',
  },
  tag: {
    backgroundColor: '#696969',
    marginRight: 20,
    padding: '4px 8px',
    borderRadius: 6,
  },
  deprecatedTag: {
    backgroundColor: '#F8E71C',
    color: '#5D570A',
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: 6,
    marginTop: 20,
  },
  authRequired: {
    backgroundColor: '#B8E986',
    color: '#3B4A2B',
    padding: '16px 8px',
    borderRadius: 6,
    marginTop: 20,
  },
  requestUrl: {
    backgroundColor: '#484848',
    padding: '16px 8px',
  },
  httpMethod: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  requestBodyTags: {
    marginBottom: 10,
  },
  response: {
    marginBottom: 30,
  },
  responseTag: {
    display: 'inline-block',
    borderRadius: 6,
    color: 'black',
    padding: '4px 8px',
    marginBottom: 10,
  },
});

export default Operation;
