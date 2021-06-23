const InvalidUrnError = require("../errors/InvalidUrnError");
const { parseDatasetId, parseConceptId } = require("./ids");

/* global describe, it */
describe('', () => {

  describe('parseDatasetId', () => {
    
    it('should throw a InvalidUrnError if id is not a valid urn', () => {
      const id = 'invalid';
      expect(() => parseDatasetId(id)).toThrow(InvalidUrnError);
    });

    it('should extract the account and dataset keys from the id', () => {
      const id = 'urn:account1:dataset1';
      const { account, key } = parseDatasetId(id);
      expect(account).toEqual('account1');
      expect(key).toEqual('dataset1');
    });

  });

  describe('parseConceptId', () => {
    
    it('should throw a InvalidUrnError if id is not a valid urn', () => {
      const id = 'invalid';
      expect(() => parseConceptId(id)).toThrow(InvalidUrnError);
    });

    it('should extract the account and type and key from the id', () => {
      const id = 'urn:account1:type1:concept1';
      const { account, type, key } = parseConceptId(id);
      expect(account).toEqual('account1');
      expect(type).toEqual('type1');
      expect(key).toEqual('concept1');
    });

    it('should extract the account and type and key from the id if key contains a colon', () => {
      const id = 'urn:account1:type1:prefix:concept1';
      const { account, type, key } = parseConceptId(id);
      expect(account).toEqual('account1');
      expect(type).toEqual('type1');
      expect(key).toEqual('prefix:concept1');
    });

  });

});
