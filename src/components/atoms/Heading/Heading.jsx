import React from 'react';
import PropTypes from 'prop-types';

function Heading({
  children,
  className,
  HeadingType = 'h1',
  inheritedStyles,
  ...others
}) {
  return (
    <HeadingType
      {...others}
      className={className}
    >
      {children}
    </HeadingType>
  );
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  HeadingType: PropTypes.string,
  inheritedStyles: PropTypes.string,
};

Heading.defaultProps = {
  inheritedStyles: '',
  HeadingType: 'h1',
};

export default Heading;
