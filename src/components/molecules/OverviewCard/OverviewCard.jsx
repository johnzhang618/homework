import React from 'react';
import { PropTypes } from 'prop-types';
import { Paragraph } from '../../atoms';

function OverviewCard({ data }) {
  return (
    <>
      <Paragraph className="h2 greyBlue">{`${data.icon} ${data.value}KW`}</Paragraph>
      <Paragraph className="darkgray mb2">{data.term}</Paragraph>
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
