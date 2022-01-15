import React, { useState } from 'react';
import { Heading } from '../../atoms';
import { UsageBarChart } from '../../molecules';
import ChartController from '../../organisms/ChartController/ChartController';
import { getNDaysAgoTmp } from '../../../utils/utils';

function Main() {
  const nowTmp = new Date();
  const originStart = getNDaysAgoTmp(29, nowTmp);
  const [state, setState] = useState({
    start: originStart,
    end: nowTmp.getTime(),
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
