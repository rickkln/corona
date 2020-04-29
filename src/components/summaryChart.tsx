import React from 'react';
import {
  VictoryChart, VictoryLegend, VictoryLine, VictoryAxis, VictoryTheme,
} from 'victory';
import { PeriodSummary } from '../utilities/getData';

const SummaryChart = ({ data }: { data: PeriodSummary[] }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    height={240}
    width={600}
    minDomain={{ y: 0 }}
    domainPadding={{ y: 30 }}
  >
    <VictoryLegend
      x={70}
      y={15}
      itemsPerRow={2}
      gutter={20}
      style={{
        labels: { fontSize: 10 },
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
    <VictoryAxis fixLabelOverlap />
    <VictoryAxis dependentAxis />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightgray' },
      }}
      x="endDate"
      y="none"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightpink' },
      }}
      x="endDate"
      y="small"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightcoral' },
      }}
      x="endDate"
      y="losing"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightsalmon' },
      }}
      x="endDate"
      y="flattening"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightskyblue' },
      }}
      x="endDate"
      y="crushing"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightgreen' },
      }}
      x="endDate"
      y="winning"
    />
    <VictoryLine
      data={data}
      style={{
        data: { stroke: 'lightseagreen' },
      }}
      x="endDate"
      y="won"
    />
  </VictoryChart>
);

export default SummaryChart;
