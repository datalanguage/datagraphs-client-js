const { authenticationHost } = require('./config');
const fetch = require('node-fetch');
const { checkResponse } = require('./utils/api');

function Authenticator({ apiKey, clientId, clientSecret } = {}) {

  let accessToken;

  this.getAccessToken = async ({ forceRefresh = false } = {}) => {
    if(!accessToken || forceRefresh || await doesTokenNeedRefreshing()){
      accessToken = getNewAccessToken();
    }
    return accessToken;
  }

  const getNewAccessToken = async () => {
    const envToken = process.env.DATAGRAPHS_ACCESS_TOKEN;
    if(envToken) return envToken;

    const url = `${authenticationHost}/oauth/token`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({ clientId, clientSecret })
    });
    await checkResponse(res);
    const body = await res.json();
    if(body.error) {
      throw new Error(body['error_description']);
    }
    return body['access_token'];
  }

  const decodeAccessToken = async token => {
    const [, jwt] = token.split('.');
    const buffer = Buffer.from(jwt, 'base64');
    const payload = JSON.parse(buffer.toString('ascii'));
    return payload;
  }

  const doesTokenNeedRefreshing = async () => {
    let token;
    try {
      token = await accessToken;
    } catch(err) {
      // Previous request to get token failed so fetch a fresh one
      return true;
    }
    if(!token) return true;
    const { exp } = await decodeAccessToken(token);
    const now = new Date().getTime();
    return now >= (exp - 3600) * 1000; // Less than 1 hour
  }

};

exports = module.exports = Authenticator;