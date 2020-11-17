const Candidates = require('./Candidates');
const Concepts = require('./Concepts');
const Datasets = require('./Datasets');

/**
 * DataGraphs API Client
 * @class DataGraphs
 * @property {Datasets} datasets - Contains methods for managing datasets
 * @property {Concepts} concepts - Contains methods for managing concepts
 * @property {Candidates} candidates - Contains methods for managing candidates
 */
class DataGraphs{

  /**
   * @constructor
   * @param {Object} configuration
   * @param {string} configuration.accountKey - Your DataGraphs account key
   * @param {string} configuration.apiKey - Your DataGraphs application API Key
   * @param {string} configuration.clientId - Your DataGraphs application client id
   * @param {string} configuration.clientSecret - Your DataGraphs application client secret
  */
  constructor({ accountKey, apiKey, clientId, clientSecret } = {}){
    const config = {
      accountKey: accountKey || process.env.DATAGRAPHS_ACCOUNT_KEY,
      apiKey: apiKey || process.env.DATAGRAPHS_API_KEY,
      clientId: clientId || process.env.DATAGRAPHS_CLIENT_ID,
      clientSecret: clientSecret || process.env.DATAGRAPHS_CLIENT_SECRET
    }
    
    this.datasets = new Datasets(config);
    this.concepts = new Concepts(config);
    this.candidates = new Candidates(config);
  }

}

exports = module.exports = DataGraphs;