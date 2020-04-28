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
      x={60}
      y={15}
      itemsPerRow={2}
      gutter={20}
      style={{
        labels: { fontSize: 12 },
      }}
      data={[
        { name: 'No Outbreak', symbol: { fill: 'lightgray' } },
        { name: 'Small Outbreak', symbol: { fill: 'lightpink' } },
        { name: 'Losing', symbol: { fill: 'lightcoral' } },
        { name: 'Flattening the Curve', symbol: { fill: 'lightsalmon' } },
        { name: 'Crushing the Curve', symbol: { fill: 'lightskyblue' } },
        { name: 'Winning', symbol: { fill: 'lightgreen' } },
        { name: 'Won', symbol: { fill: 'lightseagreen' } },
      ]}
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightgray' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="none"
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
        data: { stroke: 'lightcoral' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="losing"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightsalmon' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="flattening"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightskyblue' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="crushing"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightgreen' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="winning"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightseagreen' },
        parent: { border: '1px solid #ccc' },
      }}
      x="date"
      y="won"
    />
  </VictoryChart>
);

export default SummaryChart;
