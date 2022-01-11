import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '../../atoms';

function ChartController() {
  return (
    <section className="mb3">
      <Button
        type="button"
        className="
                h5
                inline-block
                shadow-2
                pl2
                pr2
                pt1
                pb1
                roundedMore
                border-grey
                bg-blue
                white
                bold
              "
      >
        Last 30 days
      </Button>
    </section>
  );
}
ChartController.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
  }).isRequired,
};
export default ChartController;
