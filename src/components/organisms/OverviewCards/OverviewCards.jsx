import React, { useEffect, useState } from 'react';
import { OverviewCard } from '../../molecules';
import { getGridState } from '../../../services/overview';

function OverviewCards() {
  const [state, setState] = useState({
    powerDraw: '',
    fedGrid: '',
    solarPower: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const queryData = await getGridState();
      setState(queryData);
    };
    fetchData();
  }, []);

  return (
    <>
      <OverviewCard icon="⚡️" value={state.powerDraw} term="Power draw" />
      <OverviewCard icon="☀️️" value={state.solarPower} term="Solar power production" />
      <OverviewCard icon="🔌️" value={state.fedGrid} term="Fed into grid" />
    </>
  );
}

export default OverviewCards;
