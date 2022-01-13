import React from 'react';
import PropTypes from 'prop-types';

function Label({
  className,
  htmlFor,
  children,
  ...others
}) {
  return (
    <label
      {...others}
      className={className}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Label.defaultProps = {
  className: '',
};

export default Label;
