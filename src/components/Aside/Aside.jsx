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
          // eslint-disable-next-line react/no-array-index-key
          && overview.gridState.map((item, k) => <OverviewCard key={k} data={item} />)
      }
      <section className="h5 darkgray mb2">
        <h4 className="h4 mb1">Your devices:</h4>
        {
          overview.devices
          // eslint-disable-next-line react/no-array-index-key
          && overview.devices.map((item, k) => <DeviceCard key={k} data={item} />)
        }
      </section>
    </aside>
  );
}

export default Aside;