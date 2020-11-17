const DataGraphsError = require('./DataGraphsError');

/**
 * Invalid URN Error - An error thrown if a id is not a valid URN
 * @class InvalidUrnError
 * @extends {DataGraphsError}
 */
class InvalidUrnError extends DataGraphsError{

  constructor(message){
    super(message);
  }

}

exports = module.exports = InvalidUrnError;