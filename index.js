'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('reps-stats:index');
const bugzilla = require('./lib/bugzilla');

const DATA_PATH = path.join(__dirname, 'ui', 'src', 'DATA.json');

process();

async function process() {
  try {
    const mentorshipStats = await bugzilla.getMentorshipStats();
    const budgetStats = await bugzilla.getBudgetStats();
    const swagStats = await bugzilla.getSwagStats();

    const data = {
      mentorship: mentorshipStats,
      budget: budgetStats,
      swag: swagStats,
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(data));
  } catch (error) {
    debug(error);
  }
}
