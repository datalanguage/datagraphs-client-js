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
      fetch.mockReturnValueOnce(res);

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

    it('should return a cached access token', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        iat: now,
        exp: now + 1000
       });
      const res = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': accessToken })
      };
      fetch.mockReturnValueOnce(res);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken();

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual(accessToken);
      expect(fetch).toHaveBeenCalledOnce;
    });

    it('should fetch a fresh access token if the cached one has expired', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        iat: now - 1000,
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
      fetch.mockReturnValueOnce(res1);
      fetch.mockReturnValueOnce(res2);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken();

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual('token2');
      expect(fetch).toHaveBeenCalledTwice;
    });

    it('should fetch a fresh access token if the cached one has almost expired', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        iat: now - 20000,
        exp: now + 1000
       });
      const res1 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': accessToken })
      };
      const res2 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': 'token2' })
      };
      fetch.mockReturnValueOnce(res1);
      fetch.mockReturnValueOnce(res2);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken();

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual('token2');
      expect(fetch).toHaveBeenCalledTwice;
    });

    it('should fetch a fresh access token if forceRefresh is true', async () => {
      const now = new Date().getTime() / 1000;
      const accessToken = encodeAccessToken({ 
        iat: now,
        exp: now + 1000
       });
      const res1 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': accessToken })
      };
      const res2 = {
        ok: true,
        json: jest.fn().mockReturnValueOnce({ 'access_token': 'token2' })
      };
      fetch.mockReturnValueOnce(res1);
      fetch.mockReturnValueOnce(res2);

      const token1 = await authenticator.getAccessToken();
      const token2 = await authenticator.getAccessToken({ forceRefresh: true });

      expect(token1).toEqual(accessToken);
      expect(token2).toEqual('token2');
      expect(fetch).toHaveBeenCalledTwice;
    });

  });

});

const encodeAccessToken = payload => {
  const buffer = Buffer.from(JSON.stringify(payload), 'ascii');
  const jwt = buffer.toString('base64');
  const accessToken = `prefix.${jwt}`;
  return accessToken;
}
