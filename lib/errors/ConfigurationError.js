const DataGraphsError = require('./DataGraphsError');

/**
 * Configuration Error - An error thrown if a configuration property is missing or invalid
 * @class ConfigurationError
 * @extends {DataGraphsError}
 */
class ConfigurationError extends DataGraphsError{

  constructor(message){
    super(message);
  }

}

exports = module.exports = ConfigurationError;