'use strict';

const debug = require('debug')('reps-stats:lib:bugzilla');
const axios = require('axios');
const _groupBy = require('lodash.groupby');

module.exports = {
  getMentorshipStats,
  getPortalStats,
  getBudgetStats,
  getSwagStats,
};

const BASE_URL = 'https://bugzilla.mozilla.org';
const { BUGZILLA_TOKEN } = process.env;

if (!BUGZILLA_TOKEN) {
  throw new Error('No BUGZILLA_TOKEN passed!');
}

function fetch({ endpoint, product, component, fields }) {
  const url = `${BASE_URL}/rest/${endpoint}?product=${encodeURIComponent(product)}&component=${encodeURIComponent(component)}&api_key=${BUGZILLA_TOKEN}`;
  const urlWithFields = fields ? `${url}&include_fields=${fields}` : url;
  debug('Fetching', urlWithFields);
  return axios.get(urlWithFields)
    .then((response) => response.data.bugs);
}

function getMentorshipStats() {
  debug('Getting mentorship stats..');
  return fetch({
    endpoint: 'bug',
    product: 'Mozilla Reps',
    component: 'Mentorship',
    fields: 'creation_time,resolution',
  })
    .then(sumByMonthAndYear);
}

function getPortalStats() {
  debug('Getting portal stats..');
  return fetch({
    endpoint: 'bug',
    product: 'Mozilla Reps',
    component: 'reps.mozilla.org',
    fields: 'creation_time,resolution',
  })
    .then(sumByMonthAndYear);
}

function getBudgetStats() {
  debug('Getting budget request stats..');
  return fetch({
    endpoint: 'bug',
    product: 'Mozilla Reps',
    component: 'Budget Requests',
    fields: 'creation_time,resolution',
  })
    .then(sumByMonthAndYear);
}

function getSwagStats() {
  debug('Getting budget request stats..');
  return fetch({
    endpoint: 'bug',
    product: 'Mozilla Reps',
    component: 'Swag Requests',
    fields: 'creation_time,resolution',
  })
    .then(sumByMonthAndYear);
}

function sumByMonthAndYear(bugs) {
  const groupedByMonth = _groupBy(bugs, (bug) => bug.creation_time.substring(0, 7)); // eslint-disable-line no-magic-numbers
  const groupedByYear = _groupBy(bugs, (bug) => bug.creation_time.substring(0, 4)); // eslint-disable-line no-magic-numbers

  return {
    byMonth: sumUpByResolution(groupedByMonth),
    byYear: sumUpByResolution(groupedByYear),
  };
}

function sumUpByResolution(bugs) {
  return Object.keys(bugs).reduce((summedGroups, groupId) => {
    const bugsInGroup = bugs[groupId];
    const sums = bugsInGroup.reduce((counts, bug) => {
      const key = bug.resolution || 'OPEN';

      counts[key] = Number.isInteger(counts[key]) ? counts[key] + 1 : 1; // eslint-disable-line no-magic-numbers

      return counts;
    }, {});

    summedGroups[groupId] = sums;

    return summedGroups;
  }, {});
}
