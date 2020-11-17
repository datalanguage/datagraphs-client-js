const ConfigurationError = require("../errors/ConfigurationError")

const checkCredentials = ({ clientId, clientSecret }) => {
  if(!clientId || !clientSecret) throw new ConfigurationError('clientId and clientSecret are required to invoke this operation');
};

exports = module.exports = checkCredentials;