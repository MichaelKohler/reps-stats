'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('reps-stats:index');
const bugzilla = require('./lib/bugzilla');

const DATA_PATH = path.join(__dirname, 'ui', 'DATA.json');

const mentorshipStats = bugzilla.getMentorshipStats();

const data = {
  mentorship: mentorshipStats,
};

fs.writeFileSync(DATA_PATH, JSON.stringify(data));
