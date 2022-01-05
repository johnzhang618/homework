import React from "react";

function OverviewCard(props) {
  const { data } = props;
  return (
    <>
      <p className="h2 greyBlue">
        {data.icon} {data.value}kW
      </p>
      <p className="darkgray mb2">{data.term}</p>
    </>
  );
}
export default OverviewCard;
