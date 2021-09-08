const Api = require("./Api");
const { forceArray } = require("./utils/arrays");
const checkCredentials = require("./utils/credentials");
const { parseConceptId, isUrn, parseDatasetId } = require("./utils/ids");

/**
 * Concepts
 * @constructor
 * @param {Object} configuration
 * @param {string} configuration.accountKey Your DataGraphs account key
 * @param {string} configuration.apiKey - Your DataGraphs application API Key
 * @param {string} configuration.clientId - Your DataGraphs application client id
 * @param {string} configuration.clientSecret - Your DataGraphs application client secret
 */
function Concepts({ accountKey, apiKey, clientId, clientSecret } = {}) {
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
  this.search = ({
    dataset = "_all",
    pageSize,
    pageNo,
    sort,
    embed,
    filter,
    q,
    facets,
    dataFacets,
    ids,
  } = {}) => {
    const path = getDatasetPath(dataset);
    return api.getJson(path, {
      qs: {
        pageSize,
        pageNo,
        embed: forceArray(embed).join(","),
        sort,
        filter,
        q,
        facets: forceArray(facets).join(","),
        dataFacets: forceArray(dataFacets).join(","),
        ids: forceArray(ids).join(","),
      },
    });
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
    return api.getJson(`${type}/${key}`, {
      qs: { embed: forceArray(embed).join(",") },
    });
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
  };

  /**
   * Create new concepts
   * @function createBulk
   * @memberOf Concepts#
   * @param {string} dataset - Id of the dataset the new concepts should be added to
   * @param {Object[]} concepts - The new concept. This must meet the requirements of the dataset schema
   * @param {string} concepts.type - Required if the dataset contains more than 1 type
   * @returns {BulkRequestResults} result
   */
   this.createBulk = async (dataset, concepts) => {
    checkCredentials({ clientId, clientSecret });
    const path = getDatasetPath(dataset);
    const res = await api.postJson(path, concepts);
    return res.json();
  };

  /**
   * Upsert a concept
   * @function upsert
   * @memberOf Concepts#
   * @param {string} dataset - Id of the dataset the concept belongs
   * @param {Object} concept - The concept. This must meet the requirements of the dataset schema
   * @param {string} concept.type - Required if the dataset contains more than 1 type
   * @returns {Concept} Concept
   */
   this.upsert = async (dataset, concept) => {
    checkCredentials({ clientId, clientSecret });
    const path = getDatasetPath(dataset);
    const res = await api.putJson(path, concept);
    return res.json();
  };

  /**
   * Upsert concepts
   * @function upsertBulk
   * @memberOf Concepts#
   * @param {string} dataset - Id of the dataset the concept belongs
   * @param {Object[]} concepts - The concepts. This must meet the requirements of the dataset schema
   * @param {string} concepts.type - Required if the dataset contains more than 1 type
   * @returns {BulkRequestResults} result
   */
   this.upsertBulk = async (dataset, concepts) => {
    checkCredentials({ clientId, clientSecret });
    const path = getDatasetPath(dataset);
    const res = await api.putJson(path, concepts);
    return res.json();
  };

  /**
   * Update an existing concept
   * @function update
   * @memberOf Concepts#
   * @param {string} id - The id of the concept to be updated
   * @param {Object} patch - object containing any fields to be modified
   * @returns {Concept} Concept
   */
  this.update = async (id, patch) => {
    const { type, key } = parseConceptId(id);
    const res = await api.patchJson(`${type}/${key}`, patch);
    return res.json();
  };

  /**
   * Replace an existing concept
   * @function replace
   * @memberOf Concepts#
   * @param {string} id - The id of the concept to be updated
   * @param {Object} concept - object containing the new state of the concept
   * @returns {Concept} Concept
   */
   this.replace = async (id, concept) => {
    const { type, key } = parseConceptId(id);
    const res = await api.putJson(`${type}/${key}`, concept);
    return res.json();
  };

  /**
   * Delete a concept
   * @function delete
   * @memberOf Concepts#
   * @param {string} id - The id of the concept to be deleted
   */
  this.delete = async (id) => {
    const { type, key } = parseConceptId(id);
    await api.delete(`${type}/${key}`);
  }

  const getDatasetPath = (id) => {
    if (isUrn(id)) {
      const { key } = parseDatasetId(id);
      return key;
    }
    return id;
  };
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

/**
 * @typedef BulkRequestResults Bulk Request Results
 * @property {number} created - The number of new concepts created
 * @property {number} updated - The number of existing concepts that were updated
 * @property {number} existing - The number of concepts that were ignored because they already exist
 * @property {number} total - The total number of concepts that were created or updated
 */
