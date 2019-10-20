'use strict';

const debug = require('debug')('reps-stats:lib:bugzilla');
const axios = require('axios');
const _groupBy = require('lodash.groupby');
const config = require('../config.json');

module.exports = {
  getMentorshipStats,
  getPortalStats,
};

const TOKEN = config.bugzilla;
const BASE_URL = 'https://bugzilla.mozilla.org';

function fetch({ endpoint, product, component, fields }) {
  const url = `${BASE_URL}/rest/${endpoint}?product=${encodeURIComponent(product)}&component=${encodeURIComponent(component)}&api_key=${TOKEN}`;
  const urlWithFields = fields ? `${url}&include_fields=${fields}` : url;
  debug('Fetching', urlWithFields);
  return axios.get(urlWithFields)
    .then((response) => {
      return response.data.bugs;
    });
}

function getMentorshipStats() {
  debug('Getting mentorship stats..');
  return fetch({
    endpoint: 'bug',
    product: 'Mozilla Reps',
    component: 'Mentorship',
    fields: 'creation_time,resolution',
  })
    .then(sumByMonthAndYear)
    .catch((error) => {
      debug(error);
      return {};
    });
}

function getPortalStats() {
  debug('Getting portal stats..');
  return fetch({
    endpoint: 'bug',
    product: 'Mozilla Reps',
    component: 'reps.mozilla.org',
    fields: 'creation_time,resolution',
  })
    .then(sumByMonthAndYear)
    .catch((error) => {
      debug(error);
      return {};
    });
}

function sumByMonthAndYear(bugs) {
  const groupedByMonth = _groupBy(bugs, (bug) => bug.creation_time.substring(0, 7));
  const groupedByYear = _groupBy(bugs, (bug) => bug.creation_time.substring(0, 4));

  return {
    byMonth: sumUpByResolution(groupedByMonth),
    byYear: sumUpByResolution(groupedByYear),
  }
}

function sumUpByResolution(bugs) {
  return Object.keys(bugs).reduce((summedGroups, groupId) => {
    const bugsInGroup = bugs[groupId];
    const sums = bugsInGroup.reduce((counts, bug) => {
      const resolution = bug.resolution;
      const key = resolution || 'OPEN';

      counts[key] = Number.isInteger(counts[key]) ? counts[key] + 1 : 1;

      return counts;
    }, {});

    summedGroups[groupId] = sums;

    return summedGroups;
  }, {});
}