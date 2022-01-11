import React from 'react';
import PropTypes from 'prop-types';

function Button({
  className,
  children,
  inheritedStyles,
  type,
  primary,
  secondary,
  tertiary,
  variation,
  disabled,
  transparent,
  ariaLabel,
  ...others
}) {
  return (
    <button
      {...others}
      aria-label={ariaLabel || null}
      className={className}
      disabled={disabled}
      type={type}
      variation={variation}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  inheritedStyles: '',
  type: 'button',
  primary: false,
  secondary: false,
  tertiary: false,
  disabled: false,
  variation: '',
  transparent: false,
  ariaLabel: '',
  className: '',
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inheritedStyles: PropTypes.string,
  type: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  disabled: PropTypes.bool,
  variation: PropTypes.string,
  transparent: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default Button;
