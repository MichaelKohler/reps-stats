import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import getDefaultStyle from './styles';

import BugChart from './components/bug-chart.jsx';
import BugChartVertical from './components/bug-chart-vertical.jsx';

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
                      <p>This only shows the status as it is, there are no assumptions done about any quality.</p>
                      <p>The status reflects the current status, not historical.</p>
                      <h2>Grouped by year</h2>
                      <BugChart data={ props.data.byYear }/>
                      <h2>Grouped by month</h2>
                      <BugChartVertical data={ props.data.byMonth }/>
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
