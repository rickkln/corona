import React from 'react';
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryTheme,
} from 'victory';
import { Country } from '../utilities/getData';

interface DataChartProps {
  data: Country[]
  x: string
  y: string
}

const DataChart = ({ data, x, y }: DataChartProps) => (
  <VictoryChart
    theme={VictoryTheme.material}
    height={220}
    width={600}
    padding={{
      top: 10,
      bottom: 40,
      left: 70,
      right: 40,
    }}
    minDomain={{ y: 0 }}
  >
    <VictoryAxis fixLabelOverlap />
    <VictoryAxis dependentAxis />
    {console.log(data)}
    {data.map((country) => (
      <VictoryLine
        key={country.name}
        data={country.periods.slice(0).reverse()}
        style={
          country.name === 'United Kingdom'
            ? {
              data: {
                stroke: 'lightgreen',
                strokeWidth: 2,
              },
            }
            : {
              data: {
                strokeWidth: 1.5,
                strokeOpacity: 0.2,
              },
            }
        }
        x={x}
        y={y}
      />
    ))}
  </VictoryChart>
);

export default DataChart;
