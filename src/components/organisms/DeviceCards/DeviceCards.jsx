import React, { useState, useEffect } from 'react';
import { DeviceCard } from '../../molecules';
import { Heading } from '../../atoms';
import { getDevicesStates } from '../../../services/overview';

function DeviceCards() {
  const [state, setState] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const queryData = await getDevicesStates();
      setState(queryData);
    };
    fetchData();
  }, []);

  return (
    <section className="h5 darkgray mb2">
      <Heading HeadingType="h4" className="h4 mb1">Your devices:</Heading>
      {
        state && state.map((item) => <DeviceCard key={item.id} data={item} />)
      }
    </section>
  );
}

export default DeviceCards;
