import React from 'react';
import {
  VictoryChart, VictoryLegend, VictoryLine,
} from 'victory';
import { PeriodSummary } from '../utilities/getData';

const SummaryChart = ({ data }: { data: PeriodSummary[] }) => (
  <VictoryChart
    height={240}
    width={600}
    minDomain={{ y: 0 }}
    domainPadding={{ y: 30 }}
  >
    <VictoryLegend
      x={110}
      y={15}
      itemsPerRow={2}
      gutter={20}
      data={[
        { name: 'No Outbreak', symbol: { fill: 'darkgrey' } },
        { name: 'Small Outbreak', symbol: { fill: 'lightpink' } },
        { name: 'Losing, or just Flattening the Curve', symbol: { fill: 'lightcoral' } },
        { name: 'Crushing the Curve, Winning, or Won', symbol: { fill: 'lightseagreen' } },
      ]}
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightseagreen' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="succeeding"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightcoral' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="struggling"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightpink' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="small"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'darkgrey' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="none"
    />
  </VictoryChart>
);

export default SummaryChart;
