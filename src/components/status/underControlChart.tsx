import React from 'react';
import {
  VictoryChart, VictoryLegend, VictoryAxis, VictoryLabel, VictoryArea,
} from 'victory';
import { PeriodSummary } from '../../utilities/types/data';
import Theme from '../shared/general/chartTheme';

const UnderControlChart = ({ data }: { data: PeriodSummary[] }) => (
  <VictoryChart
    theme={Theme}
    height={240}
    width={600}
    minDomain={{ y: 0 }}
  >
    <VictoryLegend
      x={95}
      y={15}
      orientation="horizontal"
      gutter={25}
      data={[
        { name: '% Flattening/Losing', symbol: { fill: 'lightcoral' } },
        { name: '% None/Small/Crushing/Winning/Won', symbol: { fill: 'lightgreen' } },
      ]}
    />
    <VictoryAxis fixLabelOverlap />
    <VictoryAxis dependentAxis />
    <VictoryLabel
      text="Pandemic Status (corona.rickkln.com)"
      x={400}
      y={64}
      style={{
        fontSize: 6,
        fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
      }}
    />
    <VictoryLabel
      text="Source: JHU CSSE"
      x={400}
      y={72}
      style={{
        fontSize: 6,
        fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
      }}
    />
    <VictoryArea
      data={data}
      interpolation="monotoneX"
      style={{
        data: {
          fill: 'lightcoral',
          fillOpacity: 0.5,
          stroke: 'lightcoral',
          strokeWidth: 0,
        },
      }}
      x="endDate"
      y={() => 100}
      y0="underControl"
    />
    <VictoryArea
      data={data}
      interpolation="monotoneX"
      style={{
        data: {
          fill: 'lightgreen',
          fillOpacity: 0.5,
          stroke: 'lightgreen',
          strokeWidth: 2,
        },
      }}
      x="endDate"
      y="underControl"
    />
  </VictoryChart>
);

export default UnderControlChart;
