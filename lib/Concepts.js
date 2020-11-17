const Api = require('./Api');
const { forceArray } = require('./utils/arrays');
const checkCredentials = require('./utils/credentials');
const { parseConceptId, isUrn, parseDatasetId } = require('./utils/ids');

/**
 * Concepts
 * @constructor
 * @param {Object} configuration
 * @param {string} configuration.accountKey Your DataGraphs account key
 * @param {string} configuration.apiKey - Your DataGraphs application API Key
 * @param {string} configuration.clientId - Your DataGraphs application client id
 * @param {string} configuration.clientSecret - Your DataGraphs application client secret
 */
function Concepts({ accountKey, apiKey, clientId, clientSecret } = {}){
  const api = new Api({ accountKey, apiKey, clientId, clientSecret });

  /**
   * Search concepts
   * @function search
   * @memberOf Concepts#
   * @param {Object} [options]
   * @param {string} [options.dataset=_all] - Id of dataset to search
   * @param {string} [options.filter] - NQL filter
   * @param {string} [options.q] - String to search for
   * @param {string|string[]} [options.facets] - List of facets to include in results
   * @param {string|string[]} [options.dateFacets] - List of date facets to include in results
   * @param {number} [options.pageSize=10] - Number of results to return per page
   * @param {number} [options.pageNo=1] - Which page of results to return
   * @param {string} [options.sort] - Sort order in the format {property1}:{asc|desc},{property2}:{asc|desc}
   * @param {string|string[]} [options.embed] - Which relationship properties to embed into the response. Use "_all" to embed all relationships
   * @param {string[]} [options.ids] - List of concept ids to return
   * @returns {ConceptSearchResults} Search Results
   */
  this.search = ({ dataset = '_all', pageSize, pageNo, sort, embed, filter, q, facets, dataFacets, ids } = {}) => {
    const path = getDatasetPath(dataset);
    return api.getJson(path, { qs: {
      pageSize,
      pageNo,
      embed: forceArray(embed).join(','),
      sort,
      filter,
      q,
      facets: forceArray(facets).join(','),
      dataFacets: forceArray(dataFacets).join(','),
      ids: forceArray(ids).join(',')
    } });
  };

  /**
   * Get concept
   * @function get
   * @memberOf Concepts#
   * @param {string} id - Id of the concept to retrieve
   * @param {Object} [options]
   * @param {string|string[]} [options.embed] - Which relationship properties to embed into the response. Use "_all" to embed all relationships
   * @returns {Concept} Concept
   */
  this.get = (id, { embed } = {}) => {
    const { type, key } = parseConceptId(id);
    return api.getJson(`${type}/${key}`, { qs: { embed: forceArray(embed).join(',') } });
  };

  /**
   * Create a new concept
   * @function create
   * @memberOf Concepts#
   * @param {string} dataset - Id of the dataset the new concept should be added to
   * @param {Object} concept - The new concept. This must meet the requirements of the dataset schema
   * @param {string} concept.type - Required if the dataset contains more than 1 type
   * @returns {Concept} Concept
   */
  this.create = async (dataset, concept) => {
    checkCredentials({ clientId, clientSecret });
    const path = getDatasetPath(dataset);
    const res = await api.postJson(path, concept);
    return res.json();
  }

  const getDatasetPath = id => {
    if(isUrn(id)){
      const { key } = parseDatasetId(id);
      return key;
    }
    return id;
  }
}

exports = module.exports = Concepts;

/**
 * @typedef ConceptSearchResults Concept Search Results
 * @property {Object} search
 * @property {number} search.totalResults
 * @property {Object[]} results
 * @property {string} results.id
 */

 /**
 * @typedef Concept Concept
 * @property {string} id
 */