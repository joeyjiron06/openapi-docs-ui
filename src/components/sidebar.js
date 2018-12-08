import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const httpMethods = [
  'get',
  'put',
  'options',
  'head',
  'patch',
  'trace',
  'post',
  'delete'
];

const Sidebar = ({ sections }) => (
  <div className={css(styles.root)}>
    {
      <div>
        {sections.map(({ title, items }, index) => (
          <div key={index}>
            <div>{title}</div>
            {items.map(({ title }, index) => (
              <div key={`${index}`}>{title}</div>
            ))}
          </div>
        ))}
      </div>
    }
    {/* <h2>{title}</h2>

    <div className={css(styles.listItem, styles.header)}>API</div>
    <div className={css(styles.listItem, styles.pathSummary)}>Overview</div>

    <div>
      {Object.keys(paths).map(pathName => {
        const pathItem = paths[pathName];
        return (
          <div key={pathName}>
            <div className={css(styles.listItem, styles.header)}>
              {pathItem.summary}
            </div>

            {Object.keys(pathItem)
              .filter(operationName => httpMethods.includes(operationName))
              .map(operationName => {
                const operation = pathItem[operationName];
                return (
                  <div
                    key={pathName + operationName}
                    className={css(styles.listItem, styles.pathSummary)}
                  >
                    {operation.summary
                      ? operation.summary
                      : `${operationName.toUpperCase()} ${pathName}`}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div> */}
  </div>
);

Sidebar.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1B1C19',
    color: 'white',
    padding: 40,
    maxWidth: 240
  },
  listItem: {
    marginBottom: 30
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 40
  }
});

export default Sidebar;
