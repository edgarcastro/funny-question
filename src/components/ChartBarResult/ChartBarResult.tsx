import React from 'react';
import { Paper } from '@mui/material';
import { XYPlot, VerticalBarSeries } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const data = [
  { x: 0, y: 80 },
  { x: 1, y: 5 },
];

export const ChartBarResult: React.FC = () => (
  <Paper elevation={3}>
    <XYPlot height={300} width={300}>
      <VerticalBarSeries barWidth={0.8} data={data} />
    </XYPlot>
  </Paper>
);
