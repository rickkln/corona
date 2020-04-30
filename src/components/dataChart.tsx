import React from 'react';
import {
  VictoryChart, VictoryLine, VictoryAxis,
} from 'victory';
import { Tag } from 'react-tag-autocomplete';
import { Country } from '../utilities/getData';
import Theme from './chartTheme';
import {
  purpleA100, tealA200, cyanA400, deepPurpleA200, lightBlueA700, greenA700, purpleA200, green600, teal400, green900, green700, lightGreen700,
} from './colors';

interface DataChartProps {
  countries: Country[]
  tags: Tag[]
  x: string
  y: string
}

interface Selected {
  [key: string]: string
}

const selectedColors = [
  cyanA400,
  deepPurpleA200,
  teal400,
  lightBlueA700,
  purpleA200,
  lightGreen700,
];

const DataChart = ({
  countries, tags, x, y,
}: DataChartProps) => {
  const selected: Selected = {};
  tags.forEach(
    (tag, index) => {
      selected[tag.name] = selectedColors[index];
    },
  );
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
        if (country.name === undefined) { return undefined; }
        const data = Object.keys(selected).includes(country.name)
          ? {
            stroke: selected[country.name],
            strokeWidth: 1.8,
          }
          : {
            strokeWidth: 1,
          };
        return (
          <VictoryLine
            key={country.name}
            data={country.periods.slice(0).reverse()}
            interpolation="monotoneX"
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
