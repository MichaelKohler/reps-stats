import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import getDefaultStyle from './styles';

import TenureChart from './components/tenure-chart.jsx';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
  fixedHeight: {
    height: 120,
  },
}));

export default function Tenure(props) {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="xl" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      <h1>{ props.title }</h1>
                      <TenureChart data={ props.data }/>
                  </Grid>
              </Grid>
          </Container>
      </section>
  );
}

Tenure.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
};
