import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(
  (
    {
      id,
      className,
      type,
      name,
      value,
      placeholder,
      ariaLabel,
      elementLocator,
      ...others
    },
    ref,
  ) => {
    const propArray = {
      id,
      ref,
      'aria-label': ariaLabel,
      className,
      name,
      type,
      placeholder,
      'data-locator': elementLocator || `input-${type}-${name}`,
      ...others,
    };
    if (type === 'radio') propArray.value = value;
    return React.createElement('input', propArray);
  },
);

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  elementLocator: PropTypes.string,
  ref: PropTypes.element,
};

Input.defaultProps = {
  id: '',
  name: '',
  placeholder: '',
  ariaLabel: '',
  className: '',
  type: 'text',
  value: '',
  elementLocator: '',
  ref: null,
};

export default Input;
