import PropTypes from 'prop-types';

export const ColoredTitleType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['red', 'yellow', 'green', 'default']),
});

export const LinkableType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
});

export const ParameterTableCell = PropTypes.shape({
  headers: PropTypes.arrayOf(ColoredTitleType),
  subtitles: PropTypes.arrayOf(ColoredTitleType),
  titles: PropTypes.arrayOf(LinkableType).isRequired,
});

export const ParameterTableRow = PropTypes.shape({
  name: ParameterTableCell.isRequired,
  type: ParameterTableCell.isRequired,
  description: PropTypes.string,
});

export const ResponseType = PropTypes.shape({
  tag: ColoredTitleType.isRequired,
  headers: PropTypes.shape({
    description: PropTypes.string,
    content: PropTypes.arrayOf(ParameterTableRow),
  }),
  body: PropTypes.shape({
    description: PropTypes.string,
    content: PropTypes.arrayOf(ParameterTableRow),
  }).isRequired,
});
