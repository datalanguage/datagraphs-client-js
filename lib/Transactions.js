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
function Transactions({ projectId, apiKey, clientId, clientSecret } = {}) {
  const api = new Api({ projectId, apiKey, clientId, clientSecret });

  /**
   * Search transactions
   * @function search
   * @memberOf Transactions#
   * @param {Object} [options]
   * @param {string} [options.filter] - NQL filter
   * @param {number} [options.pageSize=10] - Number of results to return per page
   * @param {number} [options.pageNo=1] - Which page of results to return
   * @param {string} [options.sort] - Sort order in the format {property1}:{asc|desc},{property2}:{asc|desc}
   * @returns {TransactionSearchResults} Search Results
   */
  this.search = ({ pageSize, pageNo, sort, filter, bypassCache } = {}) => {
    return api.getJson("_transactions", {
      qs: {
        pageSize,
        pageNo,
        sort,
        filter,
      },
      bypassCache,
    });
  };
}

/**
 * @typedef TransactionSearchResults Transaction Search Results
 * @property {Object} search
 * @property {number} search.totalResults
 * @property {Object[]} results
 * @property {string} results.id
 */

exports = module.exports = Transactions;
