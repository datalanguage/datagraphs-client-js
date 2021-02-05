const Api = require('./Api');

/**
 * Types
 * @constructor
 * @param {Object} configuration
 * @param {string} configuration.accountKey Your DataGraphs account key
 * @param {string} configuration.apiKey - Your DataGraphs application API Key
 * @param {string} configuration.clientId - Your DataGraphs application client id
 * @param {string} configuration.clientSecret - Your DataGraphs application client secret
 */
function Types({ accountKey, apiKey, clientId, clientSecret } = {}){
  const api = new Api({ accountKey, apiKey, clientId, clientSecret });

  /**
   * Get all types
   * @function all
   * @memberOf Types#
   * @returns {Type[]} Types
   */
  this.all = () => api.getJson('_types');
}

exports = module.exports = Types;

/**
 * @typedef Type Type Search Results
 * @property {string} id
 * @property {string} label
 * @property {string[]} parentTypes - Ids of parent types
 * @property {Date} createdDate - The date the type was created
 * @property {Date} lastModifiedDate - The date the type was last modified
 */