import React from 'react';
import PropTypes from 'prop-types';
import { Parser, HtmlRenderer } from 'commonmark';

const Markdown = ({ text, ...other }) => (
  <div
    {...other}
    dangerouslySetInnerHTML={{
      __html: renderMarkdown(text)
    }}
  />
);

Markdown.propTypes = {
  text: PropTypes.string
};

const renderMarkdown = (text = '') =>
  new HtmlRenderer().render(
    new Parser({
      smart: true,
      safe: true
    }).parse(text)
  );

export default Markdown;
