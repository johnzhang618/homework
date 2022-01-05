import React, { useContext } from "react";
import { OverviewContext } from "../../contexts/OverviewContext";
import DeviceCard from "./DeviceCard";
import OverviewCard from "./OverviewCard";

function Aside() {
  const { overview } = useContext(OverviewContext);
  return (
    <aside className="p3 menuWidth overflow-auto">
      {overview.gridState &&
        overview.gridState.map((iterm) => (
          <OverviewCard key={iterm.term} data={iterm} />
        ))}
      <section className="h5 darkgray mb2">
        <h4 className="h4 mb1">Your devices:</h4>
        {overview.devices &&
          overview.devices.map((iterm) => (
            <DeviceCard key={iterm.name} data={iterm} />
          ))}
      </section>
    </aside>
  );
}

export default Aside;
