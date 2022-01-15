import React from 'react';
import { PropTypes } from 'prop-types';
import { Paragraph } from '../../atoms';

function OverviewCard({
  value,
  icon,
  term,
}) {
  return (
    <>
      <Paragraph className="h2 greyBlue">{`${icon} ${value}KW`}</Paragraph>
      <Paragraph className="darkgray mb2">{term}</Paragraph>
    </>
  );
}
OverviewCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
};
export default OverviewCard;
