import PropTypes from 'prop-types';

export const ColoredTitleType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['red', 'yellow', 'green', 'default'])
});

export const ValueType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitles: PropTypes.arrayOf(ColoredTitleType),
  headers: PropTypes.arrayOf(ColoredTitleType),
  link: PropTypes.string
});

export const ParameterType = PropTypes.shape({
  name: ValueType.isRequired,
  type: PropTypes.arrayOf(ValueType).isRequired,
  description: PropTypes.string
});
