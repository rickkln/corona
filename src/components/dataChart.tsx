import React from 'react';
import {
  VictoryChart, VictoryLine, VictoryAxis,
} from 'victory';
import { Tag } from 'react-tag-autocomplete';
import { Country } from '../utilities/getData';
import Theme from './chartTheme';

interface DataChartProps {
  countries: Country[]
  tags: Tag[]
  x: string
  y: string
}

const DataChart = ({
  countries, tags, x, y,
}: DataChartProps) => {
  const selected = tags.map((tag) => tag.name);
  return (
    <VictoryChart
      theme={Theme}
      height={220}
      width={600}
      padding={{
        top: 10,
        bottom: 30,
        left: 65,
        right: 3,
      }}
      minDomain={{ y: 0 }}
    >
      <VictoryAxis fixLabelOverlap />
      <VictoryAxis dependentAxis />
      {countries.map((country) => {
        const data = selected.includes(country.name ?? '')
          ? {
            stroke: 'lightgreen',
            strokeWidth: 1.8,
          }
          : {
            strokeWidth: 1,
            strokeOpacity: 0.2,
          };
        return (
          <VictoryLine
            key={country.name}
            data={country.periods.slice(0).reverse()}
            style={{ data }}
            x={x}
            y={y}
          />
        );
      })}
    </VictoryChart>
  );
};

export default DataChart;
