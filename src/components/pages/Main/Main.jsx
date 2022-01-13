import React, { useState } from 'react';
import { Heading } from '../../atoms';
import { UsageBarChart } from '../../molecules';
import ChartController from '../../organisms/ChartController/ChartController';

const getNDaysAgoTmp = (n, current) => {
  const date = new Date(current);
  let nDaysAgo = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  nDaysAgo = nDaysAgo.setDate(nDaysAgo.getDate() - n);
  return nDaysAgo;
};

function Main() {
  const nowTmp = Date.now();
  const originStart = getNDaysAgoTmp(29, nowTmp);
  const [state, setState] = useState({
    start: originStart,
    end: nowTmp,
  });

  return (
    <article className="bg-very-light-grey p3 flex-auto overflow-auto">
      <Heading HeadingType="h1" className="regular darkgray line-height-1 mb3">Energy consumption</Heading>
      <ChartController value={state} onChange={setState} />
      <UsageBarChart value={state} />
    </article>
  );
}

export default Main;
