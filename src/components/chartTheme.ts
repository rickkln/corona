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
        fill: 'hsla(0, 0%, 0%, 0.8)',
      },
      axis: {
        ...VictoryTheme.material.axis?.style?.axis,
        stroke: 'hsla(0, 0%, 0%, 0.8)',
      },
      grid: {
        ...VictoryTheme.material.axis?.style?.grid,
        stroke: 'hsla(0, 0%, 0%, 0.12)',
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
        fontSize: 11,
      },
    },
  },
  line: {
    ...VictoryTheme.material.line,
    style: {
      ...VictoryTheme.material.line?.style,
      data: {
        ...VictoryTheme.material.line?.style?.data,
        stroke: 'hsla(0, 0%, 0%, 0.2)',
      },
    },
  },
};

export default Theme;
