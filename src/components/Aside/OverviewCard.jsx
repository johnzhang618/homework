import React from 'react';
import { PropTypes } from 'prop-types';

function OverviewCard({ data }) {
  return (
    <>
      <p className="h2 greyBlue">
        {data.icon}
        {' '}
        {data.value}
        kW
      </p>
      <p className="darkgray mb2">{data.term}</p>
    </>
  );
}
OverviewCard.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
  }).isRequired,
};
export default OverviewCard;
