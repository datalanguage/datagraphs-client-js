/* global describe, it, expect, jest, beforeEach, afterEach */
jest.mock("node-fetch");

const credentials = {
  projectId: "project1",
  apiKey: "apiKey1",
  clientId: "client1",
  clientSecret: "secret1",
};

const loadInEnv = (env) => {
  if (env === undefined) delete process.env.DATAGRAPHS_ENV;
  else process.env.DATAGRAPHS_ENV = env;
  let modules;
  jest.isolateModules(() => {
    modules = {
      config: require("./config"),
      fetch: require("node-fetch"),
      Api: require("./Api"),
    };
  });
  return modules;
};

const requestedUrls = async (env) => {
  const { fetch, Api } = loadInEnv(env);
  fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: "token1" }) });
  fetch.mockResolvedValueOnce({ ok: true });

  await new Api(credentials).get("path1");

  return fetch.mock.calls.map(([url]) => url);
};

describe("config", () => {
  const originalEnv = process.env.DATAGRAPHS_ENV;
  const originalAccessToken = process.env.DATAGRAPHS_ACCESS_TOKEN;

  beforeEach(() => {
    delete process.env.DATAGRAPHS_ACCESS_TOKEN;
  });

  afterEach(() => {
    if (originalEnv === undefined) delete process.env.DATAGRAPHS_ENV;
    else process.env.DATAGRAPHS_ENV = originalEnv;
    if (originalAccessToken !== undefined) process.env.DATAGRAPHS_ACCESS_TOKEN = originalAccessToken;
  });

  describe.each([
    ["dev", "https://api.dev.datagraphs.io", "https://api.dev.datagraphs.io"],
    ["live", "https://api.datagraphs.io", "https://api.datagraphs.io"],
    ["localhost", "https://api.dev.datagraphs.io", "http://localhost:3001"],
    [undefined, "https://api.datagraphs.io", "https://api.datagraphs.io"],
    ["unknown", "https://api.datagraphs.io", "https://api.datagraphs.io"],
  ])("with DATAGRAPHS_ENV=%s", (env, authenticationHost, apiHost) => {
    it("selects the environment's hosts", () => {
      expect(loadInEnv(env).config).toEqual({ authenticationHost, apiHost });
    });

    it("requests the token from the authentication host and the API from the API host", async () => {
      expect(await requestedUrls(env)).toEqual([
        `${authenticationHost}/oauth/token`,
        `${apiHost}/project1/path1?`,
      ]);
    });
  });
});
