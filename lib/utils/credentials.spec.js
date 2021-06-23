const ConfigurationError = require("../errors/ConfigurationError");
const checkCredentials = require("./credentials");

/* global describe, it */
describe('Credentials Utils', () => {

  describe('checkCredentials', () => {

    it('should throw a ConfigurationError if clientId is not set', () => {
      const credentials = { clientSecret: 'secret1' };
      expect(() => checkCredentials(credentials)).toThrow(ConfigurationError);
    });

    it('should throw a ConfigurationError if clientSecret is not set', () => {
      const credentials = { clientId: 'id1' };
      expect(() => checkCredentials(credentials)).toThrow(ConfigurationError);
    });

    it('should do nothing if both clientId and clientSecret are set', () => {
      const credentials = { clientId: 'id1', clientSecret: 'secret1' };
      checkCredentials(credentials);
    });

  });

});
