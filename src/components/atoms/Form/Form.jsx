import React from 'react';
import PropTypes from 'prop-types';

function Form({
  onSubmit,
  children,
}) {
  return (
    <form onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
