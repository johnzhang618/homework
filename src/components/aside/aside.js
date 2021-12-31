import { OverviewContext } from '../../contexts/overviewContext';
import DeviceCard from './deviceCard';
import OverviewCard from './overviewCard';
import React, { useContext } from 'react';

const Aside = () => {
    const { overview } = useContext(OverviewContext);
    return (
        <aside className="p3 menuWidth overflow-auto">
            {
                overview.gridState.map((iterm, k) => <OverviewCard key={k} data={iterm} />)
            }
            <section className="h5 darkgray mb2">
                <h4 className="h4 mb1">Your devices:</h4>
                {
                    overview.devices.map((iterm, k) => <DeviceCard key={k} data={iterm} />)
                }
            </section>
        </aside>
    );
}

export default Aside
