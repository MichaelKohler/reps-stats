import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

export function BugChart(props) {
  const chartData = Object.keys(props.data).map((group) => ({
    key: group,
    ...props.data[group],
  }));

  return (
      <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
          { !chartData && (
              <p>No data available!</p>
          ) }
          { chartData && (
              <BarChart
                width={ 1000 }
                height={ 400 }
                data={ chartData }
              >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="key"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="FIXED" fill="#00cc7a"/>
                  <Bar dataKey="WONTFIX" fill="#cc0000"/>
                  <Bar dataKey="INVALID" fill="#99003d"/>
                  <Bar dataKey="WORKSFORME" fill="#ffb84d"/>
                  <Bar dataKey="DUPLICATE" fill="#ffbb99"/>
                  <Bar dataKey="INCOMPLETE" fill="#ff1a75"/>
                  <Bar dataKey="OPEN" fill="#007acc"/>
              </BarChart>
          ) }
      </Grid>
  );
}

BugChart.propTypes = {
  data: PropTypes.object,
};

export default BugChart;
