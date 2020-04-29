import { VictoryTheme } from 'victory';

const fontFamily = `
  "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
  "Liberation Mono", Menlo, Courier, monospace
`;

const Theme = {
  ...VictoryTheme.material,
  axis: {
    ...VictoryTheme.material.axis,
    style: {
      ...VictoryTheme.material.axis?.style,
      tickLabels: {
        ...VictoryTheme.material.axis?.style?.tickLabels,
        fontFamily,
        fontSize: 10,
      },
    },
  },
  legend: {
    ...VictoryTheme.material.legend,
    style: {
      ...VictoryTheme.material.legend?.style,
      labels: {
        ...VictoryTheme.material.legend?.style?.labels,
        fontFamily,
        fontSize: 10,
      },
    },
  },
};

export default Theme;
