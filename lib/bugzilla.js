'use strict';

const debug = require('debug')('reps-stats:lib:bugzilla');
const axios = require('axios');
const _groupBy = require('lodash.groupby');
const config = require('../config.json');

module.exports = {
  getMentorshipStats,
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
    fields: 'creation_time,status,resolution',
  })
    .then(groupByCreationMonth)
    .then(sumUpByResolution)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      debug(error);
      return {};
    });
}

function groupByCreationMonth(bugs) {
  return _groupBy(bugs, (bug) => bug.creation_time.substring(0, 7));
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