import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

export function BugChartVertical(props) {
  const chartData = Object.keys(props.data).map((group) => ({
    key: group,
    ...props.data[group],
  }))
    .reverse();

  return (
      <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
          { !chartData && (
              <p>No data available!</p>
          ) }
          { chartData && (
              <BarChart
                width={ 1000 }
                height={ 2000 }
                data={ chartData }
                layout="vertical"
              >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis hide type="number"/>
                  <YAxis type="category" dataKey="key"/>
                  <Tooltip/>
                  <Bar dataKey="FIXED" stackId="a" fill="#00cc7a"/>
                  <Bar dataKey="WONTFIX" stackId="a" fill="#cc0000"/>
                  <Bar dataKey="INVALID" stackId="a" fill="#99003d"/>
                  <Bar dataKey="WORKSFORME" stackId="a" fill="#ffb84d"/>
                  <Bar dataKey="DUPLICATE" stackId="a" fill="#ffbb99"/>
                  <Bar dataKey="INCOMPLETE" stackId="a" fill="#ff1a75"/>
                  <Bar dataKey="OPEN" stackId="a" fill="#007acc"/>
              </BarChart>
          ) }
      </Grid>
  );
}

BugChartVertical.propTypes = {
  data: PropTypes.object,
};

export default BugChartVertical;
