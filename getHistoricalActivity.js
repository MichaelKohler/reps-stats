'use strict';

// This needs a copy of https://github.com/mozilla/reps-archive/ checked out on your machine.

const fs = require('fs').promises;
const path = require('path');
const debug = require('debug')('reps-stats:historic');

const MINIMUM_DATE = new Date(2012, 5, 1);

const { ARCHIVE_PATH } = process.env;
const ACTIVITIES_DATA_PATH = path.join(__dirname, 'ui', 'src', 'DATA-activity.json');
const TENURE_DATA_PATH = path.join(__dirname, 'ui', 'src', 'DATA-tenure.json');

if (!ARCHIVE_PATH) {
  console.error('ARCHIVE_PATH is required and needs to point to valid checkout of reps-archive, aborting.');
  process.exit(1);
}

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

const BUCKETS = [{
  name: 'core',
  thresholdInMs: 1 * 4 * WEEK_IN_MS,
}, {
  name: 'regular',
  thresholdInMs: 3 * 4 * WEEK_IN_MS,
}, {
  name: 'casual',
  thresholdInMs: 6 * 4 * WEEK_IN_MS,
}];

processData();

async function processData() {
  try {
    debug('Read Activity data');
    const activityContent = await fs.readFile(`${ARCHIVE_PATH}/data/ACTIVITIES.json`, 'utf-8');
    const activities = JSON.parse(activityContent);

    debug('Read Reps data');
    const repsContent = await fs.readFile(`${ARCHIVE_PATH}/data/REPS.json`, 'utf-8');
    const reps = JSON.parse(repsContent);

    debug('Group by Rep and sort activities by date');
    const enhancedReps = getRepsInfo(reps, activities);

    const now = new Date();
    const stats = [];
    const tenureStats = [];
    for (let currentDate = now; currentDate >= MINIMUM_DATE; currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7)) {
      const periodStats = getActivityStatsForDate(enhancedReps, currentDate);
      stats.push(periodStats);

      const tenurePeriodStats = getTenureStatsForDate(enhancedReps, currentDate);
      tenureStats.push(tenurePeriodStats);
    }

    await fs.writeFile(ACTIVITIES_DATA_PATH, JSON.stringify(stats));
    await fs.writeFile(TENURE_DATA_PATH, JSON.stringify(tenureStats));
    debug(`Files written to ${ACTIVITIES_DATA_PATH}`);
  } catch (error) {
    debug(error);
  }
}

function getRepsInfo(reps, activities) {
  debug(`${activities.length} activities to be sorted and assigned`);
  const enhancedReps = reps.map((rep) => {
    const repActivities = activities
      .filter((activity) => activity.user.display_name === rep.display_name)
      .map((activity) => activity.report_date)
      .sort((a, b) => a - b);

    return {
      display_name: rep.display_name,
      dateJoined: rep.date_joined_program && new Date(rep.date_joined_program),
      dateLeft: rep.date_left_program && new Date(rep.date_left_program),
      country: rep.country,
      activities: repActivities,
      mentor: rep.groups && !!rep.groups.find((group) => group.name === 'Mentor'),
    };
  });

  return enhancedReps;
}

function getActivityStatsForDate(reps, date) {
  const repsInProgram = reps.filter((rep) => {
    const hadLeftProgram = rep.dateLeft ? rep.dateLeft <= date : false;
    return rep.dateJoined <= date && !hadLeftProgram;
  });

  const bucketForDate = BUCKETS.map((bucket) => ({
    name: bucket.name,
    thresholdDate: new Date(date.getTime() - bucket.thresholdInMs),
  }));

  debug(`${date} - Thresholds`, bucketForDate);

  const bucketStats = {
    inactive: 0,
  };

  repsInProgram.forEach((rep) => {
    const latestReportBeforeDate = rep.activities.find((activity) => new Date(activity) <= date);
    const bucket = bucketForDate.find((bucket) => new Date(latestReportBeforeDate) >= bucket.thresholdDate);
    if (bucket) {
      bucketStats[bucket.name] = (bucketStats[bucket.name] || 0) + 1;
    } else {
      bucketStats.inactive++;
    }
  });

  return {
    week: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    totalReps: repsInProgram.length,
    ...bucketStats,
  };
}

function getTenureStatsForDate(reps, date) {
  const repsInProgram = reps.filter((rep) => {
    const hadLeftProgram = rep.dateLeft ? rep.dateLeft <= date : false;
    return rep.dateJoined <= date && !hadLeftProgram;
  });

  const tenureStats = {};
  repsInProgram.forEach((rep) => {
    const joinedYear = rep.dateJoined.getFullYear();

    if (!tenureStats[joinedYear]) {
      tenureStats[joinedYear] = 0;
    }

    tenureStats[joinedYear] = tenureStats[joinedYear] + 1;
  });

  return {
    week: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    ...tenureStats,
  };
}

function pad(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
}
