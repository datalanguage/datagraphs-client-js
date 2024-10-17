const logger = require("loglevel");
logger.setLevel(process.env.LOG_LEVEL || "error");

const Candidates = require("./Candidates");
const Concepts = require("./Concepts");
const Datasets = require("./Datasets");
const Models = require("./Models");
const Transactions = require("./Transactions.js");

/**
 * DataGraphs API Client
 * @class DataGraphs
 * @property {Datasets} datasets - Contains methods for managing datasets
 * @property {Concepts} concepts - Contains methods for managing concepts
 * @property {Candidates} candidates - Contains methods for managing candidates
 * @property {Models} models - Contains methods for managing models
 * * @property {Transactions} transactions - Contains methods for viewing transactions
 */
class DataGraphs {
  /**
   * @constructor
   * @param {Object} configuration
   * @param {string} configuration.projectId - Your DataGraphs project id
   * @param {string} configuration.apiKey - Your DataGraphs application API Key
   * @param {string} configuration.clientId - Your DataGraphs application client id
   * @param {string} configuration.clientSecret - Your DataGraphs application client secret
   */
  constructor({ projectId, apiKey, clientId, clientSecret } = {}) {
    const config = {
      projectId: projectId || process.env.DATAGRAPHS_PROJECT_ID,
      apiKey: apiKey || process.env.DATAGRAPHS_API_KEY,
      clientId: clientId || process.env.DATAGRAPHS_CLIENT_ID,
      clientSecret: clientSecret || process.env.DATAGRAPHS_CLIENT_SECRET,
    };

    this.datasets = new Datasets(config);
    this.concepts = new Concepts(config);
    this.candidates = new Candidates(config);
    this.models = new Models(config);
    this.transactions = new Transactions(config);
  }
}

exports = module.exports = DataGraphs;
