/* global describe, it */
jest.mock('node-fetch');
const fetch = require('node-fetch');
const API = require('./Api');
const ConfigurationError = require('./errors/ConfigurationError');

describe('Api', () => {

  const accountKey = 'account1';
  const apiKey = 'apiKey1';
  const clientId = 'client1';
  const clientSecret = 'secret1';

  it('should throw a ConfigurationError if accountKey is not set', () => {
    expect(() => new API({ apiKey })).toThrow(ConfigurationError);
  });

  it('should throw a ConfigurationError if apiKey is not set', () => {
    expect(() => new API({ accountKey })).toThrow(ConfigurationError);
  });

  it('should initialise if both accountKey and apiKey is set', () => {
    new API({ accountKey, apiKey });
  });

  describe('get', () => {

    const api = new API({ accountKey, apiKey });

    beforeEach(() => jest.resetAllMocks());

    it('should send a GET request and return the response', async () => {
      const res = {
        ok: true
      };
      fetch.mockReturnValueOnce(res);

      const result = await api.get('path1', { qs: { p1: 'v1', p2: 'v2' } });

      expect(result).toBe(res);
      expect(fetch).toHaveBeenCalledWith('https://api.datagraphs.io/account1/path1?p1=v1&p2=v2', {
        method: 'GET',
        headers: {
          'x-api-key': apiKey
        }
      });
    });

  });

  describe('getJSON', () => {

    const api = new API({ accountKey, apiKey });

    beforeEach(() => jest.resetAllMocks());

    it('should send a GET request and return the json body', async () => {
      const json = { id: 'json1' };
      const res = {
        ok: true,
        json: jest.fn().mockReturnValueOnce(json)
      };
      fetch.mockReturnValueOnce(res);

      const result = await api.getJson('path1');

      expect(result).toBe(json);
      expect(fetch).toHaveBeenCalledWith('https://api.datagraphs.io/account1/path1', {
        method: 'GET',
        headers: {
          'x-api-key': apiKey
        }
      });
    });

  });

  describe('post', () => {

    const api = new API({ accountKey, apiKey });

    beforeEach(() => jest.resetAllMocks());

    it('should send a POST request and return the response', async () => {
      const res = {
        ok: true
      };
      fetch.mockReturnValueOnce(res);

      const body = 'body1';
      const result = await api.post('path1', body);

      expect(result).toBe(res);
      expect(fetch).toHaveBeenCalledWith('https://api.datagraphs.io/account1/path1', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey
        },
        body
      });
    });

  });

  describe('postJson', () => {

    const api = new API({ accountKey, apiKey });

    beforeEach(() => jest.resetAllMocks());

    it('should send a POST request with a json body', async () => {
      const res = {
        ok: true
      };
      fetch.mockReturnValueOnce(res);

      const body = { id: 'body1' };
      const result = await api.postJson('path1', body);

      expect(result).toBe(res);
      expect(fetch).toHaveBeenCalledWith('https://api.datagraphs.io/account1/path1', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'content-type': 'application/json'
        },
        body: '{"id":"body1"}'
      });
    });

  });

  describe('patch', () => {

    const api = new API({ accountKey, apiKey });

    beforeEach(() => jest.resetAllMocks());

    it('should send a PATCH request and return the response', async () => {
      const res = {
        ok: true
      };
      fetch.mockReturnValueOnce(res);

      const body = 'body1';
      const result = await api.patch('path1', body);

      expect(result).toBe(res);
      expect(fetch).toHaveBeenCalledWith('https://api.datagraphs.io/account1/path1', {
        method: 'PATCH',
        headers: {
          'x-api-key': apiKey
        },
        body
      });
    });

  });

  describe('patchJson', () => {

    const api = new API({ accountKey, apiKey });

    beforeEach(() => jest.resetAllMocks());

    it('should send a PATCH request with a json body', async () => {
      const res = {
        ok: true
      };
      fetch.mockReturnValueOnce(res);

      const body = { id: 'body1' };
      const result = await api.patchJson('path1', body);

      expect(result).toBe(res);
      expect(fetch).toHaveBeenCalledWith('https://api.datagraphs.io/account1/path1', {
        method: 'PATCH',
        headers: {
          'x-api-key': apiKey,
          'content-type': 'application/json'
        },
        body: '{"id":"body1"}'
      });
    });

  });

});
