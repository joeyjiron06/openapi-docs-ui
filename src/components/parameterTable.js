import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ParameterType } from '../types';
import { Parser, HtmlRenderer } from 'commonmark';

const ParameterTable = ({ parameters }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {parameters.map(({ name, type, description }) => (
        <tr key={name.title}>
          <td>
            {renderParam({
              ...name,
              titles: [{ title: name.title }]
            })}
          </td>

          <td data-testid="parameter-type">{renderParam(type)}</td>

          <td
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(description)
            }}
          />
        </tr>
      ))}
    </tbody>
  </table>
);

ParameterTable.propTypes = {
  parameters: PropTypes.arrayOf(ParameterType).isRequired
};

const renderMarkdown = (text = '') =>
  new HtmlRenderer().render(
    new Parser({
      smart: true,
      safe: true
    }).parse(text)
  );

const renderParam = ({ headers, subtitles, titles }) => (
  <Fragment>
    <div>
      {(headers || []).map(({ title }) => (
        <div key={title}>{title}</div>
      ))}
    </div>

    {titles.map(({ title, link }, index) => (
      <div key={title}>
        {link ? (
          <a key={title} href={link}>
            {title}
          </a>
        ) : (
          title
        )}

        {index !== titles.length - 1 && <span> or </span>}
      </div>
    ))}

    <div>
      {(subtitles || []).map(({ title }) => (
        <div key={title}>{title}</div>
      ))}
    </div>
  </Fragment>
);

export default ParameterTable;
