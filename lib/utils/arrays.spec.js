const { forceArray } = require("./arrays");

/* global describe, it */
describe('Array Utils', () => {

  describe('forceArray', () => {

    it('should wrap the value in an array if not one already', () => {
      const value = 'val1';
      const result = forceArray(value);
      expect(result).toEqual(['val1']);
    });

    it('should return the value if it is an array', () => {
      const value = ['val1'];
      const result = forceArray(value);
      expect(result).toEqual(value);
    });

    it('should return an empty array if value is undefined', () => {
      const value = undefined;
      const result = forceArray(value);
      expect(result).toEqual([]);
    });

    it('should return the default value if value is undefined', () => {
      const value = undefined;
      const result = forceArray(value, { defaultValue: ['default1'] });
      expect(result).toEqual(['default1']);
    });

  });

});
