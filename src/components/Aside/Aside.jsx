import React, { useContext } from 'react';
import { OverviewContext } from '../../contexts/OverviewContext';
import DeviceCard from './DeviceCard';
import OverviewCard from './OverviewCard';

function Aside() {
  const { overview } = useContext(OverviewContext);
  return (
    <aside className="p3 menuWidth overflow-auto">
      {
        overview.gridState
        && overview.gridState.map((item) => <OverviewCard key={item.id} data={item} />)
      }
      <section className="h5 darkgray mb2">
        <h4 className="h4 mb1">Your devices:</h4>
        {
          overview.devices
          && overview.devices.map((item) => <DeviceCard key={item.id} data={item} />)
        }
      </section>
    </aside>
  );
}

export default Aside;
