import React from 'react';
import PropTypes from 'prop-types';

function Paragraph({
  children, className, inheritedStyles, ...others
}) {
  return (
    <p {...others} className={className}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inheritedStyles: PropTypes.string,
};

Paragraph.defaultProps = {
  inheritedStyles: '',
  className: '',
};

export default Paragraph;
