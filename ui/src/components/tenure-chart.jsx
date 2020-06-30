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
          <Bar stackId="a" dataKey="2011" fill="#ff3f3f"/>
          <Bar stackId="a" dataKey="2012" fill="#f7a8a5"/>
          <Bar stackId="a" dataKey="2013" fill="#ffcc06"/>
          <Bar stackId="a" dataKey="2014" fill="#fcd88a"/>
          <Bar stackId="a" dataKey="2015" fill="#0a9ad7"/>
          <Bar stackId="a" dataKey="2016" fill="#b4c8a1"/>
          <Bar stackId="a" dataKey="2017" fill="#9ad70a"/>
          <Bar stackId="a" dataKey="2018" fill="#95c8bf"/>
          <Bar stackId="a" dataKey="2019" fill="#d70a9a"/>
          <Bar stackId="a" dataKey="2020" fill="#cc4242"/>
      </BarChart>
  );
}

ActivityChart.propTypes = {
  data: PropTypes.object,
};

export default ActivityChart;
