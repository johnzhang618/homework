import React from 'react';
import { OverviewCards, DeviceCards } from '../../organisms';

function Aside() {
  return (
    <aside className="p3 menuWidth overflow-auto">
      <OverviewCards />
      <DeviceCards />
    </aside>
  );
}

export default Aside;
