/* global describe, it */
jest.mock('node-fetch');
const fetch = require('node-fetch');
const Authenticator = require('./Authenticator');

describe('Authenticator', () => {

  const apiKey = 'apiKey1';
  const clientId = 'client1';
  const clientSecret = 'secret1';
  let authenticator;

  describe('getAccessToken', () => {

    beforeEach(() => {
      jest.resetAllMocks();
      authenticator = new Authenticator({ apiKey, clientId, clientSecret });
    });

    it('should fetch an access token if one is not cached', async () => {
      const res = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': 'token1' })
      };
      fetch.mockResolvedValueOnce(res);

      const token = await authenticator.getAccessToken();

      expect(token).toEqual('token1');
      expect(fetch).toHaveBeenCalledWith('https://api.datagraphs.io/oauth/token', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey
        },
        body: `{"clientId":"${clientId}","clientSecret":"${clientSecret}"}`
      });
    });

    it('should throw an error if one is thrown while fetching the access token', async () => {
      const error = new Error('Something went wrong');
      fetch.mockImplementation(() => { throw error; });

      await expect(authenticator.getAccessToken()).rejects.toThrow(error);
    });

    it('should return a cached access token', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        exp: now + 5000
       });
      const res = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': accessToken })
      };
      fetch.mockResolvedValueOnce(res);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken();

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual(accessToken);
      expect(fetch).toHaveBeenCalledOnce;
    });

    it('should fetch a fresh access token if the cached one has expired', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        exp: now
       });
      const res1 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': accessToken })
      };
      const res2 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': 'token2' })
      };
      fetch.mockResolvedValueOnce(res1);
      fetch.mockResolvedValueOnce(res2);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken();

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual('token2');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should fetch a fresh access token if previous attempt failed', async () => {
      const res1 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': 'token2' })
      };
      const error = new Error('Something went wrong');
      fetch.mockImplementationOnce(() => { throw error; });
      fetch.mockResolvedValueOnce(res1);

      await expect(authenticator.getAccessToken()).rejects.toThrow(error);
      const token = await authenticator.getAccessToken();

      expect(token).toEqual('token2');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should fetch a fresh access token if the cached one has almost expired', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        exp: now + 3000
       });
      const res1 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': accessToken })
      };
      const res2 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': 'token2' })
      };
      fetch.mockResolvedValueOnce(res1);
      fetch.mockResolvedValueOnce(res2);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken();

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual('token2');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should fetch a fresh access token if forceRefresh is true', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        exp: now + 5000
       });
      const res1 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': accessToken })
      };
      const res2 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': 'token2' })
      };
      fetch.mockResolvedValueOnce(res1);
      fetch.mockResolvedValueOnce(res2);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken({ forceRefresh: true });

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual('token2');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

  });

});

const encodeAccessToken = payload => {
  const buffer = Buffer.from(JSON.stringify(payload), 'ascii');
  const jwt = buffer.toString('base64');
  const accessToken = `prefix.${jwt}`;
  return accessToken;
}
