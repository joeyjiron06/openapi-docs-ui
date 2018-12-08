import React from 'react';
import PropTypes from 'prop-types';

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

const Sidebar = ({ paths, title }) => (
  <div>
    <h2>{title}</h2>

    <p>API</p>
    <p>Overview</p>

    <div>
      {Object.keys(paths).map(pathName => {
        const pathItem = paths[pathName];

        return (
          <div key={pathName}>
            <p>{pathItem.summary}</p>
            {Object.keys(pathItem)
              .filter(operationName => httpMethods.includes(operationName))
              .map(operationName => {
                const operation = pathItem[operationName];
                return (
                  <div key={pathName + operationName}>
                    {operation.summary
                      ? operation.summary
                      : `${operationName.toUpperCase()} ${pathName}`}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  </div>
);

Sidebar.propTypes = {
  paths: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default Sidebar;
