const { apiHost: host } = require("./config");
const fetch = require("node-fetch");
const Authenticator = require("./Authenticator");
const { checkResponse } = require("./utils/api");
const ConfigurationError = require("./errors/ConfigurationError");
const queryString = require("query-string");
const logger = require("loglevel");

function API({ projectId, apiKey, clientId, clientSecret } = {}) {
  if (!projectId) throw new ConfigurationError("Project Id is required");
  if (!apiKey) throw new ConfigurationError("API Key is required");

  const authenticator = new Authenticator({ apiKey, clientId, clientSecret });

  this.get = (path, { qs } = {}) => send("GET", path, { qs });

  this.getJson = async (path, { qs } = {}) => {
    const res = await this.get(path, { qs });
    const json = await res.json();
    return json;
  };

  this.post = (path, body, { headers } = {}) =>
    send("POST", path, { body, headers });

  this.postJson = (path, body) =>
    this.post(path, JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
      },
    });

  this.put = (path, body, { headers } = {}) =>
    send("PUT", path, { body, headers });

  this.putJson = (path, body) =>
    this.put(path, JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
      },
    });

  this.patch = (path, body, { headers } = {}) =>
    send("PATCH", path, { body, headers });

  this.patchJson = (path, body) =>
    this.patch(path, JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
      },
    });

  this.delete = (path, { headers } = {}) => send("DELETE", path, { headers });

  const send = async (method, path, { body, headers = {}, qs } = {}) => {
    const url = buildUrl(path, qs);
    logger.debug(`Sending API request to ${url}`, body);
    const requestHeaders = await buildRequestHeaders(headers);
    const res = await fetch(url, {
      method,
      headers: requestHeaders,
      body,
    });
    await checkResponse(res);
    return res;
  };

  const buildUrl = (path, qs) => {
    const url = `${host}/${projectId}/${path}`;
    if (!qs) return url;
    return url + "?" + queryString.stringify(qs);
  };

  const buildRequestHeaders = async (headers) => {
    const accessToken = clientId && (await authenticator.getAccessToken());
    const requestHeaders = {
      "x-api-key": apiKey,
      ...headers,
    };
    if (accessToken) requestHeaders.Authorization = `Bearer ${accessToken}`;
    return requestHeaders;
  };
}

exports = module.exports = API;
