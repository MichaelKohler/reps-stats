import React from 'react';
import PropTypes from 'prop-types';

import Bugs from './bugs.jsx';

export default function Portal(props) {
  return (
      <Bugs data={ props.portal } title="Portal (reps.mozilla.org)"/>
  );
}

Portal.propTypes = {
  portal: PropTypes.object,
};
