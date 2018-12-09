import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ParameterType } from '../types';
import Markdown from './markdown';

const colors = {
  red: '#F25F5C',
  yellow: '#F8E71C',
  default: '#FFFFFF70',
  green: '#B8E986'
};

const ParameterTable = ({ parameters, className }) => (
  <table className={css(styles.root, className)}>
    <thead className={css(styles.head)}>
      <tr>
        <th className={css(styles.tableData)}>Name</th>
        <th className={css(styles.tableData)}>Type</th>
        <th className={css(styles.tableData)}>Description</th>
      </tr>
    </thead>
    <tbody className={css(styles.body)}>
      {parameters.map(({ name, type, description }) => (
        <tr key={name.title} className={css(styles.tableRow)}>
          <td className={css(styles.tableData)}>
            {renderParam({
              headers: name.headers,
              subtitles: name.subtitles,
              titles: [{ title: name.title }]
            })}
          </td>

          <td className={css(styles.tableData)} data-testid="parameter-type">
            {renderParam({
              headers: type.headers,
              subtitles: type.subtitles,
              titles: type.titles
            })}
          </td>

          <td className={css(styles.tableData)}>
            <Markdown text={description} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

ParameterTable.defaultProps = {
  parameters: []
};
ParameterTable.propTypes = {
  parameters: PropTypes.arrayOf(ParameterType).isRequired,
  className: PropTypes.string
};

const styles = StyleSheet.create({
  root: {
    color: 'white',
    textAlign: 'left',
    borderCollapse: 'collapse',
    borderRadius: 6,
    overflow: 'hidden'
  },
  head: {
    backgroundColor: '#2A2A2A',
    fontWeight: 'bold',
    fontSize: 16
  },
  body: {
    backgroundColor: '#484848'
  },
  tableData: {
    verticalAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    ':first-child': {
      paddingLeft: 20
    }
  },
  tableRow: {
    borderBottomColor: '#565656',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },

  link: {
    color: 'white'
  },
  param: {},
  paramMainTitles: {
    fontFamily: `'Roboto Mono', 'monospace'`,
    fontWeight: 500
  },
  paramTitles: {
    fontSize: 11
  }
});

const renderParam = ({ headers, subtitles, titles }) => (
  <div className={css(styles.param)}>
    {renderTitles(headers)}

    <div className={css(styles.paramMainTitles)}>
      {titles.map(({ title, link }, index) => (
        <span key={title}>
          {link ? (
            <a href={link} className={css(styles.link)}>
              {title}
            </a>
          ) : (
            title
          )}

          {index !== titles.length - 1 && <span> | </span>}
        </span>
      ))}
    </div>

    {renderTitles(subtitles)}
  </div>
);

const renderTitles = (titles = []) => (
  <div className={css(styles.paramTitles)}>
    {titles.map(({ title, color = 'default' }) => (
      <div key={title} style={{ color: colors[color] }}>
        {title}
      </div>
    ))}
  </div>
);

export default ParameterTable;
