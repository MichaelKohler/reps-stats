import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export function WeightChart(props) {
  return (
      <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
          { props.statsFailed && (
              <p>Oh no, something went wrong while fetching the stats!</p>
          ) }
          { props.stats.weight && (
              <LineChart
                width={ 1100 }
                height={ 300 }
                data={ props.stats.weight }
              >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="createdAt"/>
                  <YAxis type="number" domain={[75, 85]}/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="weight" stroke="#1f3352" activeDot={ { r: 8 } }/>
              </LineChart>
          ) }
      </Grid>
  );
}

WeightChart.propTypes = {
  stats: PropTypes.object,
  statsFailed: PropTypes.bool,
};

export default WeightChart;
