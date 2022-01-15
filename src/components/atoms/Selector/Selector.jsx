import React from 'react';
import PropTypes from 'prop-types';

const Selector = React.forwardRef(
  (
    {
      id,
      className,
      disabled,
      elementLocator,
      placeholder,
      options,
      selectedOption,
      name,
      ...others
    },
    ref,
  ) => (
    <select
      id={id}
      name={name}
      className={className}
      disabled={disabled}
      data-locator={elementLocator || `select-input-${name}-${id}`}
      ref={ref}
      {...others}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
);

Selector.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.string,
  elementLocator: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string,
  placeholder: PropTypes.node,
  ref: PropTypes.element,
};

Selector.defaultProps = {
  id: '',
  disabled: '',
  selectedOption: '',
  placeholder: '',
  className: '',
  elementLocator: '',
  options: [],
  name: '',
  ref: null,
};

export default Selector;
