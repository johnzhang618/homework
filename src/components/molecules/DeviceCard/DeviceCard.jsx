import React from 'react';
import { PropTypes } from 'prop-types';
import { Paragraph } from '../../atoms';

// const tagClassName = [
//   'darkgray',
//   'pl2',
//   'pt1',
//   'pb1',
// ];
// const valueClassName = [
//   'h5',
//   'darkgray',
//   'bold',
//   'pl2',
//   'pt1',
//   'pb1',
//   'bg-very-light-grey',
// ];
// const divClassName = [
//   'shadow-2',
//   'roundedMore',
//   'bg-super-light-grey',
//   'mb1',
// ];

function DeviceCard({ data }) {
  return (
    <div className="shadow-2 roundedMore bg-super-light-grey mb1">
      <Paragraph className="darkgray pl2 pt1 pb1">{data.name}</Paragraph>
      <Paragraph className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">{`${data.value}KW`}</Paragraph>
    </div>
  );
}
DeviceCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
export default DeviceCard;
