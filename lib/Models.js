const Api = require("./Api");

/**
 * Models
 * @constructor
 * @param {Object} configuration
 * @param {string} configuration.projectId Your DataGraphs project id
 * @param {string} configuration.apiKey - Your DataGraphs application API Key
 * @param {string} configuration.clientId - Your DataGraphs application client id
 * @param {string} configuration.clientSecret - Your DataGraphs application client secret
 */
function Models({ projectId, apiKey, clientId, clientSecret } = {}) {
  const api = new Api({ projectId, apiKey, clientId, clientSecret });

  /**
   * Get active model
   * @function getActive
   * @memberOf Models#
   * @returns {Model} Model
   */
  this.getActive = ({ bypassCache } = {}) =>
    api.getJson("models/_active", {
      bypassCache,
    });
}

exports = module.exports = Models;

/**
 * @typedef Model Model
 * @property {string} id
 */
