/**
 * Data Graphs Error - The root error which all Data Graph errors inherit from
 * @class DataGraphsError
 * @extends {Error}
 * @property {string} message
 */
class DataGraphsError extends Error{

  constructor(message){
    super(message);
  }

}

exports = module.exports = DataGraphsError;