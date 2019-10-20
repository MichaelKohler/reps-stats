'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('reps-stats:index');
const bugzilla = require('./lib/bugzilla');

const DATA_PATH = path.join(__dirname, 'ui', 'src', 'DATA.json');

process();

async function process() {
  const mentorshipStats = await bugzilla.getMentorshipStats();
  const portalStats = await bugzilla.getPortalStats();

  const data = {
    mentorship: mentorshipStats,
    portal: portalStats,
  };

  fs.writeFileSync(DATA_PATH, JSON.stringify(data));
}