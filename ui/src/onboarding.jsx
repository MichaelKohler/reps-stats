import React from 'react';
import PropTypes from 'prop-types';

import Bugs from './bugs.jsx';

export default function Onboarding(props) {
  return (
      <Bugs data={ props.mentorship } title="Onboarding (Reps Applications)"/>
  );
}

Onboarding.propTypes = {
  mentorship: PropTypes.object,
};
