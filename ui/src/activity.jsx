import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import getDefaultStyle from './styles';

import ActivityChart from './components/activity-chart.jsx';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
  fixedHeight: {
    height: 120,
  },
}));

export default function Bugs(props) {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="xl" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      <h1>{ props.title }</h1>
                      <p>This shows the Reps Activity per week over time. Note that this is not updated regularly. The last update was done when moving to the Community Portal.</p>
                      <ul>
                          <li>Core: activity report within the last 4 weeks</li>
                          <li>Regular: activity report within the last 12 weeks</li>
                          <li>Casual: activity report within the last 24 weeks</li>
                          <li>Inactive: activity report longer than 24 weeks ago</li>
                      </ul>
                      <ActivityChart data={ props.data }/>
                  </Grid>
              </Grid>
          </Container>
      </section>
  );
}

Bugs.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
};
