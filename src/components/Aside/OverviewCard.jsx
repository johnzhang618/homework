import React from 'react';

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
  data: {
    icon: String,
    value: String,
    term: String,
  },
};
OverviewCard.defaultProps = { data: {} };
export default OverviewCard;
