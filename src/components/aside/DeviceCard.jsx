import React from "react";

function DeviceCard(props) {
  const { data } = props;
  return (
    <div className="shadow-2 roundedMore bg-super-light-grey mb1">
      <p className="darkgray pl2 pt1 pb1">{data.name}</p>
      <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">
        {data.value}kW
      </p>
    </div>
  );
}

export default DeviceCard;
