import React from 'react';
import PropTypes from 'prop-types';
import { Parser, HtmlRenderer } from 'commonmark';

/* eslint-disable react/no-danger */

const Markdown = ({ text, ...other }) => (
  <div
    {...other}
    dangerouslySetInnerHTML={{
      __html: renderMarkdown(text),
    }}
  />
);

Markdown.propTypes = {
  text: PropTypes.string,
};

Markdown.defaultProps = {
  text: '',
};

function renderMarkdown(text = '') {
  return new HtmlRenderer().render(
    new Parser({
      smart: true,
      safe: true,
    }).parse(text),
  );
}

export default Markdown;
