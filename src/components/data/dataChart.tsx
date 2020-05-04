import React from 'react';
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryLabel,
} from 'victory';
import { Tag } from 'react-tag-autocomplete';
import { Country } from '../../utilities/types/data';
import Theme from '../shared/general/chartTheme';
import {
  cyanA400,
  deepPurpleA200,
  teal400,
  lightBlueA700,
  purpleA200,
  lightGreen700,
} from '../shared/general/colors';

interface DataChartProps {
  countries: Country[]
  x: string
  y: string
  title: string,
  tags: Tag[]
  showAll: boolean
  startAtDeaths: boolean
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
  countries, x, y, title, tags, showAll, startAtDeaths,
}: DataChartProps) => {
  const selected: Selected = {};
  tags.forEach(
    (tag, index) => {
      selected[tag.name] = selectedColors[index];
    },
  );
  return (
    <>
      <VictoryChart
        theme={Theme}
        height={220}
        width={600}
        padding={{
          top: 16,
          bottom: 30,
          left: 70,
          right: 3,
        }}
        domainPadding={{ x: [0, -4], y: [0, 1] }}
        minDomain={{ y: 0 }}
      >
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis />
        <VictoryLabel
          text={title}
          x={230}
          y={6}
          style={{
            fontSize: 12,
            fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
          }}
        />
        <VictoryLabel
          text="Pandemic Status (corona.rickkln.com)"
          x={80}
          y={35}
          style={{
            fontSize: 6,
            fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
          }}
        />
        <VictoryLabel
          text="Source: JHU CSSE"
          x={80}
          y={43}
          style={{
            fontSize: 6,
            fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
          }}
        />
        {countries.map((country) => {
          if (
            country.name === undefined
            || (!showAll && !Object.keys(selected).includes(country.name))
            || (country.name === 'Global' && !Object.keys(selected).includes(country.name))
          ) {
            return undefined;
          }
          const data = Object.keys(selected).includes(country.name)
            ? {
              stroke: selected[country.name],
              strokeWidth: 1.8,
            }
            : {
              strokeWidth: 1,
            };
          const periods = startAtDeaths
            ? country.periodsWithDeaths.slice(0).reverse()
            : country.periods.slice(0).reverse();
          return (
            <VictoryLine
              key={country.name}
              data={periods}
              interpolation="monotoneX"
              style={{ data }}
              x={startAtDeaths
                ? ''
                : x}
              y={y}
            />
          );
        })}
      </VictoryChart>
    </>
  );
};

export default DataChart;
