const DataGraphsError = require('./DataGraphsError');

/**
 * API Error - An error thrown if an error is returned by the API
 * @class ApiError
 * @extends {DataGraphsError}
 * @property {number} statusCode - The status code returned by the server
 * @property {string} statusText - The status text associated with the status code
 * @property {string} error - The error message returned by the API if available
 * @property {string} body - The response body as a string if available
 * @property {Object} json - The response body as an object if available
 */
class ApiError extends DataGraphsError{

  constructor(statusCode, statusText, { body, json, error } = {}){
    super(`${statusCode} ${statusText} ${error}`);
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.body = body;
    this.json = json;
    this.error = error;
  }

}

exports = module.exports = ApiError;