const InvalidUrnError = require("../errors/InvalidUrnError");

const parseConceptId = id => {
  if(!id.match(/^urn:.+:.+:.+$/)) throw new InvalidUrnError(`Id should be in the form "urn:{account}:{dataset}:{identifier}"`);
  const [, account, type, key] = id.split(':');
  return { account, type, key };
}

const parseDatasetId = id => {
  if(!id.match(/^urn:.+:.+$/)) throw new InvalidUrnError(`Id should be in the form "urn:{account}:{dataset}"`);
  const [, account, key] = id.split(':');
  return { account, key };
}

const isUrn = id => id.startsWith('urn:');

exports = module.exports = {
  parseConceptId,
  parseDatasetId,
  isUrn
};