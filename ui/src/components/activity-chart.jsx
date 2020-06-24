import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

export function ActivityChart(props) {
  const chartData = props.data.reverse();

  return (
      <BarChart
        width={ 1400 }
        height={ 600 }
        data={ chartData }
      >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="week"/>
          <YAxis/>
          <Tooltip/>
          <Bar stackId="a" dataKey="core" fill="#02d7ac"/>
          <Bar stackId="a" dataKey="regular" fill="#eeed00"/>
          <Bar stackId="a" dataKey="casual" fill="#ee9900"/>
          <Bar stackId="a" dataKey="inactive" fill="#99003d"/>
      </BarChart>
  );
}

ActivityChart.propTypes = {
  data: PropTypes.object,
};

export default ActivityChart;
