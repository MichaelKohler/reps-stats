import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import getDefaultStyle from './styles';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
  fixedHeight: {
    height: 120,
  },
}));

export default function Overview() {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="xl" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      <h1>Different Mozilla Reps statistics</h1>
                      <p>This only shows the status as it is, there are no assumptions done about any quality.</p>
                      <p>Please choose your report in the sidebar.</p>
                  </Grid>
              </Grid>
          </Container>
      </section>
  );
}
