import React from 'react';
import { Heading } from '../../atoms';
import { UsageBarChart, ChartController } from '../../molecules';

function Main() {
  return (
    <article className="bg-very-light-grey p3 flex-auto overflow-auto">
      <Heading HeadingType="h1" className="regular darkgray line-height-1 mb3">Energy consumption</Heading>
      <ChartController />
      <UsageBarChart />
    </article>
  );
}

export default Main;
