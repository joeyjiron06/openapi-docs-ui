import React from 'react';
import PropTypes from 'prop-types';
import { ParameterType } from '../types';
import { Parser, HtmlRenderer } from 'commonmark';

const renderMarkdown = (text = '') =>
  new HtmlRenderer().render(
    new Parser({
      smart: true,
      safe: true
    }).parse(text)
  );

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
      {parameters.map(parameter => (
        <tr key={parameter.name.title}>
          <td>{parameter.name.title}</td>
          <td data-testid="parameter-type">
            {parameter.type.map(type => (
              <div key={type.title}>
                {/* TYPE HEADERS */}
                <div>
                  {(type.headers || []).map(header => (
                    <div key={header} data-testid="type-header">
                      {header.title}
                    </div>
                  ))}
                </div>

                {/* TYPE */}

                {type.link ? (
                  <a href={type.link}>{type.title}</a>
                ) : (
                  <div>{type.title}</div>
                )}

                {/* TYPE SUBTITLES */}
                <div>
                  {(type.subtitles || []).map(subtitle => (
                    <div key={subtitle} data-testid="type-subtitle">
                      {subtitle.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </td>
          <td
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(parameter.description)
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

export default ParameterTable;
