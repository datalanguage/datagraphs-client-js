const dev = {
  authenticationHost: 'https://api-dev.datagraphs.io',
  apiHost: 'https://api-dev.datagraphs.io'
};

const live = {
  authenticationHost: 'https://api.datagraphs.io',
  apiHost: 'https://api.datagraphs.io'
}

const localhost = {
  authenticationHost: 'https://api-dev.datagraphs.io',
  apiHost: 'http://localhost:3001'
};

const config = {
  dev,
  live,
  localhost
};

exports = module.exports = config[process.env.DATAGRAPHS_ENV] || config.live;