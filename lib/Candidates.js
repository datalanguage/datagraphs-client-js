const Api = require('./Api');
const checkCredentials = require('./utils/credentials');
const logger = require('loglevel');

/**
 * Candidates
 * @constructor
 * @param {Object} configuration
 * @param {string} configuration.accountKey Your DataGraphs account key
 * @param {string} configuration.apiKey - Your DataGraphs application API Key
 * @param {string} configuration.clientId - Your DataGraphs application client id
 * @param {string} configuration.clientSecret - Your DataGraphs application client secret
 */
function Candidates({ accountKey, apiKey, clientId, clientSecret } = {}){
  const api = new Api({ accountKey, apiKey, clientId, clientSecret });

  /**
   * Create a new candidate
   * @function create
   * @memberOf Candidates#
   * @param {Object} candidate - The new candidate
   * @param {string} candidate.label - The label for the new candidate
   * @return {string} id
   */
  this.create = async (candidate) => {
    checkCredentials({ clientId, clientSecret });
    logger.debug(`Creating candidate`, candidate);
    const res = await api.postJson('_candidates', candidate);
    return res.headers.get('location');
  }
}

exports = module.exports = Candidates;